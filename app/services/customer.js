import Service, { inject as service } from '@ember/service';
import fetch from 'fetch';
import ENV from 'customer-food-and-drinks/config/environment';

export default Service.extend({
  flashMessages: service(),

  fetchAll() {
    let flashMessages = this.get('flashMessages');

    return fetch(ENV.customerURL)
      .then(response => {
        if (response.ok) {
          return response.text()
            .then(text => {
              try {
                return JSON.parse(`[${text.split('\n').join(',')}]`);
              }
              catch(error) {
                throw new Error(
                  `The customer list could not be parsed because of a formatting error:\n ${error.message}`
                );
              }
            });
        }
        throw new Error(
          'The customer list could not be fetched because of a network error, please try again'
        );
      })
      .catch(error => {
        flashMessages.alert(error.message);
      });
  }
});
