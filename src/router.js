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
    {
<<<<<<< HEAD
      path: '/item/:id?',
=======
      path: '/item/edit/id?',
>>>>>>> 50179c5fee16b7242d90996dcf22cd30d3e055a2
      name: 'itemEdit',
      component: ItemEdit,
    },
    {
      path: '/user/:id',
      name: 'userDetails',
      component: UserDetails,
    },
<<<<<<< HEAD
=======
    {
      path: '/user/edit/:id',
      name: 'userEdit',
      component: UserEdit,
    },
>>>>>>> 50179c5fee16b7242d90996dcf22cd30d3e055a2
  ],
});
