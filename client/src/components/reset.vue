<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-5">
      <div class="grey lighten-3 elevation-2">
          <v-toolbar flat dense class="pink darken-2" dark>
            <v-toolbar-title>reset Password</v-toolbar-title>
          </v-toolbar>
          <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="New Password"
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
             @keyup.enter="updatePwd"
          ></v-text-field>

          <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password_2"
            label="Repeat Password"
            hint="At least 8 characters alphanum (Uppercase, Lowercase and number)"
            v-model="password_2"
            :rules="[v => !!v || 'Password is required',v => (v && v.length >= 8) || 'Password must have 8+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number', 
]"
            class="input-group--focused"
            @click:append="flag = !flag"
            required
            outlined
            shaped
             @keyup.enter="updatePwd"
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
          <v-btn @click="updatePwd" class="pink darken-2 mb-5"  dark>Update password</v-btn>
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
      password_2: '',
      reg: null,
      error: ''
    }
  },
  methods: {
    updatePwd: async function () {
      try {
        this.error = null
        this.reg = 'you updated password with success !'
        await Authent.reset({
          token: this.$route.params.token,
          password: this.password
        })
        this.$router.push('login')
      }
      catch (err) {
        this.reg = null
        this.error = err.response.data.error || err
        this.alert = true
      }
    },
    checkForm: function (e) {
      this.error = null
      if (!Valide.validPwd(this.password))
        this.error = "invalide password."
      else if (this.password !== this.password_2)
        this.error = "you repeate wrong password."
      if (!this.error) {
         console.log(this.$route.params.token)
        this.updatePwd();
      }
      else
        e.preventDefault();
    }
  }
}
</script>

<style scoped>
</style>