// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import { sync } from 'vuex-router-sync';
import store from '@/store/store';
import moment from 'moment'
import io from 'vue-socket.io'
Vue.prototype.moment = moment
Vue.config.productionTip = false

Vue.use(new io({
	debug: false,
	connection: 'http://localhost:5000',
	vuex: {
		store,
		actionPrefix: 'SOCKET_',
		mutationPrefix: 'SOCKET_'
	}
}))

sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
}).$mount('#app')
