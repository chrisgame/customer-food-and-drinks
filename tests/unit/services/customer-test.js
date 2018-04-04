import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | customer', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('customer list it returned', function(assert) {
    let customer = this.owner.lookup('service:customer');
    customer.fetchAll()
      .then(customerList => assert.equal(
        customerList.length,
        32,
        'the list contains the expected number of entries'
      ))
  });
});

