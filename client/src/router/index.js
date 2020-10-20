import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Rpassword from '@/components/Rpassword'
import Fillprofile from '@/components/Fillprofile'
import Newpassword from '@/components/Newpassword'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/register",
      name: "register",
      component: Register
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/rpassword",
      name: "rpassword",
      component: Rpassword
    },
    {
      path: "/fillprofile",
      name: "fillprofile",
      component: Fillprofile
    },
    {
      path: "/newpassword",
      name: "newpassword",
      component: Newpassword
    }
  ]
});
