// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as VueGoogleMaps from 'vue2-google-maps'
import Buefy from 'buefy'
import VueScrollTo from 'vue-scrollto'
// import 'buefy/lib/buefy.css'
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll)
Vue.use(Buefy)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAvSSKt1Pi6QUmAayLmtMCUhoMijhCjeqM',
    v: '3.27'
  }
})
Vue.use(VueScrollTo)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
