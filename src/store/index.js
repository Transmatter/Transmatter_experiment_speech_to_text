import { createStore } from "vuex";

export default createStore({
  state: {
    trigger:false,
    currentUser : null
  },
  mutations: {
    setCurrentUser(state, value) {
      state.currentUser = value
    },
  },
  getters: {
    getCurrentUser(state){
      return state.currentUser
    }
  },
  actions: {
    setCurrentUser(context, value) {
      context.commit('setCurrentUser', value)
    },
  },
  modules: {},
});