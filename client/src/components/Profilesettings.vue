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
      <v-tab>
        <v-icon left>
          mdi-lock
        </v-icon>
        password
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-access-point
        </v-icon>
        criteria
      </v-tab>

      <v-tab-item>
                            <v-layout>
    <v-flex xs6 offset-xs3>
              
              <v-card-text>
                <strong>I am : {{ informations.age }} years old</strong>
               <v-slider
                  v-model="informations.age"
                 step="1"
                 thumb-label
                 ticks
                ></v-slider>
             </v-card-text>
           

        
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
                <v-text-field
            class="mt-5"
            v-model="informations.email"
            type="email"
            label="enter your new email"
            outlined
            shaped
          ></v-text-field>

          <v-text-field
            class="mt-5"
            v-model="informations.firstName"
            label="first name"
            required
            outlined
            shaped
          ></v-text-field>

          <v-text-field
            class="mt-5"
            v-model="informations.lastName"
            label="last name"
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
          <v-btn @click="updateinfo($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
        </div>
    </v-flex>
  </v-layout>
      </v-tab-item>
      <v-tab-item>
        <v-layout>
    <v-flex xs6 offset-xs3>

        
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          

    
        
        <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="type your old password"
            hint="At least 8 characters alphanum (Uppercase, Lowercase and number)"
            v-model="code.password"
            class="input-group--focused"
            @click:append="flag = !flag"
            outlined
            shaped
          ></v-text-field>
        <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="type your new password"
            hint="At least 8 characters alphanum (Uppercase, Lowercase and number)"
            v-model="code.newpassword"
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
      <v-tab-item>
        <v-layout>
    <v-flex xs6 offset-xs3>
              
              
             <v-row align="center">
           <v-col cols="12">
             <v-select
             :items="criteria.gender"
             :menu-props="{ top: true, offsetY: true }"
             label="Chose your gender"
             v-model="criteria.mygender"
             ></v-select>
             </v-col>
             </v-row>

             <v-text-field
            class="mt-5"
            v-model="criteria.city"
            label="enter your City"
            required
            outlined
            shaped
          ></v-text-field>

                   <v-row align="center">
           <v-col cols="12">
             <v-select
             :items="criteria.lookingfor"
             :menu-props="{ top: true, offsetY: true }"
             label="Looking for ?"
            v-model="criteria.mylookingfor"
             ></v-select>
             </v-col>
             </v-row>

             <v-textarea
          name="Biography"
          label="Biography"
          hint="Hint text"
          v-model="criteria.biography"
        ></v-textarea>

        
       <v-combobox
    v-model="criteria.chips"
    :items="criteria.items"
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

    <div>
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
          <v-btn @click="updatecriteria($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
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
      errors: []
    }
  },
  methods: {
      remove (item) {
        this.criteria.chips.splice(this.criteria.chips.indexOf(criteria.item), 1)
        this.criteria.chips = [...this.criteria.chips]
      },
    
  }
}
</script>

<style scoped>
</style>

