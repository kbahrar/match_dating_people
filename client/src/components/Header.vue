<template>
  <v-app-bar class="pink lighten-3 mb-4" app>
    <v-toolbar-title flat dark class="mr-4">
       <v-btn  text dark class="transparent" to="/">
       matcha
      </v-btn>
    </v-toolbar-title>
    <v-spacer>
    </v-spacer>
    <v-toolbar-items>
      <v-btn v-if="!isLoggedIn()" text dark class="transparent" to="/register">
        Register
      </v-btn>

      <v-btn v-if="!isLoggedIn()" text dark class="transparent" to="/login">
        Login
      </v-btn>

      <v-btn @click="msgs = false" v-if="isLoggedIn()" text dark class="transparent" style="text-decoration: none;" to="/chat">
        <v-badge
          color="red"
          dot
          :value="msgs">
          chat <v-icon right>fab fa-facebook-messenger</v-icon>
        </v-badge>
      </v-btn>

      <v-menu transition="slide-x-transition" >
        <template v-slot:activator="{ on, attrs }" >
        <v-btn v-if="isLoggedIn()" text dark class="transparent" v-on="on" v-bind="attrs">
          <v-badge v-if="count > 0" :content="count" color="red" title="notifications">
            <v-icon>fas fa-bell</v-icon>
          </v-badge>
            <v-icon v-else>fas fa-bell</v-icon>
        </v-btn>
        </template>
        <v-list v-if="notifs" dense style="max-height: 500px"
       class="overflow-y-auto">
          <v-subheader>Notifications</v-subheader>
          <v-subheader class="mb-2" v-if="count > 0"><v-btn @click="seenNotif()" color="accent"> <v-icon>fas fa-check-circle </v-icon> Mark all as read</v-btn></v-subheader>
          <v-list-item
            v-for="notif in notifs"
            :key="notif.id"
            two-line
          >
            <v-list-item-icon v-if="!notif.seen">
              <v-icon color="red lighten-1">fas fa-bell</v-icon>
            </v-list-item-icon>
            <v-list-item-icon v-else>
              <v-icon>fas fa-bell</v-icon>
            </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{notif.message + ' ' + notif.type}}</v-list-item-title>
            <v-list-item-subtitle>{{moment(notif.sendTime).fromNow()}}</v-list-item-subtitle>
          </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-if="isLoggedIn()" text dark class="transparent" :to="'/users/' + login">
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
            <v-list-item-title v-if="isLoggedIn()" text dark class="transparent"><v-icon left>fas fa-images</v-icon><v-btn to="/fillpics">
              PICTURES
           </v-btn>
           </v-list-item-title> 
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-if="isLoggedIn()" text dark class="transparent"><v-icon left>fas fa-location-arrow</v-icon><v-btn to="/location">
              location
           </v-btn>
           </v-list-item-title> 
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-if="isLoggedIn()" text dark class="transparent"><v-icon left>fas fa-history</v-icon><v-btn to="/matched">
              History
           </v-btn>
           </v-list-item-title> 
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-if="isLoggedIn()" text dark class="transparent"><v-icon left>fas fa-search-plus</v-icon><v-btn to="/search">
              Research
           </v-btn></v-list-item-title> 
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-if="isLoggedIn()" text dark class="transparent"><v-icon left>fas fa-user-cog</v-icon><v-btn to="/updateprofile"> settings</v-btn></v-list-item-title> 
          </v-list-item>
          <v-list-item>
            <v-list-item-title v-if="isLoggedIn()" text dark class="transparent" > <v-icon left>fas fa-power-off</v-icon> <v-btn @click="decon" to="login">Log Out</v-btn>  </v-list-item-title> 
          </v-list-item>
        </v-list>
      </v-menu>

    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import { isLoggedIn } from '@/policies/auth'
import { logoutUser } from '@/policies/auth'
import { getUser } from '@/utils/utils'
import { locationDetect } from '../utils/location';
import {getLocation} from '@/policies/auth'
import {setLocation} from '@/policies/auth'
import { getNotifs } from '@/utils/utils'
import { seenNotifs } from '@/utils/utils'
import axios from 'axios'

export default {
  data () {
    return {
     login: 'mamak',
     image: 'https://cdn.vuetifyjs.com/images/john.jpg',
     count: 0,
     notifs: undefined,
     msgs: false,
    }
  },
  sockets: {
        notif: async function (data) {
            await this.getNotif()
        },
        msg: async function (data) {
          this.msgs = true
        }
  },
  mounted: async function () {
    if (isLoggedIn())
    {
      try {
        var user = await getUser()
        await this.getNotif()
        this.login = user.login
        
        if (user && user.mainFoto)
          this.image = "http://localhost:5000/" + user.mainFoto
        if (!this.$store.state.isConnected) {
          this.$store.dispatch('login', user)
        }
        var loc = getLocation()
        if (!loc)
        {
          locationDetect()
          setLocation(1)
        }
      }
      catch (err) {
        console.log(err.message)
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
      },
      seenNotif: async function() {
        await seenNotifs()
        await this.getNotif()
      },
      getNotif: async function() {
        var notifs = await getNotifs()
        if (notifs != false) {
          this.count = notifs.count
          this.notifs = notifs.notifs
        }
        if (this.count == 0)
          this.count = undefined
      }
    },
  }
</script>

<style lang="css" scoped>
</style>
