import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { map, filter } from '@ember/object/computed';

export default Controller.extend({
  queryParams: ['range', 'venueLatitude', 'venueLongitude'],
  range: 0,
  venueLatitude: 0,
  venueLongitude: 0,

  distance: service(),

  customers: map('model', function(customer) {
    let distance = this.get('distance');
    let venueLatitude = this.get('venueLatitude');
    let venueLongitude = this.get('venueLongitude');
    let customerDistance;

    try {
      customerDistance = distance.between(
        { latitude: venueLatitude, longitude: venueLongitude },
        { latitude: customer.latitude, longitude: customer.longitude }
      );
    }

    catch(error) {
      customerDistance = -1;
    }

    customer['distance'] = customerDistance;
    return customer;
  }),

  matchingCustomers: computed('customers', 'range', function() {
    let customers = this.get('customers');
    let range = this.get('range');

    return customers.filter(customer => {
      return customer.distance > 0 && customer.distance <= range;
    });
  }),

  erroredCustomers: filter('customers', function(customer) {
    return customer.distance === -1;
  })
});
