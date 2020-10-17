<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="grey lighten-3 elevation-5">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>Register</v-toolbar-title>
        </v-toolbar>
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          
          <v-text-field
            class="mt-3"
            v-model="login"
            :rules="[v => !!v || 'Login is required', v => /^[A-Za-z][A-Za-z0-9]{2,31}$/.test(v) || 'invalide login.']"
            label="login"
            required
            outlined
            shaped
          ></v-text-field>

          <v-text-field
            class="mt-5"
            v-model="firstName"
            :rules="[v => !!v || 'First Name is required', v => /^[A-Za-z][A-Za-z]{2,31}$/.test(v) || 'invalide first name.']"
            label="first name"
            required
            outlined
            shaped
          ></v-text-field>

          <v-text-field
            class="mt-5"
            v-model="lastName"
            :rules="[v => !!v || 'Last Name is required', v=> /^[A-Za-z][A-Za-z]{2,31}$/.test(v) || 'invalide last name.']"
            label="last name"
            required
            outlined
            shaped
          ></v-text-field>

          <v-text-field
            class="mt-5"
            v-model="email"
            type="email"
            :rules="[ v => !!v || 'Email is required', v => /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/.test(v) || 'Invalide email.' ]"
            label="email"
            required
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
            :rules="[v => !!v || 'Password is required',v => (v && v.length >= 8) || 'Password must have 8+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number', 
]"
            class="input-group--focused"
            @click:append="flag = !flag"
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
          <v-btn @click="checkForm($event)" class="pink darken-2 mb-5"  dark>Register</v-btn>
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
      error: null,
      errors: []
    }
  },
  methods: {
    register: async function() {
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
    },
    checkForm: function (e) {
      this.errors = [];

      if (!this.login) {
        this.errors.push("login required.");
      }
      else if(!this.validLogin(this.login))
        this.errors.push("invalide login.");
      if (!this.firstName) {
        this.errors.push("first name required.");
      }
      else if(!this.validFirstName(this.firstName))
        this.errors.push("invalide first name.");
      if (!this.lastName) {
        this.errors.push("last name required.");
      }
      else if(!this.validLastName(this.lastName))
        this.errors.push("invalide last name.");
      if (!this.password) {
        this.errors.push("password required.");
      }
      else if (!this.validPwd(this.password))
        this.errors.push("invalide password.");
      if (!this.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }

      if (!this.errors.length) {
        this.register();
      }
      else
        e.preventDefault();
    },
    validFirstName: function(firstName) {
      var re = /^[A-Za-z][A-Za-z]{2,31}$/;
      return re.test(firstName);
    },
    validLastName: function(lastName) {
      var re = /^[A-Za-z][A-Za-z]{2,31}$/;
      return re.test(lastName);
    },
    validLogin: function(login) {
      var re = /^[A-Za-z][A-Za-z0-9]{2,31}$/;
      return re.test(login);
    },
    validEmail: function (email) {
      var re = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/;
      return re.test(email);
    },
    validPwd: function (pwd) {
      var L = /(?=.*[a-z])/.test(pwd);
      var U = /(?=.*[A-Z])/.test(pwd); 
      var N = /(?=.*\d)/.test(pwd);
      if (pwd.length < 8 || !L || !U || !N)
        return false;
      return true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
