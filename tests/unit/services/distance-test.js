import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | distance', function(hooks) {
  setupTest(hooks);

  test('the distance between two points is calculated accurately', function(assert) {
    let distance = this.owner.lookup('service:distance');
    let postOffice = { latitude: 53.350047, longitude: 6.260689 };
    let guinnessStorehouse = { latitude: 53.342233, longitude: 6.286738 };
    let drumraneyChurch = { latitude: 53.481747, longitude: 7.749939 };

    assert.equal(
      Math.round(distance.between(postOffice, guinnessStorehouse)),
      Math.round(1.92),
      'the distance between Dublin post office and the Guinness Storehouse is the same as google maps reports');
    assert.equal(
      Math.round(distance.between(postOffice, drumraneyChurch)),
      Math.round(99.74),
      'the distance between Dublin post office and Drumraney Church is the same as google maps reports');
  });
});

