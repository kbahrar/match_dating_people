<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="white elevation-2">

        <v-toolbar flat dense class="pink darken-4" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>

        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          <v-text-field
            class="mt-5"
            v-model="login"
            label="login"
            outlined
            shaped
          ></v-text-field>
          <v-text-field
            class="mt-5"
            v-model="firstName"
            label="first name"
            outlined
            shaped
          ></v-text-field>
          <v-text-field
            class="mt-5"
            v-model="lastName"
            label="last name"
            outlined
            shaped
          ></v-text-field>
          <v-text-field
            class="mt-5"
            v-model="email"
            label="email"
            outlined
            shaped
          ></v-text-field>
        <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters alphanum (Uppercase, Lowercase and number)"
            v-model="password"
            class="input-group--focused"
            @click:append="flag = !flag"
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
          <v-btn @click="register" class="pink darken-2
 mb-5" dark>Register</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'

export default {
  data () {
    return {
      alert: true,
      flag: true,
      login: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      reg: null,
      error: null
    }
  },
  methods: {
    async register () {
      try {
        this.error = null
        this.reg = 'you registred with success !'
        await Authent.register({
          login: this.login,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
