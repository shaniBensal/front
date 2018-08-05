import transactionsService from '../services/transactionsService.js';
// import { log } from 'util';

export default {
  state: {

  },

  mutations: {

  },

  // ********************************

  getters: {
  },  
  actions: {
    newTransaction(context, { trans }){
      return transactionsService.newTransaction(trans)
    },
    getTransactionsByOwner(context, {userId}){
      return transactionsService.getTransactionsByOwner(userId);
    },

    getTransactionsByRenter(context, {userId}){
      return transactionsService.getTransactionsByRenter(userId);
    }
    
  }
};
