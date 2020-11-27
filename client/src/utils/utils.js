import { getUserInfo } from "../policies/auth"
import Authent from '@/services/AuthService'

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

export async function likeIt(login, flag) {
  try {
    var info = getUserInfo()
    if (flag == 0)
      await Authent.Like({login: info.login, liked: login, info: {id: info.id}})
    else
      await Authent.disLike({login: info.login, liked: login, info: {id: info.id}})
  }
  catch (err) {
    console.log('Failed to get Data !')
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