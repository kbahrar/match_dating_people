import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Rpassword from '@/components/Rpassword'
import Fillprofile from '@/components/Fillprofile'
import Newpassword from '@/components/Newpassword'
import UpdateProfile from '@/components/updateProfile'
import fillPics from '@/components/fillPics'
import Chat from '@/components/Chat'
import browsing from '@/components/browsing'
import myProfilePage from '@/components/myprofilePage'
import matched from '@/components/matched'
import userProfile from '@/components/userProfile'
import search from '@/components/search'
import location from '@/components/location'
import active from '@/components/activation'
import resetPwd from '@/components/Rpassword'
import reset from '@/components/reset'
import error404 from '@/components/error404'
import { isLoggedIn } from '@/policies/auth'
import { isFull } from '@/policies/auth'
import { isImage } from '@/policies/auth'


Vue.use(Router)

const router = new Router({
  // mode: "history",
  routes: [
    {
      path: "/",
      name: "browsing",
      component: browsing,
      meta: {
        allowAnonymous: false
      }
    },
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
      path: "/fillpics",
      name: "fillpics",
      component: fillPics,
      meta: {
        allowAnonymous: false
      }
    },
    {
      path: "/matched",
      name: "matched",
      component: matched,
      meta: {
        allowAnonymous: false
      }
    },
        {
      path: "/updateprofile",
      name: "updateprofile",
      component: UpdateProfile,
      meta: {
        allowAnonymous: false
      }
    },
        {
      path: "/chat",
      name: "chat",
      component: Chat,
      meta: {
        allowAnonymous: false
      }
    },
    {
      path: "/newpassword",
      name: "newpassword",
      component: Newpassword
    },
    {
      path: "/myprofilepage",
      name: "myProfilePage",
      component: myProfilePage,
      meta: {
        allowAnonymous: false
      }
    },
    {
      path: "/users/:login",
      name: "userProfile",
      component: userProfile,
      props: true,
      meta: {
        allowAnonymous: false
      }
    },
    {
      path: "/search",
      name: "search",
      component: search,
      props: true,
      meta: {
        allowAnonymous: false
      }
    },
    {
      path: "/location",
      name: "location",
      component: location,
      props: true,
      meta: {
        allowAnonymous: false
      }
    },
    {
      path: "/active/:token",
      name: "active",
      component: active,
      props: true,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: "/resetPwd",
      name: "resetPwd",
      component: resetPwd,
      props: true,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: "/reset/:token",
      name: "reset",
      component: reset,
      props: true,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: "*",
      name: "404",
      component: error404,
      meta: {
        allowAnonymous: true
      }
    },

  ]
});

router.beforeEach(async (to, from, next) => {
  if (isLoggedIn()) {
    var check = await isFull()
    var checkI = await isImage()
  }

  if ((to.name == 'login' || to.name == 'register' || to.name == 'active' || to.name == 'resetPwd') && isLoggedIn()) {
    if (check == 0)
      next({ path: '/fillprofile' })
    else
      next({ path: '/'})
  }
  else if (isLoggedIn() && check == 0 && to.name != 'fillprofile') {
    next({ path: '/fillprofile' })
  }
  else if (isLoggedIn() && checkI == null && to.name != 'fillpics' && to.name != 'fillprofile') {
    next({ path: '/fillpics' })
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