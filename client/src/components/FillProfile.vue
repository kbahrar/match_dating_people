<template >
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-5">
      <div class="grey lighten-3 elevation-5">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>Fill profile to continue</v-toolbar-title>
        </v-toolbar>
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
         <v-row align="center">
           <v-col cols="12">
             <v-select
             :items="gender"
             :menu-props="{ top: true, offsetY: true }"
             label="Chose your gender"
             v-model="mygender"
             :rules="[v => !!v || 'gender required']"
             ></v-select>
             </v-col>
             </v-row>


          <v-card-text>
            <strong>I am : {{ age }} years old</strong>
            <v-slider
              v-model="age"
              :rules="[v => !!v || 'age required !', v=> /^[0-9]{2}$/.test(v) || 'invalide age.',v => v >= 18 || 'your age must be over 18 to join Matcha.']"
              step="1"
              thumb-label
              ticks
            ></v-slider>
          </v-card-text>

         <v-row align="center">
           <v-col cols="12">
             <v-select
             :items="lookingfor"
             :menu-props="{ top: true, offsetY: true }"
             label="Looking for ?"
            v-model="mylookingfor"
            :rules="[v => !!v || 'preferences required']"
             ></v-select>
             </v-col>
             </v-row>
          
      <v-textarea
          name="Biography"
          label="Biography"
          hint="Hint text"
          v-model="biography"
          :rules="[v => !!v || 'biography required at least 100 word', v=> v.length > 100 || 'invalide biography.']"
        ></v-textarea>

 <v-combobox
    v-model="chips"
    :items="items"
    chips
    clearable
    label="at least 1 tag so people can know your interests"
    multiple
    prepend-icon="mdi-filter-variant"
    solo
  >
    <template v-slot:selection="{ attrs, item, select, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        @click="select"
        @click:close="remove(item)"
      >
        <strong>{{ item }}</strong>&nbsp;
      </v-chip>
    </template>
  </v-combobox>

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
          <v-btn @click="checkForm($event)" class="pink darken-2 mb-5"  dark>Confirm profile</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'
import { getUserInfo } from '@/policies/auth'

export default {
  data () {
    return {
      chips: ['Coding', 'Gaming', 'Netflix', 'Sleeping'],
      items: ['Streaming', 'Eating','Dancing','Chating','weed','travel','love', 'nature'],
      gender: ['Male', 'Female', 'Other'],
      mygender: '',
      mychips: [],
      lookingfor: ['Male', 'Female', 'Other'],
      mylookingfor: '',
      alert: true,
      flag: true,
      age: 18,
      biography: '',
      reg: null,
      error: null,
      errors: [],
    }
  },
  methods: {
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
    fillProfile: async function() {
      try {
        var user = getUserInfo()
        this.error = null
        this.reg = 'profile succesfully created !'
        await Authent.fillprofile(
          {
          user: {
          gender: this.mygender,
          age: this.age,
          chips: this.chips,
          mylookingfor: this.mylookingfor,
          biography: this.biography
        },
        info: user
        })
        this.$router.push('fillpics')
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
      var i = 0;
      if (!this.mygender) {
        this.errors.push("gender type required.");
      }
      if (!this.age || this.age < 18) {
        this.errors.push("age required.");
      }
      if (!this.mylookingfor) {
        this.errors.push("Targeted gender required.");
      }
      if (!this.chips || this.chips.length < 5) {
        this.errors.push("at least 5 tag required !.");
      }
      if (!this.biography || this.biography.length < 100) {
        this.errors.push("Biography required !");
      }
      else if(this.biography.length < 100)
      {
        this.errors.push("Biography is less than 100 caracter.");
      }
      if (!this.errors.length) {
        this.fillProfile();
      }
      else
        e.preventDefault();
    }
  }
}
</script>

<style scoped>
</style>
