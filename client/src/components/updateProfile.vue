<template>
    <v-flex xs6 offset-xs3 class="mt-5">
    
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
        info
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-email
        </v-icon>
        mail
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-bio
        </v-icon>
        Bio
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-lock
        </v-icon>
        Pass
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-tag
        </v-icon>
        Tags
      </v-tab>

      <v-tab-item>
      <v-layout >
      <v-flex xs6 offset-xs3>
              
              <v-card-text>
                <strong>I am : {{ updates.age }} years old</strong>
               <v-slider
                  v-model="updates.age"
                 step="1"
                 thumb-label
                 ticks
                ></v-slider>
             </v-card-text>

             

          <v-text-field
            class="mt-5"
            v-model="updates.firstName"
            label="first name"
            required
            outlined
            shaped
          ></v-text-field>

          <v-text-field
            class="mt-5"
            v-model="updates.lastName"
            label="last name"
            required
            outlined
            shaped
          ></v-text-field>

               <v-row align="center">
           <v-col cols="12">
             <v-select
             :items="gender"
             :menu-props="{ top: true, offsetY: true }"
             label="Change your gender"
             v-model="updates.gender"
             ></v-select>
             </v-col>
             </v-row>

             <v-row align="center">
           <v-col cols="12">
             <v-select
             :items="lookingfor"
             :menu-props="{ top: true, offsetY: true }"
             label="Looking for ?"
            v-model="updates.lookingfor"
             ></v-select>
             </v-col>
             </v-row>
                 
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
          <v-btn @click="checkForm($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
        </div>
    </v-flex>
  </v-layout>
      </v-tab-item>
      


    <v-tab-item class="mt-5">
    <v-layout>
        <v-flex xs6 offset-xs3>
              
 
          <v-text-field
            class="mt-5"
            v-model="updates.email"
            label="Enter the new Email"
            required
            outlined
            shaped
            
          ></v-text-field>


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
          <v-btn @click="checkEmailForm($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
        </div>
    </v-flex>

    </v-layout>

      </v-tab-item>
      <v-tab-item class="mt-5">
        <v-layout>
<v-flex xs6 offset-xs3 >
             <v-textarea
          name="Biography"
          label="Biography"
          hint="Hint text"
          v-model="updates.bio"
        ></v-textarea>
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
          <v-btn @click="checkBioForm($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
        </div>

    </v-flex>

  </v-layout>
      </v-tab-item>


      <v-tab-item class="mt-5">
        <v-layout>
<v-flex xs6 offset-xs3 class="">
                       <v-text-field 
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="write your new password"
            hint="At least 8 characters alphanum"
            v-model="updates.password"
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
                                 <v-text-field
            :append-icon="flag ? 'mdi-eye' : 'mdi-eye-off'"
            :type="!flag ? 'text' : 'password'"
            name="password"
            label="repeat the new password"
            hint="At least 8 characters alphanum"
            v-model="updates.repeatpassword"
            class="input-group--focused"
            :rules="[v => !!v || 'Password is required',v => (v && v.length >= 8) || 'Password must have 8+ characters',
    v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
    v => /(?=.*\d)/.test(v) || 'Must have one number', 
]"
            @click:append="flag = !flag"
            outlined
            shaped
          ></v-text-field>
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
          <v-btn @click="checkPasswordForm($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
        </div>

</v-flex>
        </v-layout>
      </v-tab-item>


      <v-tab-item class="mt-5">
        <v-layout > 
<v-flex xs6 offset-xs3 >
                    
      
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
          <v-btn @click="checkTagsForm($event)" class="pink darken-2 mb-5"  dark>Update</v-btn>
        </div>

    </v-flex>

  </v-layout>
      </v-tab-item>



    </v-tabs>
  </v-card>
  </v-flex>
</template>

<script>
import Authent from '@/services/AuthService'
import { getUserInfo } from '@/policies/auth'
import { logoutUser } from '@/policies/auth'
import Valide from '@/policies/valideForm'
import {getUser} from '@/utils/utils'

export default {
  data () {
    return {
      gender:['Male','Female','Others'],
      lookingfor: ['Male', 'Female', 'Others'],
      chips: [],
      items: ['Streaming', 'Eating','Dancing','Chating','weed','travel','love', 'nature'],
      mychips: [],
      updates: {},
      reg: null,
      errors: [],
      error: null,
      flag: true,
      alert: true,
      id: false,
      user: {}
    }
  },
  mounted: async function() {
    var myinfo = getUserInfo()
      var user = await getUser(myinfo.id)
     this.user = user;
     this.updates = {...user}
     for (let i = 0; i < this.updates.tags.length; i++) {
       this.chips[i] = this.updates.tags[i].tag
     }
  },
  methods: {
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
      },
      updateProfile: async function() {
        try {
          this.error = null;
          this.reg = 'age updated !';
          await Authent.updateprofile(
            {
              info: {
                id: this.user.id,
                age: this.updates.age,
                firstName: this.updates.firstName,
                lastName: this.updates.lastName,
                gender: this.updates.gender,
                lookingfor: this.updates.lookingfor
              },
            })
            // this.$router.push('profilesettings')
          } catch (err) {
            this.reg = null;
            this.error = err.response.data.error || 'No response from server'
            this.alert = true
            if (err.response.status === 401)
            {
              logoutUser()
              this.$router.go('login')
            }
          }
          },
      updateProfileEmail: async function() {
        try {
          this.error = null;
          this.reg = 'Email changed succefully!';
          await Authent.updateprofileemail(
            {
              info: {
                id: this.user.id,
                email: this.updates.email,
              },
            })
          } catch (err) {
            this.reg = null;
            this.error = err.response.data.error || 'Email not Valid !'
            this.alert = true
            if (err.response.status === 401)
            {
              logoutUser()
              this.$router.go('login')
            }
          }
          },
      updateProfileTags: async function() {
        try {
          this.error = null;
          this.reg = 'Tags changed succefully!';
          await Authent.updateprofiletags(
            {
              info: {
                id: this.user.id,
                chips: this.chips,
              },
            })
            
          } catch (err) {
            this.reg = null;
            this.error = err.response.data.error || 'Tags not Valid !'
            this.alert = true
            if (err.response.status === 401)
            {
              logoutUser()
              this.$router.go('login')
            }
          }
          },
      updateProfileBio: async function() {
        try {
          this.error = null;
          this.reg = 'Biography Updated succefully!';
          await Authent.updateprofilebio(
            {
              info: {
                id: this.user.id,
                bio: this.updates.bio,
              },
            })
          } catch (err) {
            this.reg = null;
            this.error = err.response.data.error || 'Biography not Valid !'
            this.alert = true
            if (err.response.status === 401)
            {
              logoutUser()
              this.$router.go('login')
            }
          }
          },
      checkBioForm: function (e) {
        this.errors = [];
        
      if (!this.updates.bio) {
        this.errors.push("Write a new valid biography !");
      }
      else if(this.checkBio() && !this.errors.length)
      {
        this.updateProfileBio();
      }
      else
        e.preventDefault();
    },


        updateProfilePassword: async function() {
          try {
            this.error = null;
            this.reg = 'Password Updated succefully!';
            await Authent.updateprofilepassword(
              {
                info: {
                  id: this.user.id,
                  password: this.updates.password,
                },
              })
              logoutUser()
                this.$router.go('login');
            } catch (err) {
              this.reg = null;
              this.error = err.response.data.error || 'Password not Valid !'
              this.alert = true
              if (err.response.status === 401)
              {
                logoutUser()
                this.$router.go('login')
              }
            }
            },

      checkPasswordForm: function (e) {
        this.errors = [];
        
      if (this.updates.password.length == 0) {
        this.errors.push("password required.");
      }
      else if (!Valide.validPwd(this.updates.password))
        this.errors.push("invalide password.");
      else if (this.updates.password !== this.updates.repeatpassword)
        this.errors.push("Passwords does not match.");

      if (!this.errors.length) {
        this.updateProfilePassword();
      }
      else
        e.preventDefault();
    },

      checkEmailForm: function (e) {
        this.errors = [];
        
      if (!this.updates.email) {
        this.errors.push("Pick a new Valid Email.");
      }
      else if(this.checkEmail() && !this.errors.length)
      {
        this.updateProfileEmail();
      }
      else
        e.preventDefault();
    },















      checkTagsForm: function (e) {
        this.errors = [];
        this.alert = true
      for (let i = 0; i < this.chips.length; i++) {
          
          if(this.chips[i].length < 3)
               this.errors.push("pick a new valid tags.");
      }
      if (!this.chips) {
        this.errors.push("pick a new valid tags.");
      }
      else if (!this.chips || this.chips.length < 5)
        this.errors.push("at least 5 tag required !.");
      else if (this.checktagsupdates(this.chips, this.updates.tags) == false)
        this.errors.push("you don't change anything");
      else if(this.chips && this.chips.length >= 5 && !this.errors.length )
      {
          this.updateProfileTags();
       }
      else
        e.preventDefault();
    },

    checktagsupdates(tags, chips)
    {
      var check = 0
      if (tags.length !== chips.length) {
        return true
      }
      for (let i = 0; i < tags.length; i++) {
        for (let j = 0; j < chips.length; j++) {
          console.log(tags[i] + ' ' + chips[j].tag)
          if (tags[i] == chips[j].tag) {
            check++
            break ;
          }
        }
      }
      console.log(check)
      if (check == tags.length)
        return false
      return true
    },














      checkForm: function (e) {
        this.errors = [];
      if (!this.updates.age || this.updates.age < 18 || this.updates.age > 100) {
        this.errors.push("age not valide.");
      }
      if (!this.updates.firstName) {
        this.errors.push("pick a new firstName or write the old one.");
      }
      if (!this.updates.lastName) {
        this.errors.push("pick a new lastName or write the old one.");
      }
      if (!this.updates.gender || (this.updates.gender != 'Male' && this.updates.gender != 'Female' && this.updates.gender != 'Others')) {
        this.errors.push("gender not valide.");
      }
      if (!this.updates.lookingfor || (this.updates.lookingfor != 'Male' && this.updates.lookingfor != 'Female' && this.updates.lookingfor != 'Others')) {
        this.errors.push("what are you lookingfor is not valide.");
      }
      else if(this.checkAll() && !this.errors.length)
      {
        this.updateProfile();
      }
      else
        e.preventDefault();
    },

    checkAll () {
      if (this.updates.age != this.user.age)
        return true
      if (this.updates.firstName != this.user.firstName)
        return true
      if (this.updates.lastName != this.user.lastName)
        return true
      if (this.updates.gender != this.user.gender)
        return true
      if (this.updates.lookingfor != this.user.lookingfor)
        return true
      if (this.updates.email != this.user.email)
        return true
      return false
    },

    checkEmail () {
      if (this.updates.email != this.user.email)
        return true
      return false
    },

    checkBio () {
      if (this.updates.bio != this.user.bio)
        return true
      return false
    },

    checkTags () {
      if (this.updates.chips != this.user.chips)
        return true
      return false
    }

  }
}
</script>

<style scoped>
</style>

