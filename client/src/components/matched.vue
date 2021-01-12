<template>
  <v-card xs6 offset-xs3 class="mt-5">
    <v-toolbar
      flat dense class="pink darken-2" dark
    >
      <v-toolbar-title>Matched / Liked</v-toolbar-title>
    </v-toolbar>
    <v-tabs horizontal right >
      <v-tab >
        <v-icon left>
          mdi-thumb-up
        </v-icon>
        liked
      </v-tab>
      <v-tab>
        <v-icon left>
          mdi-eye
        </v-icon>
        seen
      </v-tab>

      <v-tab-item>

    <v-layout class="pb-10">
      <v-flex xs6 offset-xs3 class="m-10" >
        <v-card
          class="mx-auto m-2"
          outlined
          max-width="800"
          
        >
          <v-list-item v-for="(user, index) in liked" :key="index">
            <v-list-item-content>
        
              <v-list-item-title class="headline mb-1 ">
              </v-list-item-title>
              <v-list-item-title >{{user.firstName}} {{user.lastName}}</v-list-item-title>
              <v-list-item-subtitle ><i>{{moment(user.action_date).fromNow()}}</i></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              size="100"
              color="grey"
            >
            <v-img :src="'http://localhost:5000/'+ user.mainFoto"></v-img>
            </v-list-item-avatar>
          <v-card-actions>
                <v-btn
                  outlined
                  rounded
                  text
                  :to="'users/'+ user.login"
                >
                  View 
                </v-btn>
              </v-card-actions>
              </v-list-item>
        </v-card>

        </v-flex>
      </v-layout>
      </v-tab-item>



      <v-tab-item>
        <v-layout>
          <v-flex xs6 offset-xs3 class="pb-10">
             <v-card
              class="mx-auto m-2"
              outlined
              max-width="800" 
              >
              <v-list-item v-for="(user, index) in seen" :key="index">
            <v-list-item-content>
        
              <v-list-item-title class="headline mb-1 ">
              </v-list-item-title>
              <v-list-item-title >{{user.firstName}} {{user.lastName}}</v-list-item-title>
              <v-list-item-subtitle ><i>{{moment(user.action_date).fromNow()}}</i></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              size="100"
              color="grey"
            >
            <v-img :src="'http://localhost:5000/'+ user.mainFoto"></v-img>
            </v-list-item-avatar>
          

              <v-card-actions>
                <v-btn
                  outlined
                  rounded
                  text
                  :to="'users/'+ user.login"
                >
                  View 
                </v-btn>
              </v-card-actions>
              </v-list-item>
            </v-card>
          </v-flex>
        </v-layout>
      </v-tab-item>
     
    </v-tabs>
  </v-card>
</template>

<script>
import Authent from '@/services/AuthService'
import { getUserInfo } from '@/policies/auth'

export default {
  data () {
    return {
      liked: [],
      seen: []
    }
  },
  mounted: async function() {
    try {
      var user = getUserInfo()
      var response = await Authent.getSeenLiked(user.id)
      this.liked = response.data.liked
      this.seen = response.data.seen
    }
    catch (err) {
      console.log(err || err.message)
    }
  },
  methods: {
    
  }
}

</script>

<style scoped>
</style>

