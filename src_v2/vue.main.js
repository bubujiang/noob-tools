import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import AllStroe from 'store/all.store.js'
import App from 'components/App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuex)

const store = new Vuex.Store(AllStroe)

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})