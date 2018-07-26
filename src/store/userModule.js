import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/userService.js'
import { stat } from 'fs';

export default {
    state: {
        users: [
            {
                "id": "A",
                "name": "Shani Bensal",
                "email": "shaniSd@gmail.com",
                "address": "Ein Ha Mifratz 3",
                "image": "https://atmag-static-timeout.netdna-ssl.com/media/2017/10/sizes/Untitled-design-13_wo_680_382.jpg",
                "itemsForRent": [],
                "favoriteItems": []
            },
            {
                "id": "AA",
                "name": "Shiran Z",
                "email": "shanibensal@gmail.com",
                "address": "Sdemot Debora 3",
                "image": "https://www.etonline.com/sites/default/files/styles/max_970x546/public/images/2018-03/beyonce_643008856.jpg?itok=xFHaVRB5&h=35887d92",
                "itemsForRent": ["A"],
                "favoriteItems": []
            },
            {
                "id": "AAA",
                "name": "Tomer B",
                "email": "shanibensal@gmail.com",
                "address": "Hanita 3",
                "image": "https://i.ytimg.com/vi/KNHP8NRbCmI/hqdefault.jpg",
                "itemsForRent": [],
                "favoriteItems": []
            },
            {
                "id": "AAAA",
                "name": "Puki Muki",
                "email": "shanibensal@gmail.com",
                "address": "Ha Bonim 4",
                "image": "https://i.pinimg.com/originals/1e/01/a5/1e01a56f428895669c48d27c917f5673.jpg",
                "itemsForRent": ["C"],
                "favoriteItems": []
            }
        ],
        user: userService.getLoggedInUser()
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },

    },
    actions: {
        loadUserById(context, { userId }) {
            var filterd = context.state.users.filter(user => user.id === userId);
            filterd = filterd[0]
            context.commit({ type: 'setUser', filterd })
        },

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
            return state.user ? state.user.isAdmin : false;
        },
        loggedinUser(state) {
            return state.user
        }
    }
}
