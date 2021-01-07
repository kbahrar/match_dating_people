<template>
  <v-card>
    <v-toolbar
      flat dense class="pink darken-2" dark
    >
      <v-toolbar-title>User Profile</v-toolbar-title>
    </v-toolbar>
    <v-tabs horizontal right>
      <v-tab>
        <v-icon left>
          mdi-thumb-up
        </v-icon>
        liked
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-eye
        </v-icon>
        seen
      </v-tab>

      <v-tab-item>
    <v-layout>
    <v-flex xs6 offset-xs3>

                <v-card
    class="mx-auto"
    outlined
    max-width="800"
  >
    <v-list-item three-line>
      <v-list-item-content>
        
        <v-list-item-title class="headline mb-1">
          Name or login
        </v-list-item-title>
        <v-list-item-subtitle >age</v-list-item-subtitle>
        <v-list-item-subtitle>gender</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        size="100"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Button
      </v-btn>
    </v-card-actions>
  </v-card>






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
          <v-btn @click="updateinfo($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
    </v-flex>
  </v-layout>
      </v-tab-item>
      <v-tab-item>
        <v-layout>
    <v-flex xs6 offset-xs3>
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
          <v-btn @click="updatepassword($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
        </div>
    </v-flex>
  </v-layout>
      </v-tab-item>
     
    </v-tabs>
  </v-card>
</template>

<script>
import Authent from '@/services/AuthService'
import Valide from '@/policies/valideForm'

export default {
  data () {
    return {
        informations: {
            age: null,
            lastName: null,
            firstName: null,
            email: null,
        },
        code: {
            password:null,
            newpassword: null,
        },
        criteria:{
            chips: ['Coding', 'Gaming', 'Netflix', 'Sleeping'],
            items: ['Streaming', 'Eating','Dancing','Chating','weed','travel','love', 'nature'],
            gender: ['Male', 'Female', 'Other'],
      mygender: '',
      mychips: [],
      city: '',
      lookingfor: ['Male', 'Female', 'Other'],
      mylookingfor: '',
        },
      alert: true,
      flag: true,
      reg: null,
      error: null,
      errors: {
        informations: [],
        code: [],
        criteria: [],
    }
    }
  },
  methods: {
      remove (item) {
        this.criteria.chips.splice(this.criteria.chips.indexOf(criteria.item), 1)
        this.criteria.chips = [...this.criteria.chips]
      },
      updateinformations: async function() {
      try {
        this.error = null
        this.reg = 'informations succesfully updated !'
        await Authent.updateinformations({
          age: this.informations.age,
          email: this.informations.email,
          firstName: this.informations.firstName,
          lastName: this.informations.lastName,
        },
        )
      } catch (err) {
        this.reg = null
        this.error = err.response.data.error || 'No response from server'
        this.alert = true
      }
    },
      updatecode: async function() {
      try {
        this.error = null
        this.reg = 'password succesfully changed !'
        await Authent.updatecode({
          password: this.code.password,
          newpassword: this.code.newpassword,
        },
        )
      } catch (err) {
        this.reg = null
        this.error = err.response.data.error || 'No response from server'
        this.alert = true
      }
    },
    updateinfo: function (e) {
      this.errors.informations = [];

      if (this.informations.firstName) {
        if(!Valide.validFirstName(this.informations.firstName))
          this.errors.informations.push("invalide first name.");
      }
      if (this.informations.lastName) {
        if(!Valide.validLastName(this.informations.lastName))
          this.errors.informations.push("invalide last name.");
      }
      if (this.informations.email) {
        if (!Valide.validEmail(this.email)) 
          this.errors.informations.push('Valid email required.');
      }
      if (!this.informations.age || this.informations.age < 18) {
        this.errors.informations.push("age required.");
      }
      if (!this.errors.informations.length) {
        this.updateinformations();
      }
      else
        e.preventDefault();
    },
    updatepassword: function (e) {
      this.errors.code = [];
      if (this.code.password && !this.code.newpassword || this.code.newpassword && !this.code.password)
          this.errors.code.push("please fill all the inputs to change your password !");
      if (!Valide.validPwd(this.code.password) || !Valide.validPwd(this.code.newpassword))
          this.errors.code.push("invalide password.");
      
      if (!this.errors.code.length) {
        this.updatecode();
      }
      else
        e.preventDefault();
    }
  }
}
</script>

<style scoped>
</style>

