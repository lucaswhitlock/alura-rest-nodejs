import Vue from 'vue'
import Vuex from 'vuex'

import alerts from './modules/alerts'
import login from './modules/login'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    alerts,
    login
  },
  strict: process.env.NODE_ENV != "prd"
})
