<template>
  <div id="app">
    <v-app class="pink lighten-4">
      <main>
        <AppHeader/>
        <v-content fluid>
          <router-view/>
       <!-- <AppSlider/> -->
        </v-content>

      </main>
    </v-app>
        <AppFooter/>
  </div>
</template>

<script>
import AppHeader from '@/components/Header.vue'
import AppSlider from '@/components/Slider.vue'
import AppFooter from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    AppHeader,
    AppSlider,
    AppFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('./assets\wallpaper.jpg');
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
