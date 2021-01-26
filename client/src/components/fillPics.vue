<template >
  <v-layout>
    <v-flex xs10 offset-xs1 class="mt-6">
      <div class="grey lighten-3 elevation-5">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>add pictures to continue</v-toolbar-title>
        </v-toolbar>
        <div class="m-5 pl-5 pr-4 pt-2 pb-2">
            <v-row>
                <v-col
                v-for="n in 5"
                :key="n"
                class="d-flex child-flex"
                cols="4"
                >
                    <v-img
                        :id="`i`+n"
                        :src="image[n]"
                        lazy-src="https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg"
                        aspect-ratio="1"
                        class="grey lighten-2"
                    >
                        <v-btn v-if="!ifExist(n)" @click="onPickFile(n)" :id="`b` + n" elevation="20" fab color="pink" absolute left class="mt-5" height="20%" width="20%">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <v-btn
                          v-if="ifExist(n)"
                          @click="onDeleteImg(n)"
                          fab
                          left
                          absolute
                          class="mt-5" height="20%" width="20%"
                          color="pink"
                        >
                          <v-icon>
                            mdi-delete
                          </v-icon>
                        </v-btn>
                        <input :id="`f` + n" type="file" style="display: none" accept="image/*" @change="onFilePicked($event, n)">
                    </v-img>
                </v-col>
            </v-row>
              <v-alert
                type="error"
                v-if="error"
                v-model="alert"
                border="left"
                close-text="Close Alert"
                dismissible>
                {{error}}
              </v-alert>
              <v-alert type="success" v-if="reg">
                {{reg}}
              </v-alert>
            <v-btn class="pink darken-2 mb-5"  dark @click="savePics">Save Pictures<v-icon dark right>mdi-checkbox-marked-circle</v-icon></v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import Authent from '@/services/AuthService'
import { getUserInfo } from '@/policies/auth'
import { getUser } from '@/utils/utils'
import vue from 'Vue'

export default {
  data () {
    return {
        defaultPic: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg',
        image: [
          'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg',
          'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg',
          'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg',
          'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg',
          'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg',
          'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg'
        ],
        images: [
          null,
          null,
          null,
          null,
          null
        ],
        server: "http://localhost:5000/",
        alert: true,
        error: null,
        reg: null
    }
  },
  mounted: async function() {
    await this.domPictures()
  },
  methods: {
    domPictures: async function () {
      var user = await getUser()
      for (let i = 0; i < this.images.length; i++) {
        vue.set(this.image, i + 1, this.defaultPic)
        vue.set(this.images, i, 0)
      }
      if (user.mainFoto) {
        vue.set(this.image, 1, this.server + user.mainFoto)
        this.images[0] = this.server + user.mainFoto
      }
      if (user.foto1) {
        this.image[2] = this.server + user.foto1
        this.images[1] = this.server + user.foto1
      }
      if (user.foto2) {
        this.image[3] = this.server + user.foto2
        this.images[2] = this.server + user.foto2
      }
      if (user.foto3) {
        this.image[4] = this.server + user.foto3
        this.images[3] = this.server + user.foto3
      }
      if (user.foto4) {
        this.image[5] = this.server + user.foto4
        this.images[4] = this.server + user.foto4
      }
    },
    onPickFile: function (n) {
        let id = "f" + n
        document.getElementById(id).click()
    },
    onFilePicked: function (event, n) {
        const fileReader = new FileReader()
        const files = event.target.files || event.dataTransfer.files
        var URL = window.URL || window.webkitURL
        if (files[0]) {
            var image = new Image()
            image.onload = function() {
                if (this.width) {
                    fileReader.readAsDataURL(files[0])
                }
            };
            image.src = URL.createObjectURL(files[0]);
        }
        fileReader.addEventListener('load', () => {
          vue.set(this.image, n, fileReader.result)
          vue.set(this.images, (n - 1), fileReader.result)
        }, false)
    },
    savePics: async function () {
      try {
        var user = getUserInfo()
        var j = false
        for (let i = 0; i < 5; i++) {
          if (this.images[i] != 0)
            j = true
        }
        if (!j) throw 'no image selected !'
        const response = await Authent.putImages({
          image: this.images,
          info: {id: user.id}
        })
        this.reg = "Pictures saved with success !"
        await this.domPictures()
        this.$router.push("/")
      }
      catch (err) {
        this.reg = null
        this.error = err || 'something went wrong'
        this.alert = true
        if (err.response && err.response.status === 401)
        {
          logoutUser()
          // this.$router.go('login')
        }
      }
    },
    ifExist: function(n) {
      if (this.image[n] === this.defaultPic)
        return false
      else
        return true
    },
    onDeleteImg: function(n) {
      vue.set(this.image, n, this.defaultPic)
      vue.set(this.images, (n - 1), 0)
      let id = "f" + n
      document.getElementById(id).value = ''
    }
  }
}
</script>

<style scoped>
</style>