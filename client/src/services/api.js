import axios from 'axios'
import {getAuthToken} from '../policies/auth'

export default () => {
  var token = getAuthToken()
  return axios.create({
    baseURL: `http://localhost:5000/api/`,
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
}
