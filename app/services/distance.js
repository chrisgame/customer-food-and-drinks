import Service from '@ember/service';
import haversine from 'npm:haversine';

export default Service.extend({

  between(a, b) {
    if (!this._validate(a) || !this._validate(b)) {
      throw new Error('Invalid coordinates: latitude must be between -90 and 90, longitude between -180 and 180');
    }
    return haversine(a,b);
  },

  _validate(coordinates) {
    return coordinates.latitude <= 90 && coordinates.latitude > -90 &&
      coordinates.longitude <= 180 && coordinates.longitude > -180;
  }
});
