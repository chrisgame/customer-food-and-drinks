import Service from '@ember/service';
import fetch from 'fetch';
import ENV from 'customer-food-and-drinks/config/environment';

export default Service.extend({
  fetchAll() {
    return fetch(ENV.customerURL)
      .then(response => response.text())
      .then(text => JSON.parse(`[${text.split('\n').join(',')}]`));
  }
});
