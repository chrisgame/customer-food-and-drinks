import { module, test } from 'qunit';
import { click, fillIn, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { startMirage } from 'customer-food-and-drinks/initializers/ember-cli-mirage';
import ENV from 'customer-food-and-drinks/config/environment';

module('Acceptance | customers in range', function(hooks) {
  setupApplicationTest(hooks);

  hooks.beforeEach(function() {
    this.server = startMirage();
    this.server.logging = true;
  });

  hooks.afterEach(function() {
    this.server.shutdown();
  });

  test('successfully searching for customers', async function(assert) {
    this.server.get(ENV.customerURL, () => {
      return `
        {"latitude": "1.1", "user_id": 1, "name": "Dave", "longitude": "-1.1"}
        {"latitude": "1.2", "user_id": 2, "name": "Bob", "longitude": "-1.2"}
      `.trim();
    });

    await visit('/');
    assert.equal(currentURL(), '/', 'initial url is correct');

    await fillIn('input#venueLatitude', '1');
    await fillIn('input#venueLongitude', '-1');
    await fillIn('input#customerRange', '100');
    await click('a#find');

    assert.equal(
      currentURL(),
      '/customers-in-range?range=100&venueLatitude=1&venueLongitude=-1',
      'transition is successful and query parameters are added to the url'
    );
    assert.dom('#matchingCustomers tr').exists({ count: 3 },
      'the matching customer table contains two rows plus the header');
    assert.dom('#matchingCustomers tr:nth-of-type(2)').includesText('Dave');
    assert.dom('#matchingCustomers tr:nth-of-type(3)').includesText('Bob');
    assert.dom('#erroredCustomers tr').exists({ count: 0 },
      'no customers with errors were found');
  });

  test('returning customers with invalid coordinates', async function(assert) {
    this.server.get(ENV.customerURL, () => {
      return `
        {"latitude": "91", "user_id": 1, "name": "Dave", "longitude": "-181"}
      `.trim();
    });

    await visit('/');
    assert.equal(currentURL(), '/', 'initial url is correct');

    await click('a#find');

    assert.equal(
      currentURL(),
      '/customers-in-range?range=100&venueLatitude=53.339428&venueLongitude=-6.257664',
      'transition is successful and query parameters are added to the url'
    );
    assert.dom('#matchingCustomers').doesNotExist();
    assert.dom('#erroredCustomers tr').exists({ count: 2 },
      'the errored customer table contains two rows plus the header');
    assert.dom('#erroredCustomers tr:nth-of-type(2)').includesText('Dave');
  });

  test('server error being returned when fetching the customer list', async function(assert) {
    this.server.get(ENV.customerURL, () => {}, 500);

    await visit('/');
    assert.equal(currentURL(), '/', 'initial url is correct');

    await click('a#find');

    assert.equal(
      currentURL(),
      '/',
      'the transaction should be aborted and we should be on the same page'
    );
    assert.dom('.flash-message.alert').exists();
    assert.dom('.flash-message.alert div')
      .hasText('The customer list could not be fetched because of a network error, please try again');
  });

  test('server error being returned when fetching the customer list', async function(assert) {
    this.server.get(ENV.customerURL, () => {
      return '{';
    });

    await visit('/');
    assert.equal(currentURL(), '/', 'initial url is correct');

    await click('a#find');

    assert.equal(
      currentURL(),
      '/',
      'the transaction should be aborted and we should be on the same page'
    );
    assert.dom('.flash-message.alert').exists();
    assert.dom('.flash-message.alert div')
      .hasText('The customer list could not be parsed because of a formatting error: Unexpected token ] in JSON at position 2');
  });
});
