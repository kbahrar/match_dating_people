<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="grey lighten-3 elevation-2">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>Create A New Password</v-toolbar-title>
        </v-toolbar>
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>

                <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="Type your new Password"
            hint="At least 8 characters alphanum (Uppercase, Lowercase and number)"
            v-model="password"
            :rules="[v => !!v || ' New Password is required',v => (v && v.length >= 8) || 'Password must have 8+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number']"
            class="input-group--focused"
            @click:append="flag = !flag"
            required
            outlined
            shaped
             @keyup.enter="checkForm"
          ></v-text-field>

        <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="rpassword"
            label="Repeat The New Password"
            hint="At least 8 characters alphanum (Uppercase, Lowercase and number)"
            v-model="rpassword"
            :rules="[v => !!v || 'Repeat the New Password here',v => (v && v.length >= 8) || 'Password must have 8+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number']"
            class="input-group--focused"
            @click:append="flag = !flag"
            required
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
          <v-btn @click="checkForm($event)" class="pink darken-2 mb-5" dark>Reset Password</v-btn>
        </div>
        </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'
import Valide from '@/policies/valideForm'

export default {
  data () {
    return {
      alert: true,
      flag: true,
      password: '',
      rpassword: '',
      reg: null,
      error: null,
      errors: []
    }
  },
  methods: {
    npassword: async function() {
      try {
        this.error = null
        this.reg = 'password reset success check your mail !'
        await Authent.npassword({
          password: this.password,
        })
        this.$router.push('login')
      } catch (err) {
        this.reg = null
        this.error = err.response.data.error || 'No response from server'
        this.alert = true
      }
    },
    checkForm: function (e) {
      this.errors = [];
        if (this.password.length == 0) {
        this.errors.push('New password required.');
        }
      if (this.rpassword.length == 0) {
        this.errors.push('Repeat your new password.');
      } 
      if (this.password.value != this.npassword.value) {
        this.errors.push('passwords does not match.');
      }
      if (!this.errors.length) {
        this.npassword();
      }
      else
        e.preventDefault();
    }
  }
}
</script>

<style scoped>
</style>
