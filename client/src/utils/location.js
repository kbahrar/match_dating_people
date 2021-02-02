import axios from 'axios'
import Authent from '@/services/AuthService'
import { getUserInfo } from '@/policies/auth'
const user = getUserInfo()

export async function getStreetAddressFrom(lat, long) {
    try {
        var key = "put your key here"
        var { data } = await axios.get(
            "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            lat +
            "," +
            long +
            "&key="+key
        );
        if(data.error_message) {
            console.log(data.error_message)
        } else {
            console.log(data.results[0].address_components[1].short_name);
            await Authent.putLocation({
                location: {
                    city: data.results[0].address_components[1].short_name,
                    lat: lat,
                    lng: long
                },
                info: user
            })
        }
    } catch (error) {
        console.log(error.message);
    } 
}

export async function getIp() {
    var { data } = await axios.get(
        "https://api.ipify.org?format=json"
    );
    console.log(data.ip);
    var key = "put your key here"
    var location = await axios.get(
        "https://geo.ipify.org/api/v1?apiKey="+key+"&ipAddress="+data.ip
    )
    await Authent.putLocation({
        location: location.data.location,
        info: user
    })
}

export async function locationDetect() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        var lat = position.coords.latitude
        var lng = position.coords.longitude
        getStreetAddressFrom(lat, lng)
      },
      error => {
        getIp();
      },
    )   
}