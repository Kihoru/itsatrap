import Vuex from "vuex";

const crStore = () => {
  return new Vuex.Store({
    strict: true,

    /* If there is module, it's here my lil friend */
    modules: {},

    /* State */
    state: {
      apiBase: "https://jobs.github.com/positions.json",
      jobs: {},
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
    actions: {},

    /* Mutations */
    mutations: {}
  });
};

export default crStore;
