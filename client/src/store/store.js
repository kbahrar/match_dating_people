import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    state: {
        token: null,
        user: null,
        isConnected: false,
        status: false
    },
    mutations: {
        setUser (state, user) {
            state.user = user
        },
        setValues (state) {
            state.status = true
            state.isConnected = true
        }
    },
    actions: {
        login: ({commit, state}, user) => {
            (new Vue()).$socket.emit('auth', user.id)
            commit('setUser', user)
            commit('setValues')
        },
        notif: ({commit, state}, id) => {
            (new Vue()).$socket.emit('notif', id)
        },
        msg: ({commit, state}, id) => {
            (new Vue()).$socket.emit('msg', id)
        }
    }
})