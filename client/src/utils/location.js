import axios from 'axios'

export async function getStreetAddressFrom(lat, long) {
    try {
        var key = "AIzaSyCFw_wLwwFIU_-uZyLK46e8US5NvUrd_O4"
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
            console.log(data.results[0].formatted_address);
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
    var key = "at_XvriW1GP6fUvb2YSoRYhaFwSgnAyE"
    var location = await axios.get(
        "https://geo.ipify.org/api/v1?apiKey="+key+"&ipAddress="+data.ip
    )
    console.log(location.data.location)
}

export function locationDetect() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
        var lat = position.coords.latitude
        var lng = position.coords.longitude
        // this.getStreetAddressFrom(lat, lng, key)
      },
      error => {
        console.log(error.message);
        getIp();
      },
    )   
}