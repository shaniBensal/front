
import itemsService from '../services/itemService.js'

export default {
    state: {
        items: [],
        filterByText: '', //for start, later on become object by price, text, location
        selectedItem: {},
        categories: ['travel' , 'kitchen' , 'transportation' , 'kids' , 'events' , 'hardware']
        
    },

    mutations: {
        addNewItem(state, payload) {
            state.items.unshift(payload.item);
        },
        deleteItem(state, { itemId }) {
            state.items = state.items.filter(item => item._id !== itemId);
        },
        setItems(state, { items }) {
            state.items = items;
        },
        updateItemO(state, { item }) {
            var selectedItemIndex = state.items.findIndex(currItem => item._id === currItem._id);
            state.items.splice(selectedItemIndex, 1, item);
        },
        setSelctedItem(state, { item }) {
            state.selectedItem = item;
        },
        unSetSelctedItem(state) {
            state.selectedItem = {};
        },
        setFilter(state, payload) {
            state.filterByText = payload.filterBy;
        },
        updateItemRank(state, { rating }) {
            state.selectedItem.ranking.count = state.selectedItem.ranking.count + 1;
            state.selectedItem.ranking.avg =
                (state.selectedItem.ranking.avg + rating) /
                state.selectedItem.ranking.count;
        }
    },
    getters: {
        itemsForDisplay(state) {
            return state.items; //for start without filtering
            // return state.items.filter(item => item.name.includes(state.filterBy));
        },
        filterBy(state) {
            return state.filterByText;
        },
        selectedItem(state) {
            return state.selectedItem;
        },
        getStarsByRank() {
            return item => {
                if (item.ranking === 1) return '⭐'
                if (item.ranking === 2) return '⭐⭐'
                if (item.ranking === 3) return '⭐⭐⭐'
                if (item.ranking === 4) return '⭐⭐⭐⭐'
                if (item.ranking === 5) return '⭐⭐⭐⭐⭐'
            }
        },

        categories(state){
            return state.categories
        }

    },
    actions: {
        loadItems(context, payload) {
            return itemsService.getAllItems(context.state.filterBy)
                .then(items => {
                    context.commit({ type: 'setItems', items })
                    return context.state.items
                })
        },

        loadItemById(context, { itemId }) {
            return itemsService.getItemById(itemId)
                .then(item => {
                    context.commit({ type: 'setSelctedItem', item })
                    return item;
                })
        },

        deleteItem(context, { itemId }) {
            return itemsService.deleteItem(itemId)
                .then(() => {
                    context.commit({ type: 'deleteItem', itemId })
                })
        },

        addNewItem(context, { item }) {
            return itemsService.addItem(item)
                .then((item) => {
                    context.commit({ type: 'addNewItem', item })
                })
        },

        updateItem(context, { item }) {
            if (!item ) item = context.state.selectedItem;            
            return itemsService.updateItem(item)
                .then((item) => {
                    return context.commit({ type: 'updateItemO', item })
                })
        },

    }
}