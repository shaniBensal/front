import storageService from './storageService.js'
const STORAGE_KEY = 'loggedinUser';

const axios = require('axios')
const URL = (process.env.NODE_ENV !== 'development')
    ? '/user'
    : '//localhost:3000/user';

var loggedinUser = storageService.loadFromStorage(STORAGE_KEY) || null;

function login({ username }) {
    return axios.post(URL + '/setUser', { username })
        .then(res => {
            _setLoggedinUser(res.data)
            return (res.data)
        })
}

function getById(userId){
    return axios.get(`${URL}/${userId}`)
        .then(res => {
            console.log('got back from route',res.data)
            return res.data
        })       
}

function logout() {
    storageService.clearStorage(STORAGE_KEY)
}

function getLoggedInUser() {
    return loggedinUser
}

function _setLoggedinUser(user) {
    loggedinUser = user;
    storageService.saveToStorage(STORAGE_KEY, loggedinUser)
}

export default {
    login,
    getLoggedInUser,
    logout,
    getById
}