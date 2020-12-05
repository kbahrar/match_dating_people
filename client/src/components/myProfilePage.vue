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
  <h2>full name</h2>
  <h3>login</h3>
  <h5>age</h5>
  <h5>location</h5>
  <h7>my name is x i love xixing so dont stop xing me brothersmy name is x i love xixing so don
    t stop xing me brothersmy name is x i love xixing so dont stop xing me brothers</h7>
    <br>
    <br>
 
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        @click="select"
        @click:close="remove(item)"
      >
        <strong>{{ items }}</strong>&nbsp;
      </v-chip>
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
import vue from 'Vue'

export default {
  data () {
    return {
      chips: ['Coding', 'Gaming', 'Netflix', 'Sleeping'],
      // pictures: [],
      items: ['Streaming', 'Eating','Dancing','Chating','weed','travel','love', 'nature'],
      gender: ['Male', 'Female', 'Other'],
      mygender: '',
      mychips: [],
      city: '',
      alert: true,
      flag: true,
      age: 18,
      biography: '',
      reg: null,
      error: null,
      errors: [],
        model: 0,
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
    }
  },
        methods: {
          remove (item) {
            this.chips.splice(this.chips.indexOf(item), 1)
            this.chips = [...this.chips]
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