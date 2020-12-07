import Api from '@/services/api'

export default {
  register(cred) {
    return Api().post("register", cred);
  },
  login(cred) {
    return Api().post("login", cred);
  },
  rpassword(cred) {
    return Api().post("rpassword", cred);
  },
  fillprofile(cred) {
    return Api().post("users/fillProfile", cred);
  },
  updateinformations(cred) {
    return Api().post("users/updateinformations", cred);
  },
  updatecode(cred) {
    return Api().post("users/updatecode", cred);
  },
  putLocation(cred) {
    return Api().put("users/location", cred);
  },
  putImages(cred) {
    return Api().put("users/uploadImg", cred);
  },
  getUser(id) {
    return Api().get(`users/getUser/${id}`)
  },
  getList(id) {
    return Api().get(`browes/${id}`)
  },
  Like (cred) {
    return Api().post(`browes/like`, cred)
  },
  disLike (cred) {
    return Api().put(`browes/like`, cred)
  },
  checkLike (id, login, liked) {
    return Api().get(`browes/like/${id}&${login}&${liked}`)
  },
  getNotifs (id) {
    return Api().get(`notifier/${id}`)
  },
  seenNotifs (id) {
    return Api().get(`notifier/seen/${id}`)
  },
  getOtherUser (id, login) {
    return Api().get(`users/getOtherUser/${id}&${login}`)
  }
};
