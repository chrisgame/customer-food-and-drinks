import Controller from '@ember/controller';
import { computed } from '@ember/object';
import ENV from 'customer-food-and-drinks/config/environment';

export default Controller.extend({
  range: computed(function() {
    return ENV.customerRange;
  }),
  venueLatitude: computed(function() {
    return ENV.venueCoordinates.latitude;
  }),
  venueLongitude: computed(function() {
    return ENV.venueCoordinates.longitude;
  })
});
