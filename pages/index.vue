<template lang="pug">
  div
    el-row(:gutter="20")
      el-col(v-loading="loading" style="padding-top: 50px;" :span="12" :offset="6")
        JobComponent(v-for="job in jobs" :job="job" :key="job.id")
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
    ...mapActions(["searchJobs"])
  }
}
</script>

<style>
</style>