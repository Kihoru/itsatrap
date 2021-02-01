const crStore = () => {
  return new Vuex.Store({
    strict: getEnv() === "development",

    /* If there is module, it's here my lil friend */
    modules: {},

    /* State */
    state: {},

    /* Getters */
    getters: {},

    /* Actions */
    actions: {},

    /* Mutations */
    mutations: {}
  });
};

export default crStore;
