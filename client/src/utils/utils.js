import { getUserInfo } from "../policies/auth"
import Authent from '@/services/AuthService'
import store from '@/store/store';
export async function getUser() {
    try {
      var info = getUserInfo()
      const response = await Authent.getUser(info.id)
      return response.data.user
    }
    catch (err) {
      console.log('Failed to get Data !')
    }
}

export async function getList() {
  try {
    var info = getUserInfo()
    const response = await Authent.getList(info.id)
    return response.data.users
  }
  catch (err) {
    console.log('Failed to get Data !')
  }
}

export async function likeIt(login, flag, id) {
  try {
    var info = getUserInfo()
    if (flag == 0) {
      await Authent.Like({login: info.login, liked: login, info: {id: info.id}})
      store.dispatch('notif', id)
    }
    else
      await Authent.disLike({login: info.login, liked: login, info: {id: info.id}})
  }
  catch (err) {
    console.log(err.message)
  }
}

export async function checkLike(login) {
  try {
    var info = getUserInfo()
    const response = await Authent.checkLike(info.id, info.login, login)
    // console.log(response.data.check)
    return response.data.check
  }
  catch (err) {
    console.log('Failed to get Data !')
  }
}

export async function getNotifs(login) {
  try {
    var info = getUserInfo()
    const response = await Authent.getNotifs(info.id)
    console.log(response.data.notifs)
    return response.data.notifs
  }
  catch (err) {
    console.log('Failed to get Data !')
  }
}