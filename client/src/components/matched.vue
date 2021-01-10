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
      

       <!---<div :class="user.class" v-for="user in this.matched"
			:key="user.idd" @click="getCvr(user.idd)">
      <h5>{{user.firstName}} {{user.lastName}}</h5>
        </div> --->
                <v-card
    class="mx-auto m-2"
    outlined
    max-width="800"
    
  >
    <v-list-item >
      <v-list-item-content>
        
        <v-list-item-title class="headline mb-1 ">
        </v-list-item-title>
        <v-list-item-title >{{this.matched.firstName}} {{this.matched.lastName}}</v-list-item-title>
        <v-list-item-subtitle >{{this.matched.login}}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        size="100"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Button 
      </v-btn>
    </v-card-actions>
  </v-card>

    </v-flex>
  </v-layout>
      </v-tab-item>
      <v-tab-item>
        <v-layout>
    <v-flex xs6 offset-xs3>
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          
        
        
          
        </div>
    </v-flex>
  </v-layout>
      </v-tab-item>
     
    </v-tabs>
  </v-card>
</template>

<script>
import {getMatched} from "../utils/utils"
import vue from 'vue';


export default {
  data () {
    return {   
    matched: "",
    }
  },
    mounted: async function() {
	try {
	  var users = await getMatched()
      console.log("am here brother\n" + JSON.stringify(users));
	  for (let i = 0; i < users.length; i++) {
			users[i].idd = i
	  }
    this.matched = users[0];
	}
	catch (err) {
	  
	}
  },
  methods: { 
         
    },
}
</script>

<style scoped>
</style>

