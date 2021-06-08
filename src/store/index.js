import { createStore } from 'vuex'

const loggedInModule = {
  state () {
    return {
      user: {
        isloggedIn: 0,
        name: '',
        userId: 0
      }
    }
  },
  mutations: {
    setAuth (state, payload) {
      console.log('In mutation setting isLoggedIn to' + payload)
      state.isLoggedIn = payload
    },
    setName(state,payload){
      state.user.name = payload
    },
    setId(state,payload){
      state.user.userId = payload
    }
  },
  actions: {
    setAuth (context, payload) {
      console.log(payload)
      context.commit('setAuth', payload)
    },
    setName (context, payload) {
      console.log(payload)
      context.commit('setName', payload)
    },
    setId (context, payload) {
      console.log(payload)
      context.commit('setId', payload)
    }
  },
  getters: {
    userIsAuthenticated (state) {
      return state.isLoggedIn
    },
    getName (state) {
      return state.user.name
    },
    getId (state) {
      return state.user.userId
    }
  }
}

export default createStore({
  modules: {
    loggedIn: loggedInModule
  }
})
