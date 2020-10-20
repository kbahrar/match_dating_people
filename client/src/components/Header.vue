<template>
  <v-toolbar class="transparent mb-4" dark>
    <v-toolbar-title flat dark class="mr-4">
       <v-btn  text dark class="transparent" to="index">
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
      
      <v-btn v-if="isLoggedIn()" @click="decon" text dark class="transparent" to="login">
        Log Out
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
            <v-avatar>
      <img
        src="https://cdn.vuetifyjs.com/images/john.jpg"
        alt="mamak profile"
      >
    </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 3"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

    </v-toolbar-items>
  </v-toolbar>
</template>


<script>
import { isLoggedIn } from '@/policies/auth'
import { logoutUser } from '@/policies/auth'
export default {
  data () {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
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
