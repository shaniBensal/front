import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../service/userService.js'
import { stat } from 'fs';

export default {
    state: {
        user: userService.getLoggedInUser() 
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },

    },
    actions: {
        login(context, { username }) {
            return userService.login({ username })
                .then((user) => {
                    return context.commit({ type: 'setUser', user })
                })
        },
        logout(context) {
            return userService.logout()
                    then(() => {
                        return context.commit({ type: 'setUser', user: null })
                    })
        }
    },
    getters: {
        isAdmin(state) {
            return state.user.isAdmin
        },
        loggedinUser(state){
            return state.user
        }
    }
}
