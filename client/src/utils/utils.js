import { getUserInfo } from "../policies/auth"
import { logoutUser } from '@/policies/auth'
import Authent from '@/services/AuthService'
import store from '@/store/store'

export async function getMatched() {
    try {
      var info = getUserInfo()
      const response = await Authent.getMatched(info.id, info.login)
      return response.data.users
    }
    catch (err) {
      if (err.response.status === 401)
      {
        logoutUser()
        // this.$router.go('login')
      }
    }
}

export async function sendMsg(user, msg, id) {
    try {
      var info = getUserInfo()
      await Authent.sendMsg({login: info.login, user: user, message: msg, info: {id: info.id}})
      store.dispatch('notif', id)
      store.dispatch('msg', [id, info.login])
    }
    catch (err) {
      if (err.response.status === 401)
      {
        logoutUser()
        // this.$router.go('login')
      }
    }
}

export async function seenMsg(user) {
    try {
      var info = getUserInfo()
      await Authent.seenMsg({login: user, user: info.login, info: {id: info.id}})
    }
    catch (err) {
      if (err.response.status === 401)
      {
        logoutUser()
        // this.$router.go('login')
      }
    }
}

export async function getMsg(user) {
    try {
      var info = getUserInfo()
      const response = await Authent.getMsg({login: info.login, user: user, info: {id: info.id}})
      return response.data.msgs
    }
    catch (err) {
      if (err.response.status === 401)
      {
        logoutUser()
        // this.$router.go('login')
      }
    }
}

export async function getUser() {
    try {
      var info = getUserInfo()
      const response = await Authent.getUser(info.id)
      return response.data.user
    }
    catch (err) {
      if (err.response.status === 401)
      {
        logoutUser()
      }
    }
}

export async function getOtherUser(login) {
    var info = getUserInfo()
    const response = await Authent.getOtherUser(info.id, login)
    return response.data.user
}

export async function getList() {
  try {
    var info = getUserInfo()
    const response = await Authent.getList(info.id)
    return response.data.users
  }
  catch (err) {
    if (err.response.status === 401)
    {
      logoutUser()
    }
  }
}

export async function checkreport(login) {
  var info = getUserInfo()
  var check = await Authent.checkReporte({login: login, reporter: info.login, info: {id: info.id}})
  return check.data.check
}

export async function block(login) {
  var info = getUserInfo()
  await Authent.Block({login: info.login, user: login, info: {id: info.id}})
}

export async function report(login) {
  var info = getUserInfo()
  await Authent.Reporte({login: login, reporter: info.login, info: {id: info.id}})
}

export async function seenIt(login, id) {
  try {
    var info = getUserInfo()
    await Authent.Seen({login: login, viewer: info.login, info: {id: info.id}})
    store.dispatch('notif', id)
  }
  catch (err) {
    if (err.response.status === 401)
    {
      logoutUser()
    }
  }
} 

export async function likeIt(login, flag, id) {
  try {
    var info = getUserInfo()
    if (flag == 0) {
      await Authent.Like({login: info.login, liked: login, info: {id: info.id}})
      store.dispatch('notif', id)
    }
    else {
      await Authent.disLike({login: info.login, liked: login, info: {id: info.id}})
      store.dispatch('notif', id)
    }
  }
  catch (err) {
    if (err.response.status === 401)
    {
      logoutUser()
    }
  }
}

export async function checkLike(login) {
  try {
    var info = getUserInfo()
    const response = await Authent.checkLike(info.id, info.login, login)
    return response.data.check
  }
  catch (err) {
    if (err.response.status === 401)
    {
      logoutUser()
    }
  }
}

export async function getNotifs(login) {
  try {
    var info = getUserInfo()
    const response = await Authent.getNotifs(info.id)
    // console.log(response.data.notifs)
    return response.data.notifs
  }
  catch (err) {
    if (err.response.status === 401)
    {
      logoutUser()
    }
  }
}

export async function seenNotifs(login) {
  try {
    var info = getUserInfo()
    const response = await Authent.seenNotifs(info.id)
    // console.log(response.data.notifs)
    // return response.data.notifs
  }
  catch (err) {
    if (err.response.status === 401)
    {
      logoutUser()
    }
  }
}