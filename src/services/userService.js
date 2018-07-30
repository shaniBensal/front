
import EventBusService from '../services/EventBusService.js'
import storageService from './storageService.js'
const STORAGE_KEY = 'loggedinUser';
import axios from 'axios'
import { POINT_CONVERSION_COMPRESSED } from 'constants';

// const axios = require('axios')
const URL = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : '//localhost:3000/user';

var loggedinUser = storageService.loadFromStorage(STORAGE_KEY) || null;

function login({ user }) {
    return axios.post(`${URL}/checkLogin`, { user })
        .then(res => {
            _setLoggedinUser(res.data)
            return (res.data)
        })
}

function signup(userDetails) {
    console.log('user in store', userDetails);
    return axios.post(`${URL}/signup`, userDetails.user)
        .then(res => res.data)
        .catch(err => err)
}

function getUserById(userId) {
    // console.log('service front' , userId)
    return axios.get(`${URL}/${userId}`)
        .then(res => {
            // console.log('got back from route',res.data)
            return res.data
        })
}

function logOut() {
    loggedinUser = null;
    storageService.clearStorage(STORAGE_KEY);
}

function getLoggedInUser() {
    return loggedinUser
}

function _setLoggedinUser(user) {
    loggedinUser = user;
    storageService.saveToStorage(STORAGE_KEY, loggedinUser)
    EventBusService.$emit('succesful-login')
}

function addFavorites(user, item) {
    return axios.post(`${URL}/favorites/${item._id}`, user)
        .then(res => {
            return res.data
        })

}

function getAllItemsByUser(userId) {
    return axios.get(`${URL}/item/${userId}`)
        .then(res => {
            return res.data
        })
}

export default {
    login,
    getLoggedInUser,
    logOut,
    getUserById,
    signup,
    addFavorites,
    getAllItemsByUser
}