<template lang="pug">
  div
    el-row
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
    if (this.$route.query.error) {
      const error = this.$route.query.error;
      switch(error) {
        case "404":
          this.$message({
            message: 'Job not found',
            type: 'error'
          });
          break;
        case "504":
          this.$message({
            message: 'Bad gateway',
            type: 'error'
          });
          break;
      }
    }
    if (!this.jobs.length) {
      // Set default search
      this.searchJobs({
        lat: "",
        long: "",
        posField: "New York",
        langField: "python"
      });
    } else {
      this.toggleLoading(false);
    }
  },
  methods: {
    ...mapActions(["searchJobs", "toggleLoading"])
  }
}
</script>