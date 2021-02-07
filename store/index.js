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
        commit('SAVE_INPUTS', queryObj);
        let url = urlMaker.makeUrl(state.jobsBase, queryObj);
        const res = await axios.get(url);
        commit('SET_JOBS', res.data);
      },
      async searchJobById({state, commit}, id) {
        let url = urlMaker.makeUrl(state.jobBase, id);
        const res = await axios.get(url);
        commit('ADD_JOB', res.data);
      }
    },

    /* Mutations */
    mutations: {
      SET_JOBS(state, jobs) {
        state.jobs = jobs;
        state.loading = false;
      },
      ADD_JOB(state, job) {
        let found = state.jobs.find(j => j.id == job.id);
        if (!found) {
          state.jobs.push(job);
        }
        state.loading = false;
      },
      SAVE_INPUTS(state, query) {
        console.log("saving inputs", query);
        // Here we're saving inputs to show user what he already searched
        if (query.langField && state.searchInputs.indexOf(query.langField) < 0) {
          state.searchInputs.push(query.langField);
        }
        if (query.posField && state.locationInputs.indexOf(query.posField) < 0) {
          state.locationInputs.push(query.posField);
        }

        console.log(state);
      }
    }
  });
};

export default crStore;
