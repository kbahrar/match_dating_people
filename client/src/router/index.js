import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Rpassword from '@/components/Rpassword'
import Fillprofile from '@/components/Fillprofile'
import Newpassword from '@/components/Newpassword'
// import store from '@/store/store'
import { isLoggedIn } from '@/policies/auth'

Vue.use(Router)

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: "/rpassword",
      name: "rpassword",
      component: Rpassword
    },
    {
      path: "/fillprofile",
      name: "fillprofile",
      component: Fillprofile,
      meta: {
        allowAnonymous: false
      }
    },
    {
      path: "/newpassword",
      name: "newpassword",
      component: Newpassword
    }
  ]
});

router.beforeEach((to, from, next) => {
  if ((to.name == 'login' || to.name == 'register') && isLoggedIn()) {
    next({ path: '/' })
    console.log(isLoggedIn())
  }
  else if (!to.meta.allowAnonymous && !isLoggedIn()) {
    next({
      path: '/login'
    })
  }
  else {
    next()
  }
})

export default router