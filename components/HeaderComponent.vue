<template lang="pug">
  div.header
    div.logo
      h1 MyJobs.io
    el-row.searchs(:gutter="20")
      el-col(:span='8' :offset="8")
          el-row(:gutter="10")
            el-col(:span="12")
              el-input(placeholder="Paris, New York..." v-model="query.posField")
                i(slot="suffix" class="el-input__icon el-icon-place")
                el-button.geoloc(slot="append" icon="el-icon-location-outline" @click="geoloc")
            el-col(:span="12")
              el-input(placeholder="Python, Javascript..." v-model="query.langField")
                i(slot="suffix" class="el-input__icon el-icon-setting")
    el-row.searchRow(:gutter="20")
      el-col(:span="8" :offset="8")
        el-button(style="width: 100%;" type='primary' icon='el-icon-search' @click="search") Search some jobs
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      query: {
        lat: "",
        long: "",
        posField: "",
        langField: ""
      }
    }
  },
  methods: {
    ...mapActions(["searchJobs"]),
    search() {
      if (this.$route.params.jobId) {
        this.$router.go(-1);
      }
      this.searchJobs(this.query);
    },
    geoloc() {
      if ("geolocation" in navigator) {
        try {
          navigator.geolocation.getCurrentPosition(p => {
            this.query.lat = p.coords.latitude;
            this.query.long = p.coords.longitude;
            this.query.posField = 'Position actuelle';
          });
          this.searchJobs(this.query);
        } catch (error) {
          // Replace with Elementui popups or alert methods
          console.log("You can't access geolocation on your computer, check your settings.")
          console.log(error)
        }
        // DO SOMETHING WITH LAT & LONG
      } else {
        // Replace with Elementui popups or alert methods
        console.log("You can't access geolocation on your computer, check your settings.")
      }
    }
  }
}
</script>
<style>
  .header {
    background-image: linear-gradient(to bottom, rgba(142, 217, 252, 0.52), rgba(212, 109, 49, 0.73)), url('~assets/img/header.jpg');
    height: 400px;
    background-position: 55% 55%;
    padding: 50px;
  }

  .logo {
    color: #fff;
  }

  .searchs{
    padding-top: 300px;
  }
  .searchRow {
    padding-top: 15px;
  }

  .geoloc:hover {
    color: rgb(70, 70, 70) !important;
  }
</style>