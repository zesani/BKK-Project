import Vue from 'vue'
import Router from 'vue-router'
import Feeds from '@/pages/Feeds'
import Report from '@/pages/Report'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Feeds',
      component: Feeds
    },
    {
      path: '/report',
      name: 'Report',
      component: Report
    }
  ]
})
