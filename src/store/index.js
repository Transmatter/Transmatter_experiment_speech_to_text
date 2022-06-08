import { createStore } from "vuex";

export default createStore({
  state: {
    trigger:false,
    role:"",
    currentUser : null
  },
  mutations: {
    setCurrentUser(state, value) {
      state.currentUser = value
    },
    setRole(state,value){
      state.role = value
    }
  },
  getters: {
    getCurrentUser(state){
      return state.currentUser
    },
    getRole(state){
      return state.role
    }
  },
  actions: {
    setCurrentUser(context, value) {
      context.commit('setCurrentUser', value)
    },
    setRole(context,value){
      context.commit('setRole',value)
    }
  },
  modules: {},
});