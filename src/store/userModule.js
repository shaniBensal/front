import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/userService.js'
import itemService from '../services/itemService.js'
import { stat } from 'fs';

export default {
    state: {

        // user: userService.getLoggedInUser()
        user: null,
        rentedItems: [],
        itemsForRent: null
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
        setRentedItems(state, { item }) {
            state.rentedItems.push(item)
        },
        setItemsForRent(state, { items }) {
            state.itemsForRent = items
        }

    },
    actions: {
        loadUserById(context, { userId }) {
            // console.log('user module,', userId)
            return userService.getUserById(userId)
                .then(user => {
                    // console.log('!!!!', user)
                    context.commit({ type: 'setUser', user })
                    // context.commit({type: 'setRentedItems' , user})
                    return user;
                })
        },

        loadRentedItems(context, { items }) {
            items.forEach(itemId => {
                return itemService.getItemById(itemId)
                    .then(item => {
                        // console.log('you rented', item)
                        context.commit({ type: 'setRentedItems', item })
                    })
            });
        },

        loadItemsForRent(context, { userId }) {
            return itemService.getItemByOwnerId(userId)
                .then(items => {
                    console.log('1111' , items)
                    context.commit({ type: 'setItemsForRent', items })
                })
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
        rentedItemsByUser(state) {
            // var rentedItems = {
            //     user: {...state.user},
            //     items: state.rentedItems
            // }
            // console.log('state.rnteditems', state.rentedItems)
            return state.rentedItems;
        },

        itemsForRent(state){
           return state.itemsForRent
        }

    }
}