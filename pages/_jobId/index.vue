<template lang="pug">
  div
    h1 {{jobId}}
</template>

<script>
export default {
  data() {
    return {
      jobId: null
    }
  },
  mounted() {
    this.jobId = this.$route.params.jobId;
  }
}
</script>

<style>
</style>