<template lang="pug">
  div.job(v-loading="loading")
    el-row(v-if="job")
      el-col(:span="2")
        el-button(type="primary" @click="backToIndex" icon="el-icon-back")
      el-col(:span="12" :offset="4")
        h1 {{job.company}} - {{job.title}}
        div.company_logo
          a(:href="job.company_url" target="_blank")
            img(:src="job.company_logo")
        div
          p.description(v-html="job.description")
          el-button(type="primary" round)
            a.apply(target="_blank" :href="getHrefFromApply(job.how_to_apply)") Apply
        div.job_more
          p {{job.location}} - {{job.type}}
          p {{job.created_at}}
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["loading"]),
    ...mapGetters(["getJobById"]),
    job() {
      return this.getJobById(this.$route.params.jobId);
    }
  },
  mounted() {
    if (!this.job) {
      this.getJob(this.$route.params.jobId);
    }
  },
  methods: {
    ...mapActions(["searchJobById"]),
    getJob(id) {
      this.searchJobById(id);
    },
    backToIndex() {
      this.$router.go(-1);
    },
    getHrefFromApply(html) {
      let element = document.createElement('template');
      element.innerHTML = html.trim();
      const links = element.content.firstChild.getElementsByTagName('a');

      for (let attr of links[0].attributes) {
        if (attr.name == 'href') {
          return attr.value;
        }
      }
      return "";
    }
  }
}
</script>