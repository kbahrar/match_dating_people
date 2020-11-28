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

      <v-menu transition="slide-x-transition">
        <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="isLoggedIn()" text dark class="transparent" v-on="on" v-bind="attrs">
          <v-badge v-if="count > 0" :content="count" color="red" title="notifications">
            <v-icon>fas fa-bell</v-icon>
          </v-badge>
            <v-icon v-else>fas fa-bell</v-icon>
        </v-btn>
        </template>
        <v-list v-if="notifs" dense>
          <v-subheader>Notifications</v-subheader>
          <v-list-item
            v-for="notif in notifs"
            :key="notif"
            two-line
          >
            <v-list-item-icon>
              <v-icon color="red lighten-1">fas fa-grin-hearts</v-icon>
            </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{notif.message + ' ' + notif.type}}</v-list-item-title>
            <v-list-item-subtitle>{{moment(notif.sendTime).fromNow()}}</v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
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
import { getUser } from '@/utils/utils'
import { locationDetect } from '../utils/location';
import {getLocation} from '@/policies/auth'
import {setLocation} from '@/policies/auth'
import { getNotifs } from '@/utils/utils'
import axios from 'axios'

export default {
  data () {
    return {
     login: 'mamak',
     image: 'https://cdn.vuetifyjs.com/images/john.jpg',
     count: 0,
     notifs: undefined
    }
  },
  mounted: async function () {
    if (isLoggedIn())
    {
      try {
        var user = await getUser()
        var notifs = await getNotifs()
        this.login = user.login
        if (user.mainFoto)
          this.image = "http://localhost:5000/" + user.mainFoto
        var loc = getLocation()
        if (!loc)
        {
          locationDetect()
          setLocation(1)
        }
        if (notifs != false) {
          this.count = notifs.count
          this.notifs = notifs.notifs
        }
        if (this.count == 0)
          this.count = undefined
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
