import Service from '@ember/service';
import haversine from 'npm:haversine';

export default Service.extend({

  between(a, b) {
    return haversine(a,b);
  }
});
