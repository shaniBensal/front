import Vue from 'vue'
import Vuex from 'vuex'
import userService from '../services/userService.js'
import itemService from '../services/itemService.js'
import { stat } from 'fs';

export default {
    state: {
        user: userService.getLoggedInUser() || null,
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

        loadOwnerById(context, { ownerId }) {
            return userService.getUserById(ownerId)
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
                    console.log('1111', items)
                    context.commit({ type: 'setItemsForRent', items })
                })
        },

        login(context, { user }) {
            return userService.login({ user })
                .then((user) => {
                    context.commit({ type: 'setUser', user })
                    return user;
                })
        },

        logOut(context) {
            userService.logOut()
            return context.commit({ type: 'setUser', user: null })
        },

        addUser(context, { user }) {
            console.log('user in store', user);

            return userService.signup({ user })
                .then((user) => {
                    return context.commit({ type: 'setUser', user })
                })
        },
        addItemToFavorites(context, payload) {
            console.log(payload.item, payload.user)
            var user = payload.user;
            var favoriteItem = payload.item
            userService.addFavorites(user, favoriteItem)
                .then((user) => {
                    console.log('user', user)
                    return context.commit({ type: 'setUser', user })
                })
        },
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

        itemsForRent(state) {
            return state.itemsForRent
        },

        favoriteItems(state) {
            return state.user.favoriteItems
        }



    }
}