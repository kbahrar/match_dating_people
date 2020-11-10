<template>
  <v-toolbar class="transparent mb-4" dark>
    <v-toolbar-title flat dark class="mr-4">
       <v-btn  text dark class="transparent" to="/">
       matcha
      </v-btn>
    </v-toolbar-title>
    <v-spacer>
    </v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!isLoggedIn()" text dark class="transparent" to="register">
        Register
      </v-btn>

      <v-btn v-if="!isLoggedIn()" text dark class="transparent" to="login">
        Login
      </v-btn>

      <v-btn v-if="isLoggedIn()" text dark class="transparent" to="myprofilepage">
        {{login}}
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
           text dark 
           v-if="isLoggedIn()" 
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar> <img :src="image" alt="mamak profile"> </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item>
            <v-list-item-title v-if="isLoggedIn()" text dark class="transparent" to="fillprofile">My Profile</v-list-item-title> 
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-if="isLoggedIn()" @click="decon" text dark class="transparent" to="login"> Log Out </v-list-item-title> 
          </v-list-item>
        </v-list>
      </v-menu>

    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
import { isLoggedIn } from '@/policies/auth'
import { logoutUser } from '@/policies/auth'
import { getUserInfo } from '@/policies/auth'
import { locationDetect } from '../utils/location';
import {getLocation} from '@/policies/auth'
import {setLocation} from '@/policies/auth'
import axios from 'axios'

export default {
  data () {
    return {
     login: 'mamak',
     image: 'https://cdn.vuetifyjs.com/images/john.jpg'
    }
  },
  mounted() {
    if (isLoggedIn())
    {
      try {
        var user = getUserInfo()
        this.login = user.login
        if (user.mainFoto)
          this.image = "http://localhost:5000/" + user.mainFoto
        var loc = getLocation()
        if (!loc)
        {
          locationDetect()
          setLocation(1)
        }
      }
      catch (err) {
        console.log(err)
      }
    }
  },
    methods: {
      isLoggedIn() {
        return isLoggedIn()
      },
      decon() {
        logoutUser()
        this.$router.go('login')
      }
    },
  }
</script>

<style lang="css" scoped>
</style>
