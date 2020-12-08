<template >
  <v-layout>
    <v-flex xs10 offset-xs1>
      <error404 v-if="!user"/>
      <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4" v-else>

        <v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
          <v-toolbar-title>{{user.firstName}} Profile</v-toolbar-title>
        </v-toolbar>
        <v-card
            class="mx-auto my-12"
            width="70%"
        >
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
            <!-- <v-hover v-slot="{ hover }"> -->
            <v-card-subtitle v-if="connect">Online <v-icon color="green" x-small right>fas fa-circle</v-icon> </v-card-subtitle>
            <v-card-subtitle v-else> <v-icon color="red" x-small left>fas fa-circle</v-icon>Offline {{moment(lastSeen).fromNow()}} </v-card-subtitle>
            
            <v-card-title>Full Name :  {{user.firstName}} {{user.lastName}}</v-card-title>

            <v-card-subtitle align='left'>{{user.age}} Years Old<div align='right'><v-icon left>fas fa-map-marker-alt</v-icon><b> {{user.city}}</b></div></v-card-subtitle>

            <!-- <v-row
                align="center"
                class="mx-0"
            > -->
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
            <!-- </v-row> -->
            <v-divider class="mx-4"></v-divider>

            <v-card-text>

            <div class="my-4 subtitle-2">
                Bio
            </div>

            <div>{{user.bio}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Tags :</v-card-title>

            <v-card-text>
                <v-chip-group
                    column
                >
                    <v-chip v-for="tag in user.tags" :key="tag.tag">#{{tag.tag}}</v-chip>
                </v-chip-group>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>
              <v-card-title>More Informations :</v-card-title>
              <v-list dense>
                <v-list-item>
                  <v-list-item-content>Gender :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ user.gender }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>looking for :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ user.lookingfor }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>login :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{ user.login }}
                  </v-list-item-content>
                </v-list-item>

                <v-list-item>
                  <v-list-item-content>Joined Matcha :</v-list-item-content>
                  <v-list-item-content class="align-end">
                    {{moment(user.registrationDate).fromNow()}}
                  </v-list-item-content>
                </v-list-item>
              </v-list>

              <v-divider class="mx-4"></v-divider>


            <v-card-actions>
            <v-btn
                color="blue lighten-2"
                text
                @click="like(user.login, 0, user.id)"
                v-if="user.check"
            >
                Like
                <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn
                class="ma-2"
                text
                color="red lighten-2"
                @click="like(user.login, 1, user.id)"
                v-if="!user.check"
            >
                UnLike
                <v-icon>mdi-thumb-down</v-icon>
            </v-btn>
            </v-card-actions>
        </v-card>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'
import {logoutUser} from '@/policies/auth'
import { getOtherUser } from '@/utils/utils'
import { seenIt } from '@/utils/utils'
import { likeIt } from '@/utils/utils'
import { checkLike } from '@/utils/utils'
import error404 from '@/components/error404.vue'
import vue from 'Vue'
export default {
  data () {
    return {
      connect: false,
      lastSeen: false,
      images: [],
      server: 'http://localhost:5000/',
      user: []
    }
  },
  sockets: {
    online: async function (data) {
        // console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
        await this.getUpdate()
    }
  },
  components:{
    error404
  },
  mounted: async function() {
    var user = await getOtherUser(this.$route.params.login)
    this.user = user
    this.connect = user.online
    this.lastSeen = user.connect
    if (user)
      seenIt(user.login, user.id)
    this.addImages()
  },
  methods: {
    addImages: function() {
      if (this.user.mainFoto) {
        if (!this.user.mainFoto.includes("http"))
          this.images[0] = this.server + this.user.mainFoto
        else
          this.images[0] = this.user.mainFoto
      }
      if (this.user.foto1)
        this.images[1] = this.server + this.user.foto1
      if (this.user.foto2)
        this.images[2] = this.server + this.user.foto2
      if (this.user.foto3)
        this.images[3] = this.server + this.user.foto3
      if (this.user.foto4)
        this.images[4] = this.server + this.user.foto4
    },
    getUpdate: async function() {
      var user = await getOtherUser(this.$route.params.login)
      this.connect = user.online
      this.lastSeen = user.connect
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