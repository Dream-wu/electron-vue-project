import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/login',
      name: 'login',
      component: require('@/views/Login').default
    },
    {
      path: '/home',
      name: 'home',
      component: require('@/views/Home').default,
      children: [{
        path: 'date',
        name: 'date',
        component: require('@/views/Date').default
      },
      // {
      //   path: 'memo',
      //   name: 'memo',
      //   component: require('@/views/Memo').default
      // },
      {
        path: 'todo',
        name: 'todo',
        component: require('@/views/Todo').default
      }]
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
})
