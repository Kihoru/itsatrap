<template lang="pug">
  div.header
    div.logo
      h1
        NuxtLink(to="/") MyJobs.io
    el-row.searchs(:gutter="20")
      el-col(:span='8' :offset="8")
          el-row(:gutter="10")
            el-col(:span="12")
              el-autocomplete.inline-input(
                v-model="query.posField"
                :fetch-suggestions='autocompleteInputsLocation'
                placeholder="Paris, New York..."
                @select='query.posField = $event'
              )
                template(slot-scope="{ item }")
                  .item {{item}}
                i(slot="suffix" class="el-input__icon el-icon-place")
                el-button.geoloc(slot="append" icon="el-icon-location-outline" @click="geoloc")
            el-col(:span="12")
              el-autocomplete.inline-input(
                v-model="query.langField"
                :fetch-suggestions='autocompleteInputsDescription'
                placeholder="Python, Javascript..."
                @select='query.langField = $event'
              )
                template(slot-scope="{ item }")
                  .item {{item}}
                i(slot="suffix" class="el-input__icon el-icon-setting")
    el-row.searchRow(:gutter="20")
      el-col(:span="8" :offset="8")
        el-button(style="width: 100%;" type='primary' icon='el-icon-search' @click="search") Search some jobs
</template>
<script>
import { mapActions, mapGetters } from "vuex";
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
  computed: {
    ...mapGetters(["savedLocationInputs", "savedDescriptionInputs"])
  },
  methods: {
    ...mapActions(["searchJobs"]),
    search() {
      if (this.$route.params.jobId) {
        this.$router.go(-1);
      }
      this.searchJobs(this.query);

      // delete possible query params
      this.$router.replace({
      ...this.$router.currentRoute,
        query: {}
      });
    },
    autocompleteInputsLocation(str, cb) {
      cb(this.savedLocationInputs(str));
    },
    autocompleteInputsDescription(str, cb) {
      cb(this.savedDescriptionInputs(str));
    },
    setGeolocationData(position) {
      this.query.lat = position.coords.latitude;
      this.query.long = position.coords.longitude;
      this.query.posField = 'Position actuelle';
      this.searchJobs(this.query);
    },
    geolocError() {
      this.$message({
        message: "Can't find your position",
        type: 'error'
      });
    },
    geoloc() {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          this.setGeolocationData,
          this.geolocError,
          {timeout: 8000}
        );
      } else {
        this.$message({
          message: "We can't access geolocation on your computer, check your settings.",
          type: 'error'
        });
      }
    }
  }
}
</script>
<style>
  /* Override to feet in rows */
  .el-autocomplete {
    width: 100% !important;
  }

  .header {
    background-image: linear-gradient(to bottom, rgba(142, 217, 252, 0.52), rgba(212, 109, 49, 0.73)), url('~assets/img/header.jpg');
    height: 400px;
    background-position: 55% 55%;
    padding: 50px;
  }

  .logo h1 a {
    color: #fff;
    text-decoration: none;
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