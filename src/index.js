import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import TotalStroe from './store/total.store.js'
import App from './Tools.vue'

Vue.config.productionTip = false

Vue.use(Vuex)

const store = new Vuex.Store(TotalStroe)

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})