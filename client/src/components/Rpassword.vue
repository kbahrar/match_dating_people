<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-5">
      <div class="grey lighten-3 elevation-2">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>Reset Password</v-toolbar-title>
        </v-toolbar>

        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          <v-text-field
            class="mt-5"
            v-model="email"
            type="email"
            :rules="[ v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Invalide email.' ]"
            label="email"
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
      email: '',
      reg: null,
      error: null,
      errors: []
    }
  },
  methods: {
    rpassword: async function() {
      try {
        this.error = null
        this.reg = 'password reset success check your mail !'
        await Authent.rpassword({
          email: this.email,
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
      if (this.email.length == 0) {
        this.errors.push('Email required.');
      } else if (!Valide.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }
      if (!this.errors.length) {
        this.rpassword();
      }
      else
        e.preventDefault();
    }
  }
}
</script>

<style scoped>
</style>
