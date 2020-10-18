<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <div class="grey lighten-3 elevation-5">

        <v-toolbar flat dense class="pink darken-2" dark>
          <v-toolbar-title>Fill profile to continue</v-toolbar-title>
        </v-toolbar>
        <div class="m-5 pl-5 pr-4 pt-2 pb-2" dark>
          
         <v-row align="center">
           <v-col cols="12">
             <v-select
             :gender="gender"
             :menu-props="{ top: true, offsetY: true }"
             label="Chose your gender"
             v-model="gender"
             :rules="[v => !!v || 'gender required']"
             ></v-select>
             </v-col>
             </v-row>

         <v-row align="center">
           <v-col cols="12">
             <v-select
             :preferences="preferences"
             :menu-props="{ top: true, offsetY: true }"
             label="Looking for ?"
            v-model="preferences"
            :rules="[v => !!v || 'preferences required']"
             ></v-select>
             </v-col>
             </v-row>
          
      <v-textarea
          name="Biography"
          label="Biography"
          hint="Hint text"
          v-model="biography"
          :rules="[v => !!v || 'biography required at least 100 word', v=> /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/.test(v) || 'invalide biography.']"
        ></v-textarea>

 <v-combobox
    v-model="tags"
    :tagItems="tagItems"
    :rules="[v => !!v || 'at least 1 tag required', v=> /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/.test(v) || 'invalide tags.']"
    tags
    clearable
    label="Your favorite hobbies"
    multiple
    prepend-icon="mdi-filter-variant"
    solo
  >
    <template v-slot:selection="{ attrs, tagItem, select, selected }">
      <v-chip
        v-bind="attrs"
        :input-value="selected"
        close
        @click="select"
        @click:close="remove(tagItem)"
      >
        <strong>{{ tagItem }}</strong>&nbsp;
        <span>(interest)</span>
      </v-chip>
    </template>
  </v-combobox>

          <v-alert
            type="error"
            v-if="error"
            v-model="alert"
            border="left"
            close-text="Close Alert"
            dismissible>
            {{error}}
          </v-alert>
          <v-alert
            type="error"
            v-if="errors.length"
            v-model="alert"
            border="left"
            close-text="Close Alert"
            dismissible>
            <li v-for="err in errors" :key="err">{{ err }}</li>
          </v-alert>
          <v-alert type="success" v-if="reg">
            {{reg}}
          </v-alert>
          <v-btn @click="checkForm($event)" class="pink darken-2 mb-5"  dark>Confirm profile</v-btn>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  data () {
    return {
      tags: ['Programming', 'Playing video games', 'Watching movies', 'Sleeping'],
      tagItems: ['Streaming', 'Eating'],
      gender: ['Male', 'Female', 'Other'],
      preferences: ['Male', 'Female', 'Other'],
      alert: true,
      flag: true,
      biography: '',
      reg: null,
      error: null,
      errors: []
    }
  },
  methods: {
    remove (tagItem) {
        this.tags.splice(this.tags.indexOf(tagItem), 1)
        this.tags = [...this.tags]
      },
    fillProfile: async function() {
      try {
        this.error = null
        this.reg = 'profile succesfully created !'
        await Authent.fillProfile({
          gender: this.gender,
          preferences: this.preferences,
          biography: this.biography
        })
      } catch (err) {
        this.reg = null
        this.error = err.response.data.error || 'No response from server'
        this.alert = true
      }
    },
    checkForm: function (e) {
      this.errors = [];

      if (!this.gender) {
        this.errors.push("gender type required.");
      }
      if (!this.preferences) {
        this.errors.push("Targeted gender required.");
      }
      if (!this.tags) {
        this.errors.push("at least 1 tag required !.");
      }
      if (!this.biography) {
        this.errors.push("Biography required.");
      }
      if (!this.errors.length) {
        this.fillProfile();
      }
      else
        e.preventDefault();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
