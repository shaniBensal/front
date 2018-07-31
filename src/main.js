import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios'
import Vuetify from 'vuetify'
// import cloudinary from "cloudinary";


import './registerServiceWorker';

import '../public/scss/main.css'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import StarRating from 'vue-star-rating'

Vue.component('star-rating', StarRating);
Vue.use(Vuetify)
Vue.use(require('vue-moment'));

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
