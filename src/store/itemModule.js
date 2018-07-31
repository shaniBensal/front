import itemsService from '../services/itemService.js';
import { log } from 'util';

export default {
  state: {
    items: [],
    filterByText: '', //for start, later on become object by price, text, location
    selectedItem: {},
    itemsToShow: [],
    filters : {
        byTitle : '',
        byCategory : ''
    },
    categories: [
      'travel',
      'kitchen',
      'transportation',
      'kids',
      'events',
      'hardware'
    ],
    owner:{}
  },

  mutations: {
    addNewItem(state, payload) {
      state.items.unshift(payload.item);
    },
    deleteItem(state, { itemId }) {
      state.items = state.items.filter(item => item._id !== itemId);
    },
    setItems(state, { items }) {
      // console.log('mutations / setItems got items:',items);
      state.items = items;
    },
    updateItemO(state, { item }) {
      var selectedItemIndex = state.items.findIndex(
        currItem => item._id === currItem._id
      );
      state.items.splice(selectedItemIndex, 1, item);
    },
    setSelctedItem(state, { item }) {
      state.selectedItem = item;
    },
    unSetSelctedItem(state) {
      state.selectedItem = {};
    },

    // setFilter(state, payload) {
    //   state.filterByText = payload.filterBy;
    // },

    updateItemRank(state, { rating }) {
      state.selectedItem.ranking.count = state.selectedItem.ranking.count + 1;
      state.selectedItem.ranking.avg =
        (state.selectedItem.ranking.avg + rating) /
        state.selectedItem.ranking.count;
    },

    setFilterByCategory(state, {idx}) {
        state.filters.byCategory = state.categories[idx];
        var res1 = state.items.filter(item => {
            return item.title.includes(state.filters.byTitle)
        })
        state.itemsToShow = res1;

        var res2 = state.itemsToShow.filter(item => {
            return item.category.includes(state.filters.byCategory)
        })
        state.itemsToShow = res2;
    },

    refreshItems(state) {
      // state.itemsToShow = [];
      state.itemsToShow= state.items;
    }
  },
  
  getters: {
    itemsForDisplay(state){
      return state.itemsToShow;
    },

    filteredItems(state, getters) {
      return categoryIdx => {
        var categoryStr = state.categories[categoryIdx];
        return state.items.filter(it => {
          return it.category[0].toLowerCase() === categoryStr.toLowerCase();
        });
      };
    },

    // itemsForDisplay(state) {
    // //   return state.items; //for start without filtering
    //   var res1 = state.items.filter(item => {
    //       console.log(' 111111111111 ', item.title);
    //       return item.title.contains(state.filters.byTitle)    //  udes('a');  //.find('machine')
    //   })
    //   console.log('res1= *********  ',res1);
      
    //   var res2 = res1.filter(item => {
    //     console.log(' 222222222222 ', item.title);

    //       return item.category.includes(state.filters.byCategory)
    //   })
    //   return res2;
    // },

    filterBy(state) {
      return state.filterByText;
    },
    selectedItem(state) {
      return state.selectedItem;
    },
    getStarsByRank() {
      return item => {
        if (item.ranking === 1) return '⭐';
        if (item.ranking === 2) return '⭐⭐';
        if (item.ranking === 3) return '⭐⭐⭐';
        if (item.ranking === 4) return '⭐⭐⭐⭐';
        if (item.ranking === 5) return '⭐⭐⭐⭐⭐';
      };
    },

    categories(state) {
      return state.categories;
    }
  },
  actions: {
    loadItems(context, payload) {
      return itemsService.getAllItems(context.state.filterBy).then(items => {
        // console.log(' ACTIONS got items:',items);
        context.commit({ type: 'setItems', items });
        context.commit({type: 'refreshItems'});
        return context.state.items;
      });
    },

    loadItemById(context, { itemId }) {
      return itemsService.getItemById(itemId).then(item => {
        context.commit({ type: 'setSelctedItem', item });
        // console.log(item);
        return item;
      });
    },

    
    deleteItem(context, { itemId }) {
      return itemsService.deleteItem(itemId).then(() => {
        context.commit({ type: 'deleteItem', itemId });
      });
    },

    addNewItem(context, { item }) {
      return itemsService.addItem(item).then(item => {
        context.commit({ type: 'addNewItem', item });
      });
    },

    updateItem(context, { item }) {
      if (!item) item = context.state.selectedItem;
      return itemsService.updateItem(item).then(item => {
        return context.commit({ type: 'updateItemO', item });
      });
    }
  }
};
