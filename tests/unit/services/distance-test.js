import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | distance', function(hooks) {
  setupTest(hooks);

  let distance;

  hooks.beforeEach(function() {
    distance = this.owner.lookup('service:distance');
  });

  test('the distance between two points is calculated accurately', function(assert) {
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

  module('invalid coordinates are detected', function(hooks) {

    let validCoordinates;

    hooks.beforeEach(function() {
      validCoordinates = { latitude: 53.350047, longitude: 6.260689 };
    });

    test('latitude outside upper limit', function(assert) {
      let invalidPositiveLatitude = { latitude: 91, longitude: 180 };

      try {
        distance.between(invalidPositiveLatitude, validCoordinates);
      }
      catch(error) {
        assert.equal(
          error.message,
          'Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180',
          'latitudes over 90 should result in an exception'
        );
      }
    });

    test('longitude outside upper limit', function(assert) {
      let invalidPositiveLongitude = { latitude: 90, longitude: 181 };

      try {
        distance.between(invalidPositiveLongitude, validCoordinates);
      }
      catch(error) {
        assert.equal(
          error.message,
          'Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180',
          'longitudes over 180 should result in an exception'
        );
      }
    });

    test('latitude outside lower limit', function(assert) {
      let invalidNegativeLatitude = { latitude: -91, longitude: -180 };

      try {
        distance.between(invalidNegativeLatitude, validCoordinates);
      }
      catch(error) {
        assert.equal(
          error.message,
          'Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180',
          'latitudes less than -90 should result in an exception'
        );
      }
    });

    test('longitude outside lower limit', function(assert) {
      let invalidNegativeLongitude = { latitude: -90, longitude: -181 };

      try {
        distance.between(invalidNegativeLongitude, validCoordinates);
      }
      catch(error) {
        assert.equal(
          error.message,
          'Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180',
          'longitudes less than -180 should result in an exception'
        );
      }
    });
  });
});

