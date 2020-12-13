<template >
  <v-layout>
    <v-flex xs10 offset-xs1 class="mt-5">
      <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4">

        <v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
          <v-toolbar-title>Profile</v-toolbar-title>
        </v-toolbar>
        <v-carousel v-model="model">
    <v-carousel-item
      v-for="(color, i) in colors"
      :key="color"
    >
      <v-sheet
        :color="color"
        height="100%"
        tile
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="display-3">
            Slide {{ i + 1 }}
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
<div class="basic">
  <h3>{{firstName}}  {{lastName}}</h3>
  <div align="right">
  <v-card-subtitle v-if="connect">Online <v-icon color="green" x-small right>fas fa-circle</v-icon> </v-card-subtitle>
  </div>
  <h2>{{login}}</h2>
  <h5>{{gender}} looking for a {{lookingfor}}</h5>
  <h5>{{age}}</h5>
  <h5>{{city}}</h5>

                <v-rating
                :value="fame / 1000"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                {{fame / 1000}} Fame rating
                </div>

                <div class="grey--text ml-4">
                </div>
  <h6>{{bio}}</h6>
    <br>
  <h6>Joined Matcha sence : {{creationdate}}</h6>
</div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'
import {logoutUser} from '@/policies/auth'
import { getList } from '@/utils/utils'
import { likeIt } from '@/utils/utils'
import { checkLike } from '@/utils/utils'
import { isLoggedIn } from '@/policies/auth'
import { getUserInfo } from '@/policies/auth'
import vue from 'Vue'

export default {
  data () {
    return {
      alert: true,
      flag: true,
      reg: null,
      error: null,
      login: '',
      gender: '',
      lookingfor: '',
      firstName: '',
      lastName: '',
      connect: '1',
      fame: '',
      age: '',
      colors: [],
      creationdate: '',
      city: '',
      bio: '',
      errors: [],
        model: 0,
    }
  },
  mounted: async function() {
    try {
      var myinfo = await getUserInfo()
      this.login = myinfo.login;
      this.colors[0] = myinfo.mainFoto;
      this.colors[1] = myinfo.foto1;
      this.colors[2] = myinfo.foto2;
      this.colors[3] = myinfo.foto3;
      this.colors[4] = myinfo.foto4;
      this.fame = myinfo.fame;
      this.gender = myinfo.gender;
      this.lookingfor = myinfo.lookingfor;
      this.firstName = myinfo.firstName;
      this.lastName = myinfo.lastName;
      this.lastName = myinfo.lastName;
      this.online = myinfo.online;
      this.age = myinfo.age;
      console.log(myinfo);
      var date = new Date(myinfo.registrationDate);
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDay();
      var creationdate = day + " / " + month + " / " + year ;
      this.creationdate = creationdate;
      console.log(this.creationdate);
      this.city = myinfo.city;
      this.bio = myinfo.bio;
    }
  catch (err) {
          console.log(err);
        }
      },
  methods: {
          
  }
}
</script>

<style scoped>
.basic {
  margin-top: 15px;
  padding: 20px;
  text-align: left;
}
</style>