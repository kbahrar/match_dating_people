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
<v-card class="d-flex pa-2"
     >

  <h2>full name</h2>
  <h3>{{login}}</h3>
        
</v-card>
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
}
</script>

<style scoped>
</style>