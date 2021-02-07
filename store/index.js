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
      loading: true,
      jobs: [],
      searchInputs: [],
      locationInputs: []
    },

    /* Getters */
    getters: {},

    /* Actions */
    actions: {
      async searchJobs ({state, commit}, queryObj) {
        commit('SAVE_INPUTS', queryObj);
        let url = urlMaker.makeUrl(state.apiBase, queryObj);
        const res = await axios.get(url);
        commit('SET_JOBS', res.data);
      },
    },

    /* Mutations */
    mutations: {
      SET_JOBS(state, jobs) {
        state.jobs = jobs;
        state.loading = false;
      },
      SAVE_INPUTS(state, query) {
        // Here we're savings inputs to show user what he already wrote
        if (query.langField && state.searchInputs.indexOf(query.langField) < 0) {
          state.searchInputs.push(query.langField);
        }
        if (query.posField && state.locationInputs.indexOf(query.posField) < 0) {
          state.locationInputs.push(query.posField);
        }
      }
    }
  });
};

export default crStore;
