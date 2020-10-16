<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="grey lighten-3 elevation-5">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          
        <form name="registerForm" autocomplete="off">

          <v-text-field
            class="mt-3"
            v-model="login"
            :rules="[v => !!v || 'Login is required',v => (v && v.length >= 4) || 'Login must be more than 4 caracters']"
            label="login"
            required
            outlined
            shaped
          ></v-text-field>
             </form>

        <form name="registerForm" autocomplete="off">
          <v-text-field
            class="mt-5"
            v-model="firstName"
            :rules="[v => !!v || 'First Name is required']"
            label="first name"
            required
            outlined
            shaped
          ></v-text-field>
             </form>

        <form name="registerForm" autocomplete="off">
          <v-text-field
            class="mt-5"
            v-model="lastName"
            :rules="[v => !!v || 'Last Name is required']"
            label="last name"
            required
            outlined
            shaped
          ></v-text-field>
             </form>

        <form name="registerForm" autocomplete="off">
          <v-text-field
            class="mt-5"
            v-model="email"
            :rules="[ v => !!v || 'Email is required', v => /.+@.+/.test(v) || 'E-mail must be valid' ]"
            label="email"
            required
            outlined
            shaped
          ></v-text-field>
             </form>
        
        <form name="registerForm" autocomplete="off">
        <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="Password"
            hint="At least 8 characters alphanum (Uppercase, Lowercase and number)"
            v-model="password"
            :rules="[v => !!v || 'Password is required',v => (v && v.length >= 8) || 'Password must have 8+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number', 
    v => /([!@$%*])/.test(v) || 'Must have one special character [!@#$%]' 
]"
            class="input-group--focused"
            @click:append="flag = !flag"
            required
            outlined
            shaped
          ></v-text-field>
             </form>
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
          <v-btn @click="register" class="pink darken-2 mb-5"  dark>Register</v-btn>
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
