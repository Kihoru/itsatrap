import Vuex from "vuex";
import axios from 'axios';
import urlMaker from "../utils/urlMaker";

const crStore = () => {
  return new Vuex.Store({
    strict: false,

    /* If there is module, it's here my lil friend */
    modules: {},

    /* State */
    state: {
      apiBase: "/jobs",
      jobs: [],
      searchInputs: [],
      locationInputs: [],
      currentSearch: {
        location: [],
        keywords: []
      }
    },

    /* Getters */
    getters: {},

    /* Actions */
    actions: {
      async searchJobs ({state, commit}, queryObj) {
        let url = urlMaker.makeUrl(state.apiBase, queryObj);
        const res = await axios.get(url);
        commit('SET_JOBS', res.data);
      },
    },

    /* Mutations */
    mutations: {
      SET_JOBS(state, jobs) {
        state.jobs = jobs;
      }
    }
  });
};

export default crStore;
