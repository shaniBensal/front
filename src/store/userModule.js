import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/userService.js'
import itemService from '../services/itemService.js'
import { stat } from 'fs';

export default {
    state: {

        user: userService.getLoggedInUser(),
        // user: null,
        rentedItems: []
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
        setRentedItems(state, { item }) {
            state.rentedItems.push(item)
        }
    },
    actions: {
        loadUserById(context, { userId }) {
            // console.log('user module,' , userId)
            return userService.getUserById(userId)
                .then(user => {
                    // console.log('!!!!' , user)
                    context.commit({ type: 'setUser', user })
                    // context.commit({type: 'setRentedItems' , user})
                    return user;
                })
        },

        loadOwnerById(context, { ownerId }) {            
            return userService.getUserById(ownerId)
        },

        loadRentedItems(context, { items }) {
            items.forEach(itemId => {
                return itemService.getItemById(itemId)
                    .then(item => {
                        // console.log('you rented' , item)
                        context.commit({ type: 'setRentedItems', item })
                    })

            });

        },

        login(context, { username }) {
            return userService.login({ username })
                .then((user) => {
                    return context.commit({ type: 'setUser', user })
                })
        },
        logOut(context) {
            return userService.logOut()
            then(() => {
                return context.commit({ type: 'setUser', user: null })
            })
        },
        addUser(context, { user }) {
            return userService.signup({ user })
                .then((user) => {
                    return context.commit({ type: 'setUser', user })
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
        rentedItemsByUser(state) {
            // var rentedItems = {
            //     user: {...state.user},
            //     items: state.rentedItems
            // }
            // console.log('state.rnteditems',state.rentedItems)
            return state.rentedItems;
        }

    }
}