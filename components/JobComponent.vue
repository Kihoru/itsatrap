<template lang="pug">
  div.job
    el-row(:gutter="20")
      el-col(:span="8")
        img.logo(:src="job.company_logo")
      el-col(:span="16")
        h2
          NuxtLink(:to="job.id") {{job.company}} - {{job.title}}
        div.content(v-html="job.description.substr(0, 400) + '...'")
        div.location
          p {{job.location}} - {{job.type}}
          p {{job.created_at}}
</template>
<script>
export default {
  props: {
    job: {
      type: Object,
      required: true
    }
  }
}
</script>
<style>
.job {
  padding: 25px;
  margin: 25px 0;
}
.job h2 {
  padding-bottom: 10px;
}
.logo {
  max-width: 75%;
  max-height: 200px;
}
.job h2 a {
  color: rgb(70, 70, 70);
  text-decoration: none;
}
.job h2 a:hover{
  color: rgb(20, 85, 145);
}
.content {
  line-height: 1.5em;
}
.location {
  margin-top: 20px;
  font-size: 0.8em;
  color: grey;
  display: flex;
  justify-content: space-between;
}
</style>