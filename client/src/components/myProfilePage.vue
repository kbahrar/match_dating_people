<template >
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4">

        <v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
          <v-toolbar-title>My Profile</v-toolbar-title>
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
  <h2>{{firstName}}  {{lastName}}<i style="text-align: right">{{online}}</i></h2>
 
  <h3>{{login}}</h3>
  <h5>{{age}}</h5>
  <h5>{{creatindate}}</h5>
  <h5>{{city}}</h5>

                <v-rating
                size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                </div>
  <h6>{{bio}}</h6>
    <br>
    <br>
 
      <!-- <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        @click="select"
        @click:close="remove(item)"
      >
        <strong>{{ items }}</strong>&nbsp;
      </v-chip> -->
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
import vue from 'Vue'

export default {
  data () {
    return {
      alert: true,
      flag: true,
      reg: null,
      error: null,
      login: '',
      firstName: '',
      lastName: '',
      online: '',
      age: '',
      creationdate: '',
      city: '',
      bio: '',
      errors: [],
        model: 0,
      foto: [
        mainfoto,
        foto1,
        foto2,
        foto3,
        foto4,
      ],
    }
  },
  mounted: async function() {
    try {
      var myinfo = await mypro()
      this.login = myinfo.login;
      this.firstName = myinfo.firstName;
      this.lastName = myinfo.lastName;
      this.lastName = myinfo.lastName;
      this.online = myinfo.online;
      this.age = myinfo.age;
      this.creationdate = myinfo.creationdate;
      this.city = myinfo.city;
      this.bio = myinfo.bio;
      this.mainfoto = myinfo.mainfoto;
      this.foto1 = myinfo.foto1;
      this.foto2 = myinfo.foto2;
      this.foto3 = myinfo.foto3;
      this.foto4 = myinfo.foto4;
    }
  catch (err) {
          console.log(err);
        }
      }
}
</script>

<style scoped>
.basic {
  margin-top: 15px;
  padding: 20px;
  background-color:beige;
  text-align: left;
}
</style>