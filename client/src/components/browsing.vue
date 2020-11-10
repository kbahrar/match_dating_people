<template >
  <v-layout>
    <v-flex xs10 offset-xs1>
      <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4">

        <v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
          <v-toolbar-title>Your list maybe you like them !</v-toolbar-title>
        </v-toolbar>

        <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="374"
        >
            <!-- <template slot="progress">
            <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
            ></v-progress-linear>
            </template> -->

            <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title>FirstName + LastName</v-card-title>

            <v-card-subtitle>150 Km Away</v-card-subtitle>

            <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <v-rating
                :value="4"
                color="amber"
                dense
                half-increments
                readonly
                size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                4.5 Fame rating
                </div>
            </v-row>

            <div class="my-4 subtitle-2">
                Bio
            </div>

            <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-title>Tags</v-card-title>

            <v-card-text>
                <v-chip-group
                    column
                >
                    <v-chip>#php</v-chip>

                    <v-chip>#weed</v-chip>

                    <v-chip>#Pes</v-chip>

                    <v-chip>#draw</v-chip>
                </v-chip-group>
            </v-card-text>

            <v-card-actions>
            <v-btn
                color="blue lighten-2"
                text
                @click="reserve"
            >
                Like
                <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
            <v-btn
                class="ma-2"
                text
                color="red lighten-2"
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
import { getUserInfo } from '@/policies/auth'
import { getList } from '@/utils/utils'
import vue from 'Vue'

export default {
  data () {
    return {
        loading: false,
        selection: 1,
    }
  },
  mounted: async function() {
      try {
        await getList()
      }
      catch (err) {
        
      }
  },
  methods: {
    reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
    },
  }
}
</script>

<style scoped>
</style>