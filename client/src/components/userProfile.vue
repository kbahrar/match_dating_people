<template >
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4">

        <v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
          <v-toolbar-title>My Profile</v-toolbar-title>
        </v-toolbar>
        <v-carousel>
    <v-carousel-item
      v-for="(image, i) in images"
      :key="i"
    >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
            <v-img :src="image" height="100%" width="100%"></v-img>
        </v-row>
    </v-carousel-item>
  </v-carousel>
<div class="basic">
  <h2>{{user.firstName}} {{user.lastName}}</h2>
  <h3>{{user.login}}</h3>
  <h5>{{user.age}}</h5>
  <h5>{{user.city}}</h5>
  <div class="my-4 subtitle-2">
                Bio
            </div>

            <div>{{user.bio}}</div>
                <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                :value="user.fame / 1000"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                {{user.fame / 1000}} Fame rating
                </div>
            </v-row>
                <div class="grey--text ml-4">
                </div>
    <br>
    <br>
 
      <v-card-title>Tags</v-card-title>

            <v-card-text>
                <v-chip-group
                    column
                >
                    <v-chip v-for="tag in user.tags" :key="tag.tag">#{{tag.tag}}</v-chip>
                </v-chip-group>
            </v-card-text>
</div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'
import {logoutUser} from '@/policies/auth'
import { getOtherUser } from '@/utils/utils'
import { likeIt } from '@/utils/utils'
import { checkLike } from '@/utils/utils'
import vue from 'Vue'
export default {
  data () {
    return {
      images: [],
      server: 'http://localhost:5000/',
      user: []
    }
  },
  created: async function() {
    var user = await getOtherUser(this.$route.params.login)
    this.user = user
    this.addImages()
  },
  methods: {
    addImages: function() {
      if (this.user.mainFoto)
        this.images[0] = this.server + this.user.mainFoto
      if (this.user.foto1)
        this.images[1] = this.server + this.user.foto1
      if (this.user.foto2)
        this.images[2] = this.server + this.user.foto2
      if (this.user.foto3)
        this.images[3] = this.server + this.user.foto3
      if (this.user.foto4)
        this.images[4] = this.server + this.user.foto4
    }
  }
}
</script>

<style scoped>
.basic {
  margin-top: 15px;
  padding: 20px;
  width: 100%;
  background-color:beige;
  text-align: left;
}
</style>