import Vue from 'vue';
import VueRouter from 'vue-router';

import Timeline from '../views/Timeline.vue';
import Profile from '../views/Profile.vue';
import Post from '../views/Post.vue';
import Messages from '../views/Messages.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Logout from '../views/Logout.vue';
import Admin from '../views/Admin.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Timeline',
    component: Timeline,
  },
  {
    path: '/u/:username',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/p/:id',
    name: 'Post',
    component: Post,
  },
  {
    path: '/messages',
    name: 'Messages',
    component: Messages,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
