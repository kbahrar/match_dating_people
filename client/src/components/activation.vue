<template>
  <v-layout>
    <v-flex xs6 offset-xs3 class="mt-5">
      <div class="grey lighten-3 elevation-2">
          <h1>{{msg}}</h1>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'

export default {
  data () {
    return {
     msg: ''
    }
  },
  mounted: async function() {
    try {
      var check = await Authent.activer({tok: this.$route.params.token})
      this.msg = check.data.msg
    }
    catch (err) {
      this.msg = 'invalide validation account !'
    }
  },
  methods: {
  }
}
</script>

<style scoped>
</style>