import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/home.vue';
import Lists from '../views/lists.vue';
import Option from '../views/option.vue';
import Detail from '../views/detail.vue';
import Todos from '../views/todos.vue';
import Todos2 from '../views/todos2.vue';
import Todos3 from '../views/todos3.vue';
import Todosx from '../views/todosx.vue';
import VuexTest from '../views/vuex-test.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Home },
  { path: '/lists', component: Lists },
  { path: '/option', component: Option },
  { path: '/detail', component: Detail },
  { path: '/todos', component: Todos },
  { path: '/todos2', component: Todos2 },
  { path: '/todos3', component: Todos3 },
  { path: '/todosx', component: Todosx },
  { path: '/vuextest', component: VuexTest }
];

const router = new VueRouter({routes});

export default router;
