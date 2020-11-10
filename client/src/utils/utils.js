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
    console.log('op')
    var info = getUserInfo()
    const response = await Authent.getList(info.id)
    return response.data.user
  }
  catch (err) {
    console.log('Failed to get Data !')
  }
}