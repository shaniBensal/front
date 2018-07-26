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
            },
            {
                "id": "1njvfvnr",
                "name":"moshe balbua",
                "email":"moshe@gmail.com",
                "address":"ben yehuda 6, tel aviv ",
                "image":"http://www.yosmusic.com/wp-content/uploads/2016/05/%D7%92%D7%A1%D7%98%D7%99%D7%9F-%D7%98%D7%99%D7%9E%D7%91%D7%A8%D7%9C%D7%99%D7%99%D7%A7-2.jpg",
                "itemsForRent":["D" , "12WHSDE"],
                "favoriteItems":[]
            },
        
            {
                "id": "75hgrnw",
                "name":"tomer press",
                "email":"tomer@gmail.com",
                "address":"dizingoff 127 , haifa, israel ",
                "image":"https://www.biography.com/.image/t_share/MTQ4MDU5NDU0MzgwNzEzNDk0/lionel_messi_photo_josep_lago_afp_getty_images_664928892_resizedjpg.jpg",
                "itemsForRent":["A7r4hfw"],
                "favoriteItems":[]
            },
            {
                "id": "2g7frn1",
                "name":"ron zilber",
                "email":"ron@gmail.com",
                "address":"moshe dayan 80, jerusalem, israel ",
                "image":"https://www.hamartzim.co.il/wp-content/uploads/2017/08/300-450-114.jpg",
                "itemsForRent":[],
                "favoriteItems":[]
            }
        ],
        // user: userService.getLoggedInUser()
        user: null,
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
            return context.commit({ type: 'setUser', user:filterd })
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
        },
        userWithItems(state) {
            var userWithItems = {
                ...user,
                items: state.userItems
            }
            return userWithItems;
        }

    }
}
