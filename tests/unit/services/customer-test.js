import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { startMirage } from 'customer-food-and-drinks/initializers/ember-cli-mirage';
import ENV from 'customer-food-and-drinks/config/environment';

module('Unit | Service | customer', function(hooks) {
  setupTest(hooks);

  let customer;

  hooks.beforeEach(function() {
    this.server = startMirage();
    this.server.logging = true;
    customer = this.owner.lookup('service:customer');
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  module('list is returned', function() {
    test('when source text is json objects separated by new lines', function(assert) {
      server.get(ENV.customerURL, () => {
        return `
          {"latitude": "1.1", "user_id": 1, "name": "Dave", "longitude": "-1.1"}
          {"latitude": "1.2", "user_id": 2, "name": "Bob", "longitude": "-2.2"}
        `.trim();
      });

      customer.fetchAll()
        .then(customerList => assert.equal(
          customerList.length,
          2,
          'the list contains the expected number of entries'
        ))
    });
  });

  let flashMessages;

  module('flash message is sent when list cannot be fetched', function(hooks) {
    hooks.beforeEach(function() {
      flashMessages = this.owner.lookup('service:flashMessages');
    });

    test('because of a network error', function(assert) {
      server.get(ENV.customerURL, () => {}, 500);

      customer.fetchAll()
        .then(customerList => {
          assert.notOk(customerList, 'no list is returned');
          assert.equal(flashMessages.queue.length, 1, 'a flash message has been added');
          assert.equal(
            flashMessages.queue[0].message,
            'The customer list could not be fetched because of a network error, please try again',
            'a flash message has been added about a network error'
          );
        });
    });

    test('because of a parsing error', function(assert) {
      server.get(ENV.customerURL, () => {
        return '{';
      });

      customer.fetchAll()
        .then(customerList => {
          assert.notOk(customerList, 'no list is returned');
          assert.equal(flashMessages.queue.length, 1, 'a flash message has been added');
          assert.equal(
            flashMessages.queue[0].message,
            'The customer list could not be parsed because of a formatting error:\n Unexpected token ] in JSON at position 2',
            'a flash message has been added about a parsing error'
          );
        });
    });
  });
});

