<template v-if='router-view'>
  <v-carousel
    cycle
    height="600"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
     v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
        </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    data () {
      return {
        items: [
         {
            src: 'https://www.bloomingyou.fr/wp-content/uploads/2017/05/communication-amoureuse-les-secrets-des-couples-qui-durent-1-885x530.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
      }
    },
  }
</script>