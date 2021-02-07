<template lang="pug">
  div
    el-row(:gutter="20")
      el-col(style="padding-top: 50px;" :span="12" :offset="6")
        JobComponent(v-for="job in jobs" :job="job" :key="job.id")
</template>

<script>
import JobComponent from "~/components/JobComponent";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  components: {JobComponent},
  computed: {
    ...mapState(["jobs"])
  }
}
</script>

<style>
</style>