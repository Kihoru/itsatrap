<template lang="pug">
  div
    el-row(:gutter="20")
      el-col(
        v-loading="loading"
        v-if="jobs.length"
        style="padding-top: 50px;" 
        :span="12" 
        :offset="6"
      )
        p.joblen {{jobs.length}} job{{jobs.length > 1 ? 's' : ''}} found
        JobComponent(v-for="job in jobs" :job="job" :key="job.id")
      el-col(v-else style="padding-top: 50px;" :span="12" :offset="6")
        p.nothing No job found
</template>

<script>
import JobComponent from "~/components/JobComponent";
import { mapState, mapActions } from "vuex";
export default {
  components: {JobComponent},
  computed: {
    ...mapState(["jobs", "loading"])
  },
  mounted() {
    if (!this.jobs.length) {
      // Set default search
      this.searchJobs({
        lat: "",
        long: "",
        posField: "New York",
        langField: "python"
      });
    } else {
      this.loading = false;
    }
  },
  methods: {
    ...mapActions(["searchJobs"]),
    loadMore() {
      console.log('LOAD');
    }
  }
}
</script>

<style>
  .joblen {
    color: grey;
    text-align: right;
    font-size: 1.2em;
  }
  .nothing {
    text-align: center;
    font-size: 1.5em;
  }
</style>