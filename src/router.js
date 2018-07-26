import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';

import ItemList from './views/item/itemList.vue';
import ItemEdit from './views/item/itemEdit.vue';
import ItemDetails from './views/item/itemDetails.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/item',
      name: 'itemList',
      component: ItemList,
    },
    {
      path: '/item/:id',
      name: 'itemDetails',
      component: ItemDetails,
    },
    // {
    //   path: '/item/:id?',
    //   name: 'itemEdit',
    //   component: ItemEdit,
    // },
  ],
});
