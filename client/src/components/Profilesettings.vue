<template>
  <v-card>
    <v-toolbar
      flat dense class="pink darken-2" dark
    >
      <v-toolbar-title>User Profile</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>
          mdi-account
        </v-icon>
        informations
      </v-tab>
      

      <v-tab-item>
                            <v-layout>
    <v-flex xs6 offset-xs3>
              
              <v-card-text>
                <strong>I am : {{ age }} years old</strong>
               <v-slider
                  v-model="age"
                 step="1"
                 thumb-label
                 ticks
                ></v-slider>
             </v-card-text>
           

        
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
               
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
          <v-btn @click="changeage($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
        </div>
    </v-flex>
  </v-layout>
      </v-tab-item>
      <v-tab-item>
        <v-layout>
  </v-layout>
      </v-tab-item>
      <v-tab-item>

      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Authent from '@/services/AuthService'
import { getUserInfo } from '@/policies/auth'

export default {
  data () {
    return {
      alert: true,
      flag: true,
      age: '',
      reg: null,
      error: null,
      errors: [],
    }
  },
  mounted: async function(){
    try {
      var myinfo = await getUserInfo()
     this.age = myinfo.age;

  }
 catch (err) {
          console.log(err);
        }
  },
  methods: {
        changeage: async function() {
      try {
        this.error = null
        this.reg = 'profile succesfully created !'
        await Authent.profilesettings({
          age: this.age,
        })
      } catch (err) {
        this.reg = null
        this.error = err.response.data.error || 'No response from server'
        this.alert = true
        if (err.response.status === 401)
        {
          logoutUser()
          this.$router.go('login')
        }
      }
    },
      checkForm: function (e) {
      this.errors = [];
      
      if (!this.age || this.age < 18) {
        this.errors.push("age required.");
      }
      else if(this.age != myinfo.age)
      {
          changeage();
      }
      if (!this.errors.length) {
        this.changeage();
      }
      else
        e.preventDefault();
    }
    
  }
}
</script>

<style scoped>
</style>

