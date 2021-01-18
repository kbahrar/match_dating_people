<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-5">
      <div class="grey lighten-3 elevation-2">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>Change location</v-toolbar-title>
        </v-toolbar>

        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          <v-text-field
            class="mt-5"
            id="city"
            v-model="city"
            :rules="[v => !!v || 'city required', v => /^[A-Za-z][A-Za-z]{2,31}$/.test(v) || 'invalide city name.']"
            label="add new location everywhere you want !"
            required
            outlined
            shaped
          ></v-text-field>

          <v-alert
            type="error"
            v-if="error"
            v-model="alert"
            border="left"
            close-text="Close Alert"
            dismissible>
            {{error}}
          </v-alert>
          <v-alert type="success" v-if="reg">
            {{reg}}
          </v-alert>
          <v-btn @click="changeLocation()" class="pink darken-2 mb-5" dark>Change location</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'
import { getUserInfo } from '@/policies/auth'

export default {
  data () {
    return {
      alert: true,
      flag: true,
      email: '',
      reg: null,
      error: null,
      errors: [],
      city: '',
      lat: undefined,
      lng: undefined,
      autoC: null
    }
  },
  mounted() {
    this.autoC =  new google.maps.places.Autocomplete(
        document.getElementById('city'),
        {types: ['geocode']}
    )
    this.autoC.addListener('place_changed', () => {
      let place = this.autoC.getPlace();
      let ac = place.address_components;
      this.lat = place.geometry.location.lat();
      this.lng = place.geometry.location.lng();
      let city = ac[0]["long_name"];
      this.city = city
    });
  },
  methods: {
    changeLocation: async function() {
      try {
        const user = getUserInfo()
        this.reg = 'location updated'
        await Authent.putLocation({
            location: {
                city: this.city,
                lat: this.lat,
                lng: this.lng
            },
            info: user
        })
      } catch (err) {
        this.reg = null
        this.error = err.response.data.error || 'No response from server'
        this.alert = true
      }
    }
  }
}
</script>

<style scoped>
</style>