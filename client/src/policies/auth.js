import decode from 'jwt-decode'
import axios from 'axios'
import { getUser } from '@/utils/utils'


const AUTH_TOKEN_KEY = 'secret'
const LOCATION = "location"


export function logoutUser() {
    deleteLocation()
    clearAuthToken()
}

export function setLocation(flag) {
    localStorage.setItem(LOCATION, flag)
}

export function deleteLocation() {
    localStorage.removeItem(LOCATION)
}

export function getLocation() {
    return localStorage.getItem(LOCATION)
}

export function setAuthToken(token) {
    clearAuthToken()
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function getAuthToken() {
    return localStorage.getItem(AUTH_TOKEN_KEY)    
}

export function clearAuthToken() {
    axios.defaults.headers.common['Authorization'] = ''
    localStorage.removeItem(AUTH_TOKEN_KEY)
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken && !isTokenExpired(authToken)
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return decode(getAuthToken())
    }
}

export async function isFull() {
    try {

        var check = await getUser()
        if (check)
            check = check.fill
        // console.log(check)
        return check
    }
    catch (err) {
        logoutUser()
    }
}

export async function isImage() {
    try {

        var check = await getUser()
        if (check)
            check = check.mainFoto
        // console.log(check)
        return check
    }
    catch (err) {
          logoutUser()
    }
}

function getTokenExpirationDate(encodedToken) {
    let token = decode(encodedToken)
    if (!token.exp) {
        return null
    }
  
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
  
    return date
}
  
function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}