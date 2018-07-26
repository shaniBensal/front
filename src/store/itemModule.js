
import itemsService from '../services/itemService.js'

export default {
    state: {
        items: [
            {
                "id": "A",
                "category": [
                    "travel"
                ],
                "title": "bagPack",
                "description": "grate back pack 80L Osprey",
                "ranking": 4,
                "price": 20,
                "dateCreated": "Date.now()",
                "keyWords": [
                    "trip",
                    "camping",
                    "bag",
                    "big"
                ],
                "ownerId": "A1",
                "occupiedDates": [
                    "2018-08-14",
                    "2018-08-05",
                ],
                "images": [
                    "http://greensimon.zippykid.netdna-cdn.com/wp-content/uploads/2011/09/osprey-aether-207x300.png"
                ],
                "condition": "new"
            },
            {
                "id": "B",
                "category": [
                    "travel"
                ],
                "title": "Diving suit",
                "description": "Full Body Dive Wetsuit Sports Skins Lycra Rash Guard for Men Women, UV Protection Long Sleeve One Piece Swimwear for Snorkeling Surfing Scuba Diving Swimming Kayaking Sailing Canoeing",
                "ranking": 4,
                "dateCreated": "Date.now()",
                "keyWords": [
                    "travel",
                    "dive",
                    "suit",
                    "scuba"
                ],
                "price": 80,
                "ownerId": "B1",
                "occupiedDates": [
                    "2018-08-14",
                    "2018-08-05",
                ],
                "images": [
                    "https://images.pexels.com/photos/37530/divers-scuba-divers-diving-underwater-37530.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"
                ],
                "condition": "new"
            },
            {
                "id": "C",
                "category": [
                    "kitchen",
                    "travel"
                ],
                "title": "Charcoal Grill",
                "description": "The Outdoor Gourmet™ 14 Charcoal Grill features a 4.4 lb. lightweight design, making it an ideal choice for portable grilling. An adjustable vent offers enhanced temperature control over the 151 sq. in. grilling area. Steel construction ensures durability, and heat-resistant handles help protect your hands",
                "ranking": 4,
                "price": 15,
                "dateCreated": "Date.now()",
                "keyWords": [
                    "kitchen",
                    "BBQ",
                    "meat",
                    "mangal"
                ],
                "ownerId": "C1",
                "occupiedDates": [
                    "2018-08-14",
                    "2018-08-05",
                ],
                "images": [
                    "https://assets.academy.com/mgen/83/10157883.jpg"
                ],
                "condition": "new"
            },
            {
                "id": "D",
                "category": [
                    "kitchen"
                ],
                "title": "bread machine",
                "description": "Oster Expressbake Bread Machine",
                "ranking": 4,
                "price": 10,
                "dateCreated": "Date.now()",
                "keyWords": [
                    "kitchen",
                    "bread",
                    "electric"
                ],
                "ownerId": "C1",
                "occupiedDates": [
                    "2018-08-14",
                    "2018-08-05",
                ],
                "images": [
                    "https://images-na.ssl-images-amazon.com/images/I/814etiBMveL._SL1500_.jpg"
                ],
                "condition": "new"
            },
            {
                "id": "12WHSDE",
                "category": [
                    "transportation"
                ],
                "title": "City Bike",
                "description": "1 year old city-bike , comes with battery, to move easily around the city",
                "ranking": 5,
                "price": 10,
                "dateCreated": "Date.now()",
                "keyWords": [
                    "bike",
                    "sport",
                    "fun",
                    "transportation"
                ],
                "ownerId": "njcnwe7",
                "occupiedDates": [
                    "2018-08-14",
                    "2018-08-05",
                ],
                "images": ["https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=350"],
                "condition": "used"
            },
            {
                "id": "A7r4hfw",
                "category": [
                    "travel",
                    "kids"
                ],
                "title": "Inflatable Pool",
                "description": "Big pool to enjoy the summer with your family anywhere",
                "ranking": 4,
                "price": 25,
                "dateCreated": "Date.now()",
                "keyWords": [
                    "trip",
                    "fun",
                    "family",
                    "camping",
                    "summer",
                    "big"
                ],
                "ownerId": "112AAmk",
                "occupiedDates": [
                    "2018-08-14",
                    "2018-08-05",
                ],
                "images": ["https://p1.akcdn.net/full/392557540.bestway-57313-syros-puhafalu-medence-szett-457x84cm-ffa-153.jpg"],
                "condition": "new"
            }
        ],
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
        setSelctedItem(state, { filterd }) {
            state.selectedItem = filterd;
        },
        unSetSelctedItem(state) {
            state.selectedItem = {};
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
        }

    },
    actions: {
        loadItems(context, payload) {
            // return itemsService.getAllItems(context.state.filterBy)
            // .then(items => {
            //     context.commit({ type: 'setItems', items })
            return context.state.items

        },

        loadItemById(context, { itemId }) {
            var filterd = context.state.items.filter(item => item.id === itemId);
            filterd = filterd[0]
            context.commit({ type: 'setSelctedItem', filterd })
            // return itemsService.getItemById(itemId)
            //     .then(item => {
            //         context.commit({ type: 'setSelctedItem', item })
            //         return item;
            //     })
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
        },

    }
}