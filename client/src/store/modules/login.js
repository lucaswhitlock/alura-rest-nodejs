import resource from '../../resources/users/index'
import router from '../../router/index'

const loginModule = {
  namespaced: true,
  state: {
    user: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    resetUser(state) {
      state.user = null;
    }
  },
  actions: {
    async authUser(context, user) {
      try {
        await resource.loginUser(user).then(response => {
          context.commit("setUser", response.data.data);
          router.push({ path: "/landing" });
        });
      } catch (error) {
        context.commit("alerts/error", "Error while trying to authenticate user!", {
          root: true
        });
      }
    },
    async registerUser(context, user) {
      try {
        await resource.createUser(user).then(response => {
          context.commit("alerts/success", `User ${response.data.data.login} registered with success!`, {
            root: true
          });
        })
      } catch (error) {
        context.commit("alerts/error", "Error while trying to register user!", {
          root: true
        });
      }
    },
    logoutUser(context) {
      context.commit("resetUser");
      router.push({ path: "/" });
    }
  },
  getters: {
    getUser: state => {
      return state.user;
    }
  }
};

export default loginModule;
