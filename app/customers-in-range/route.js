import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  customer: service(),

  model(params, transition) {
    return this.get('customer').fetchAll()
      .then(customers => {
        if (!customers) {
          transition.abort();
          this.transitionTo('index');
        }
        return customers.sortBy('user_id');
      });
  }
});
