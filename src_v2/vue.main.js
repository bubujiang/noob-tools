import 'es6-promise/auto'
import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import AllStroe from 'store/all.store.js'
import App from 'components/App.vue'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(Vuex)
Vue.use(VueI18n)

const store = new Vuex.Store(AllStroe)
const i18n = new VueI18n({
  locale: 'cn',
  messages :{
    cn:require('locales/cn.json'),
    tc:require('locales/tc.json'),
    en:require('locales/en.json'),
  },
})

new Vue({
  el: '#app',
  store,
  i18n,
  template: '<App/>',
  components: { App }
})