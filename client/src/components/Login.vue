<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-5">
      <div class="grey lighten-3 elevation-2">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>Login</v-toolbar-title>
        </v-toolbar>

        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          <v-text-field
            class="mt-5"
            v-model="log"
            :rules="[ v => !!v || 'login is required']"
            label="login"
            outlined
            shaped
            @keyup.enter="checkForm"
          ></v-text-field>
          <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters alphanum"
            v-model="password"
            class="input-group--focused"
            :rules="[v => !!v || 'Password is required',v => (v && v.length >= 8) || 'Password must have 8+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number', 
]"
            @click:append="flag = !flag"
            outlined
            shaped
            @keyup.enter="checkForm"
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
          <v-alert
            type="error"
            v-if="errors.length"
            v-model="alert"
            border="left"
            close-text="Close Alert"
            dismissible>
            <li v-for="err in errors" :key="err">{{ err }}</li>
          </v-alert>
          <v-alert type="success" v-if="reg">
            {{reg}}
          </v-alert>
          <v-btn @click="checkForm" class="pink darken-2 mb-5" dark>Login</v-btn>
          <v-btn  text dark class="red darken-2 mb-5" to="rpassword">forget password?</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'
import Valide from '@/policies/valideForm'
import {setAuthToken} from '@/policies/auth'
// import { locationDetect } from '../utils/location';
// import {setLocation} from '@/policies/auth'

export default {
  data () {
    return {
      alert: true,
      flag: true,
      log: '',
      password: '',
      reg: null,
      error: null,
      errors: []
    }
  },
  methods: {
    async login () {
      try {
        this.reg = "you logg in with success !";
        const response = await Authent.login({
          log: this.log,
          password: this.password
        })
        setAuthToken(response.data.token)
        // console.log(response.data)
        // io('http://localhost:5000')
        this.$router.go('/')
      } catch (err) {
        this.reg = ''
        this.error = err.response.data.error
        this.alert = true
      }
    },
    checkForm: function (e) {
      this.errors = [];

      if (this.log.length == 0) {
        this.errors.push("login required.");
      }
      else if(!Valide.validLogin(this.log))
        this.errors.push("invalide login.");
      if (this.password.length == 0) {
        this.errors.push("password required.");
      }
      else if (!Valide.validPwd(this.password))
        this.errors.push("invalide password.");

      if (!this.errors.length) {
        this.login();
      }
      else
        e.preventDefault();
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
