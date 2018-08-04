
import axios from 'axios'
const TRANSACTION_URL = (process.env.NODE_ENV !== 'development')
    ? '/transaction'
    : '//localhost:3000/transaction';

function newTransaction(transaction){
       return axios.post(TRANSACTION_URL, transaction)
        .then(res => res.data)
}

function getTransactionsByOwner(ownerId){
    console.log('service front owner', ownerId);

    return axios.get(`${TRANSACTION_URL}/${ownerId}`)
        .then(res => res.data)
}

function getTransactionsByRenter(ownerId){
    return axios.get(`${TRANSACTION_URL}/activeTransactions/${ownerId}`)
    .then(res => res.data)
}




export default {
    newTransaction,
    getTransactionsByOwner,
    getTransactionsByRenter
}