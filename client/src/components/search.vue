<template >
  <v-layout>
    <v-flex xs10 offset-xs1 class="mt-10">
      <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4">

        <v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
          <v-toolbar-title><v-icon left>fas fa-search-plus</v-icon>SEARCH</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            @click="active = !active"
          >
            Toggle
          </v-btn>
        </v-toolbar>
        <v-expand-transition>
        <v-form
          class="mt-4"
          ref="form"
          lazy-validation
          v-show="active"
        >
          <v-row class="mx-5">
            <v-col
              cols="6"
              md="4"
            >
              <v-card
                class="mx-auto my-4"
              >
                <v-toolbar
                  flat
                  dense
                >
                  <v-toolbar-title>
                    AGE
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    v-model="ifage"
                    hide-details
                    class="shrink mr-2 mt-0"
                  ></v-checkbox>
                  </v-toolbar>
                  <v-card-text>
                  <v-slider
                    v-model="age.max"
                    max="100"
                    :min="age.min"
                    label="max age"
                    step="1"
                    thumb-label="always"
                    :disabled="!ifage"
                  ></v-slider>

                  <v-slider
                    v-model="age.min"
                    :max="age.max"
                    min="0"
                    step="1"
                    label="min age"
                    thumb-label="always"
                    :disabled="!ifage"
                  ></v-slider>
                  </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="6"
              md="4"
            >
              <v-card
                class="mx-auto my-4"
              >
                <v-toolbar
                  flat
                  dense
                >
                  <v-toolbar-title>
                    FAME
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    v-model="iffame"
                    hide-details
                    class="shrink mr-2 mt-0"
                  ></v-checkbox>
                  </v-toolbar>
                  <v-card-text>
                  <v-slider
                    v-model="fame.max"
                    max="5000"
                    :min="fame.min"
                    label="max fame"
                    step="1"
                    thumb-label="always"
                    :disabled="!iffame"
                  ></v-slider>

                  <v-slider
                    v-model="fame.min"
                    :max="fame.max"
                    min="0"
                    step="1"
                    label="min fame"
                    thumb-label="always"
                    :disabled="!iffame"
                  ></v-slider>
                  </v-card-text>
              </v-card>
            </v-col>
            <v-col
            cols="6"
              md="4">
              <v-card
                class="mx-auto my-4"
              >
                <v-toolbar
                  flat
                  dense
                >
                  <v-toolbar-title>
                    TAGS
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    v-model="iftags"
                    hide-details
                    class="shrink mr-2 mt-0"
                  ></v-checkbox>
                  </v-toolbar>
                  <v-card-text>
                    <v-combobox
                      v-model="chips"
                      :disabled="!iftags"
                      :items="items"
                      chips
                      clearable
                      label="at least 1 tag so people can know your interests"
                      multiple
                      prepend-icon="mdi-filter-variant"
                      solo
                    >
                      <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="remove(item)"
                        >
                          <strong>{{ item }}</strong>
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-card-text>
              </v-card>
            </v-col>
            <v-col
              cols="6"
              md="4">
              <v-card
                class="mx-auto my-4"
              >
                <v-toolbar
                  flat
                  dense
                >
                  <v-toolbar-title>
                    LOCATION
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-checkbox
                    v-model="ifloc"
                    hide-details
                    class="shrink mr-2 mt-0"
                  ></v-checkbox>
                  </v-toolbar>
                  <v-card-text>
                    <v-text-field
                      v-model="city"
                      :rules="[v => !!v || 'City is required']"
                      :disabled="!ifloc"
                      label="City"
                      required
                    ></v-text-field>
                  </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          
          <v-alert
            type="error"
            v-if="errors.length"
            v-model="alert"
            border="left"
            close-text="Close Alert"
            dismissible>
            <li v-for="err in errors" :key="err">{{ err }}</li>
          </v-alert>

          <v-btn
            color="success"
            class="mr-4"
            @click="check"
          >
            Search
          </v-btn>

        </v-form>
        </v-expand-transition>
      </div>
      <div outlined shaped elevation="20" class="grey lighten-2 elevation-5 p-4" v-if="users">

        <v-toolbar outlined shaped elevation="20" class="pink darken-2" dark>
          <v-toolbar-title>Your search list !</v-toolbar-title>
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

        <v-row align="center" class="ml-auto">
          <v-col cols="12">
            <v-select
            :items="sortList"
            :menu-props="{ top: true, offsetY: true }"
            label="Filter by"
            v-model="filter"
              ></v-select>
          </v-col>
          <v-col cols="12">
            <v-card
                class="mx-auto my-4"
                v-show="tagsFil"
              >
                <v-toolbar
                  flat
                  dense
                >
                  <v-toolbar-title>
                    TAGS
                  </v-toolbar-title>
                  <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-combobox
                      v-model="filters.chips"
                      :items="items"
                      chips
                      clearable
                      label="at least 1 tag for filter"
                      multiple
                      prepend-icon="mdi-filter-variant"
                      solo
                    >
                      <template v-slot:selection="{ attrs, item, select, selected }">
                        <v-chip
                          v-bind="attrs"
                          :input-value="selected"
                          close
                          @click="select"
                          @click:close="remove(item)"
                        >
                          <strong>{{ item }}</strong>
                        </v-chip>
                      </template>
                    </v-combobox>
                  </v-card-text>
              </v-card>
              <v-card
                class="mx-auto my-4"
                v-show="fameFil"
              >
                <v-toolbar
                  flat
                  dense
                >
                  <v-toolbar-title>
                    FAME
                  </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                  <v-slider
                    v-model="filters.fame.max"
                    max="5000"
                    :min="filters.fame.min"
                    label="max fame"
                    step="1"
                    thumb-label="always"
                  ></v-slider>

                  <v-slider
                    v-model="filters.fame.min"
                    :max="filters.fame.max"
                    min="0"
                    step="1"
                    label="min fame"
                    thumb-label="always"
                  ></v-slider>
                  </v-card-text>
              </v-card>
              <v-card
                class="mx-auto my-4"
                v-show="ageFil"
              >
                <v-toolbar
                  flat
                  dense
                >
                  <v-toolbar-title>
                    age
                  </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                  <v-slider
                    v-model="filters.age.max"
                    max="100"
                    :min="filters.age.min"
                    label="max age"
                    step="1"
                    thumb-label="always"
                  ></v-slider>

                  <v-slider
                    v-model="filters.age.min"
                    :max="filters.age.max"
                    min="0"
                    step="1"
                    label="min age"
                    thumb-label="always"
                  ></v-slider>
                  </v-card-text>
              </v-card>
              <v-card
                class="mx-auto my-4"
                v-show="locationFil"
              >
                <v-toolbar
                  flat
                  dense
                >
                  <v-toolbar-title>
                    location
                  </v-toolbar-title>
                  </v-toolbar>
                  <v-card-text>
                  <v-slider
                    v-model="filters.loc.max"
                    max="10000"
                    :min="filters.loc.min"
                    label="max loc"
                    step="1"
                    thumb-label="always"
                  ></v-slider>

                  <v-slider
                    v-model="filters.loc.min"
                    :max="filters.loc.max"
                    min="0"
                    step="1"
                    label="min loc"
                    thumb-label="always"
                  ></v-slider>
                  </v-card-text>
              </v-card>
          </v-col>
        </v-row>
        
        <v-card
            v-for="user in this.users"
            :key="user.login"
            :loading="loading"
            class="mx-auto my-12"
            width="70%"
        >
            <v-img
            :src="user.mainfoto"
            >
            <v-btn :to="'/users/' + user.login" elevation="20" fab absolute left class="mt-5" >
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
import { getUserInfo } from '@/policies/auth'
import { likeIt } from '@/utils/utils'
import { checkLike } from '@/utils/utils'
import vue from 'Vue'
export default {
  data () {
    return {
      alert: true,
      active: true,
      age: {
        max: 100,
        min: 0
      },
      ifage: false,
      fame: {
        max: 5000,
        min: 0
      },
      iffame: false,
      ifloc: false,
      iftags: false,
      city: '',
      chips: [],
      items: ['Streaming', 'Eating','Dancing','Chating','weed','travel','love', 'nature'],
      errors: [],
      users: [],
      sortList: ["age", "location", "fame", "tags"],
      sort: "location",
      loading: false,
      selection: 1,
      defFoto: 'https://image.shutterstock.com/image-vector/male-avatar-profile-picture-use-260nw-193292036.jpg',
      server: "http://localhost:5000/",
      filter: '',
      ageFil: false,
      fameFil: false,
      tagsFil: false,
      locationFil: false,
      userTags: [],
      constUsers: [],
      filters: {
        chips: [],
        fame: {
          min: 0,
          max: 5000
        },
        age: {
          min: 0,
          max: 100
        },
        loc: {
          min: 0,
          max: 10000
        },
      },
      items: ['Streaming', 'Eating','Dancing','Chating','weed','travel','love', 'nature'],
      constUsers: []
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
    },
    filter: function (val) {
      if (val == "age") {
        this.fameFil = this.locationFil = this.tagsFil = false
        this.ageFil = true
      }
      if (val == "location") {
        this.ageFil = this.fameFil = this.tagsFil = false
        this.locationFil = true
      }
      if (val == "fame") {
        this.ageFil = this.locationFil = this.tagsFil = false
        this.fameFil = true
      }
      if (val == "tags") {
        this.ageFil = this.fameFil = this.locationFil = false
        this.tagsFil = true
      }
    },
    tags (val) {
      this.users = new Object(this.constUsers)
      if (val.length > 0)
        this.users = this.users.filter(this.filterTags)
    },
    famee (val) {
      this.users = new Object(this.constUsers)
      this.users = this.users.filter(this.filterFame)
    },
    agee (val) {
      this.users = new Object(this.constUsers)
      this.users = this.users.filter(this.filterAge)
    },
    loc (val) {
      this.users = new Object(this.constUsers)
      this.users = this.users.filter(this.filterLoc)
    }
  },
  computed: {
    tags() {
      return this.filters.chips
    },
    famee() {
      return `${this.filters.fame.max} ${this.filters.fame.min}`
    },
    agee() {
      return `${this.filters.age.max} ${this.filters.age.min}`
    },
    loc() {
      return `${this.filters.loc.max} ${this.filters.loc.min}`
    },
  },
  methods: {
    remove (item) {
        this.chips.splice(this.chips.indexOf(item), 1)
        this.chips = [...this.chips]
    },
    check () {
      this.errors = []
      this.alert = true
      this.users = []
      if (this.ifloc) {
        this.$refs.form.validate()
        if (this.city.length <= 0)
          this.errors.push('City required !')
      }
      if (this.iftags  && (!this.chips || this.chips.length < 1)) {
        this.errors.push("at least 1 tag required !.");
      }
      if (!this.iffame && !this.ifloc && !this.iftags && !this.ifage)
        this.errors.push("Choose one or more criterias !")
      if (this.errors.length == 0) {
        this.search()
        this.active = !this.active
      }
    },
    search: async function() {
      try {
          var user = getUserInfo()
          var search = new Object()
          if (this.ifage)
            search.age = this.age
          if (this.iffame)
            search.fame = this.fame
          if (this.ifloc)
            search.city = this.city
          if (this.iftags)
            search.tags = this.chips
          var users = await Authent.search({search: search,
          info: user
          })
          users = users.data.users
          for (let i = 0; i < users.length; i++) {
            if (!users[i].mainfoto)
              users[i].mainfoto = this.defFoto
            else if (!users[i].mainfoto.includes("http"))
              users[i].mainfoto = this.server + users[i].mainfoto
            var check = await checkLike(users[i].login)
            users[i].check = check
          }
          this.users = users
          this.constUsers = new Object(users)
          this.userTags = this.$store.state.user.tags
      }
      catch (err) {
       if (err.response.status === 401)
        {
          logoutUser()
          this.$router.go('login')
        }
      }
    },
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
      if (this.countMatchedTags(a.tags, this.userTags) < this.countMatchedTags(b.tags, this.userTags))
        return -1
      else if (this.countMatchedTags(a.tags, this.userTags) > this.countMatchedTags(b.tags, this.userTags))
        return 1
      return 0
    },
    filterTags (Obj) {
      return this.countMatchedTags(this.filters.chips, Obj.tags) != 0
    },
    filterFame (Obj) {
      return Obj.fame >= this.filters.fame.min && Obj.fame <= this.filters.fame.max
    },
    filterAge (Obj) {
      return Obj.age >= this.filters.age.min && Obj.age <= this.filters.age.max
    },
    filterLoc (Obj) {
      return Obj.distance >= this.filters.loc.min && Obj.distance <= this.filters.loc.max
    },
    countMatchedTags (tags, tuser) {
      var count = 0
      for (let i = 0; i < tuser.length; i++) {
        for (let j = 0; j < tags.length; j++) {
          if (tuser[i].tag == tags[j]) {
            count++
            break ;
          }
        }
      }
      return count
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