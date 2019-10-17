import Vue from 'vue'
import Router from 'vue-router'
import CompanyPage from './views/CompanyPage.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/company',
      name: 'company',
      component: CompanyPage
    },
    {
      path: '/*',
      redirect: 'company'
    }
  ]
})
