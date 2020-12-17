import Vue from 'vue';
import { VTooltip } from 'v-tooltip';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.directive('tooltip', VTooltip);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
