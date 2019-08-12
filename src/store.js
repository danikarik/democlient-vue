import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    isLoggedIn: null,
    lastSignInAt: null,
    user: null
  },
  mutations: {
    authenticateUser(state, payload) {
      state.isLoggedIn = true
      state.lastSignInAt = payload
    },
    saveUser(state, payload) {
      state.user = payload
    },
    changeUsername(state, payload) {
      state.user.username = payload
    }
  },
  actions: {

  }
})

export default store
