const alertModule = {
  namespaced: true,
  state: {
    type: null,
    message: null
  },
  mutations: {
    success(state, message) {
      state.type = "success";
      state.message = message;
    },
    error(state, message) {
      state.type = "danger";
      state.message = message;
    },
    clear(state) {
      state.type = null;
      state.message = null;
    }
  },
  actions: {
    success({ commit }, message) {
      commit("success", message);
    },
    error({ commit }, message) {
      commit("error", message);
    },
    clear({ commit }) {
      commit("clear");
    }
  },
  getters: {
    getState: state => {
      return state;
    },
    getType: state => {
      return state.type;
    },
    getMessage: state => {
      return state.message;
    }
  }
};

export default alertModule;
