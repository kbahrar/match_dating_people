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
  }
};
