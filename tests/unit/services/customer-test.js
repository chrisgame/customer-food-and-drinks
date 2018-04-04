import { module, test, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | customer', function(hooks) {
  setupTest(hooks);

  module('list is returned', function() {
    test('when source text is json objects separated by new lines', function(assert) {
      let customer = this.owner.lookup('service:customer');
      customer.fetchAll()
        .then(customerList => assert.equal(
          customerList.length,
          32,
          'the list contains the expected number of entries'
        ))
    });
  });

  module('flash message is sent when list cannot be fetched', function() {
    skip('because of network issues');
    skip('because of a parsing error');
  });
});

