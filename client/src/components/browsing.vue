<template >
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4">

        <v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
          <v-toolbar-title>Your list maybe you like them !</v-toolbar-title>
        </v-toolbar>

        <v-row align="center" class="ml-auto mt-5">
          <v-col cols="12">
            <v-select
            :items="sortList"
            :menu-props="{ top: true, offsetY: true }"
            label="Sort by"
            v-model="sort"
              ></v-select>
              </v-col>
        </v-row>

        <v-card
            v-for="user in this.users"
            :key="user.login"
            :loading="loading"
            class="mx-auto my-12"
            width="70%"
        >
            <!-- <v-hover v-slot="{ hover }"> -->
            <v-img
            :src="user.mainfoto"
            >
            <v-btn :to="'/users/' + user.login" elevation="20" fab absolute left class="mt-5" height="20%" width="20%">
                <v-icon>mdi-eye</v-icon>
            </v-btn>
            </v-img>

            <v-card-title>{{user.firstName}} {{user.lastName}}</v-card-title>

            <v-card-subtitle align='left'>{{user.age}} Years Old<div align='right'><b>{{user.distance}} Km Away</b></div></v-card-subtitle>

            <v-card-text>
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

            <div class="my-4 subtitle-2">
                Bio
            </div>

            <div>{{user.bio}}</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Tags</v-card-title>

            <v-card-text>
                <v-chip-group
                    column
                >
                    <v-chip v-for="tag in user.tags" :key="tag.tag">#{{tag.tag}}</v-chip>
                </v-chip-group>
            </v-card-text>

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
                @click="like(user.login, 1)"
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
import { getList } from '@/utils/utils'
import { likeIt } from '@/utils/utils'
import { checkLike } from '@/utils/utils'
import vue from 'Vue'

export default {
  data () {
    return {
        loading: false,
        selection: 1,
        defFoto: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg',
        server: "http://localhost:5000/",
        users: [],
        sortList: ["age", "location", "fame", "tags"],
        sort: "location"
    }
  },
  mounted: async function() {
      try {
        var users = await getList()
        for (let i = 0; i < users.length; i++) {
          if (!users[i].mainfoto)
            users[i].mainfoto = this.defFoto
          else if (!users[i].mainfoto.includes("http"))
            users[i].mainfoto = this.server + users[i].mainfoto
          var check = await checkLike(users[i].login)
          users[i].check = check
        }
        this.users = users
      }
      catch (err) {
        if (err.response.status === 401)
        {
          logoutUser()
          this.$router.go('login')
        }
      }
  },
  watch: {
    sort: function (val) {
      if (val == "age")
        return this.users.sort(this.compareAge)
      if (val == "location")
        return this.users.sort(this.compareDistance)
      if (val == "fame")
        return this.users.sort(this.compareFame)
    }
  },
  methods: {
    async like (login, flag, i) {
        this.loading = true
        // console.log(login)
        await likeIt(login, flag, i)
        await this.ifliked(login)
        this.loading = false
    },
    async ifliked (login) {
          var check = await checkLike(login)
          // console.log(check)
          for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].login === login)
              this.users[i].check = check
          }
    },
    compareAge (a, b) {
      if (a.age < b.age)
        return -1
      else if (a.age > b.age)
        return 1
      return 0
    },
    compareDistance (a, b) {
      if (a.distance < b.distance)
        return -1
      else if (a.distance > b.distance)
        return 1
      return 0
    },
    compareFame (a, b) {
      if (a.fame < b.fame)
        return 1
      else if (a.fame > b.fame)
        return -1
      return 0
    },
    compareTags (a, b) {
      if (a.age < b.age)
        return -1
      else if (a.age > b.age)
        return 1
      return 0
    },
  }
}
</script>

<style scoped>
</style>