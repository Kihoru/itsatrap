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
      jobsBase: "/jobs",
      jobBase: "/job",
      loading: true,
      jobs: [],
      searchInputs: [],
      locationInputs: []
    },

    /* Getters */
    getters: {
      getJobById(state) {
        return id => state.jobs.find(j => j.id == id);
      },
      savedLocationInputs: state => str => {
        return state.locationInputs.filter(i => i.indexOf(str) > -1);
      },
      savedDescriptionInputs: state => str => {
        return state.searchInputs.filter(i => i.indexOf(str) > -1);
      }
    },

    /* Actions */
    actions: {
      async searchJobs ({state, commit}, queryObj) {
        commit('TOGGLE_LOADING', true);
        commit('SAVE_INPUTS', queryObj);
        let url = urlMaker.makeUrl(state.jobsBase, queryObj);
        const res = await axios.get(url);
        commit('SET_JOBS', res.data);
        commit('TOGGLE_LOADING', false);
      },
      async searchJobById({state, commit}, id) {
        commit('TOGGLE_LOADING', true);
        let url = urlMaker.makeUrl(state.jobBase, id);
        try {
          const res = await axios.get(url);
          commit('ADD_JOB', res.data);
          commit('TOGGLE_LOADING', false);
        } catch(e) {
          this.$router.push({ path: '/', query: { error: "404"} });
        }
      },
      toggleLoading({commit}, bool) {
        commit('TOGGLE_LOADING', bool);
      }
    },

    /* Mutations */
    mutations: {
      TOGGLE_LOADING(state, bool) {
        state.loading = bool;
      },
      SET_JOBS(state, jobs) {
        state.jobs = jobs;
      },
      ADD_JOB(state, job) {
        let found = state.jobs.find(j => j.id == job.id);
        if (!found) {
          state.jobs.push(job);
        }
      },
      SAVE_INPUTS(state, query) {
        // Here we're saving inputs to show user what he already searched
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
