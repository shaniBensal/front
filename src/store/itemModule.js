
import itemsService from '../services/itemService.js'

export default {
    state: {
        items: [],
        filterByText: '', //for start, later on become object by price, text, location
        selectedItem: {}
    },

    mutations: {
        addNewItem(state, payload) {
            state.items.unshift(payload.item);
        },
        deleteItem(state, { itemId }) {
            state.items = state.items.filter(item => item.id !== itemId);
        },
        setItems(state, { items }) {
            state.items = items;
        },
        updateItem(state, { item }) {
            var selectedItemIndex = state.items.findIndex(currItem => item.id === currItem.id);
            state.items.splice(selectedItemIndex, 1, item);
        },
        setSelctedItem(state, { item }) {
            state.selectedItem = item;
        },
        unSetSelctedItem(state) {
            return state.selectedItem = {};
        },
        setFilter(state, payload) {
            state.filterByText = payload.filterBy;
        },
    },
    getters: {
        itemsForDisplay(state) {
            return state.items; //for start without filtering
            // return state.items.filter(item => item.name.includes(state.filterBy));
        },
        filterBy(state) {
            return state.filterByText;
        }
    },
    actions: {
        loaditems(context, payload) {
            return itemsService.getAllItems(context.state.filterBy)
                .then(items => {
                    context.commit({ type: 'setItems', items })
                    return items;
                })
        },

        loadItem(context, { itemId }) {
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
            return itemsService.updateItem(item)
                .then((item) => {
                    return context.commit({ type: 'updateItem', item })
                })
        }
    }
}