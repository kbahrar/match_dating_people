<template >
  <v-layout>
    <v-flex xs10 offset-xs1 class="mt-10">
      <error404 v-if="user.length == 0"/>
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
                    <v-img :src="image" height="100%"  width="100%"></v-img>
                </v-row>
            </v-carousel-item>
          </v-carousel>
            <!-- <v-hover v-slot="{ hover }"> -->
            <v-card-subtitle v-if="connect">Online <v-icon color="green" x-small right>fas fa-circle</v-icon> </v-card-subtitle>
            <v-card-subtitle v-else> <v-icon color="red" x-small left>fas fa-circle</v-icon>Offline ( {{moment(lastSeen).format('DD/MM/YYYY HH:mm')}} ) </v-card-subtitle>
            
            <v-card-title>{{user.firstName}} {{user.lastName}}</v-card-title>

            <v-card-subtitle align='left'>{{user.age}} Years Old<div align='right'><v-icon left>fas fa-map-marker-alt</v-icon><b> {{user.city}}</b></div></v-card-subtitle>

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
                    <v-chip v-for="(tag, index) in user.tags" :key="index">#{{tag.tag}}</v-chip>
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


            <v-card-actions  v-if="login != user.login">
            <v-btn
                 class="ma-2"
                color="blue lighten-2"
                text
                @click="like(user.login, 0, user.id)"
                v-if="user.check"
            >
                Like
                <v-icon right>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn
                class="ma-2"
                text
                color="red lighten-2"
                @click="like(user.login, 1, user.id)"
                v-if="!user.check"
            >
                UnLike
                <v-icon right>mdi-thumb-down</v-icon>
            </v-btn>
            <v-dialog
              v-model="dialog"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ma-2"
                  text
                  color="red"
                  v-bind="attrs"
                  v-on="on"
                >
                    BLOCK
                    <v-icon right>fas fa-minus-circle</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  DANGER ACTION !
                </v-card-title>
                <v-card-text>Are you sure you wanna block this user ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialog = false"
                  >
                    No
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="blockIt(user.login), dialog1 = false"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="dialog1"
              persistent
              max-width="290"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="ma-2"
                  text
                  color="yellow darken-3"
                  v-bind="attrs"
                  v-on="on"
                  v-if="!user.checkR"
                >
                    REPORT FAKE USER
                    <v-icon right>fas fa-exclamation-triangle</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">
                  DANGER ACTION !
                </v-card-title>
                <v-card-text>Are you sure you wanna report this user ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green darken-1"
                    text
                    @click="dialog1 = false"
                  >
                    No
                  </v-btn>
                  <v-btn
                    color="red darken-1"
                    text
                    @click="reportIt(user.login), dialog1 = false"
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
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
import { getUserInfo } from '@/policies/auth'
import { seenIt } from '@/utils/utils'
import { likeIt } from '@/utils/utils'
import { checkLike } from '@/utils/utils'
import { report } from '@/utils/utils'
import { block } from '@/utils/utils'
import { checkreport } from '@/utils/utils'
import error404 from '@/components/error404.vue'
import vue from 'Vue'
export default {
  data () {
    return {
      connect: false,
      lastSeen: false,
      images: [],
      server: 'http://localhost:5000/',
      user: [],
      dialog: false,
      dialog1: false,
      login: ''
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
    try {
      var info = getUserInfo()
      this.login = info.login
      var user = await getOtherUser(this.$route.params.login)
      this.connect = user.online
      this.lastSeen = user.connect
      var check = await checkLike(user.login)
      user.check = check
      user.checkR = !await checkreport(user.login)
      console.log(user.checkR)
      this.user = user
      if (user && user.login != this.login)
        seenIt(user.login, user.id)
      this.addImages()
    }
    catch (err) {
      
    }
  },
  methods: {
    async reportIt (login) {
      try {
        await report(login)
        this.$router.push('/')
      }
      catch (err) {
      
      }
    },
    async blockIt (login) {
      try {
        await block(login)
        this.$router.push('/')
      }
      catch (err) {
      
      }
    },
    async like (login, flag, i) {
        this.loading = true
        await likeIt(login, flag, i)
        await this.ifliked(login)
        this.loading = false
    },
    async ifliked (login) {
      var check = await checkLike(login)
      this.user.check = check
    },
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
      try {
        var user = await getOtherUser(this.$route.params.login)
        this.connect = user.online
        this.lastSeen = user.connect
      }
      catch (err) {

      }
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