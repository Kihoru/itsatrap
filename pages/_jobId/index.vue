<template lang="pug">
  div.job(v-loading="loading")
    el-row(v-if="job")
      el-col(:span="12" :offset="6")
        h1 {{job.company}} - {{job.title}}
        div.company_logo
          a(:href="job.company_url" target="_blank")
            img(:src="job.company_logo")
        div.job_content
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

<style>
  .job {
    text-align: center;
    margin-top: 50px;
    margin-bottom: 100px;
  }
  .company_logo {
    margin-top: 25px;
    cursor: pointer;
  }
  .company_logo img {
    max-width: 100%;
    max-height: 200px;
  }
  .job_more {
    margin-top: 50px;
    color: grey;
    font-size: 0.9em;
    display: flex;
    justify-content: space-between;
  }
  .apply {
    color: #fff;
    text-decoration: none;
  }
  .description {
    margin-top: 75px;
    text-align: justify;
    line-height: 2em;
    margin-bottom: 50px;
  }
</style>