import Vue from 'vue';
import Router from 'vue-router';
import login from '@/views/login.vue'; 

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/menu',
    name: 'menu',
    component: () => import("@/views/menu.vue"),
    children: [
      {
        path: '', 
        redirect: 'UserList' 
      },
      {
        path: 'UserList',
        name: 'UserList',
        component: () => import("@/views/menu/UserList.vue"),
      },
      {
        path: 'Adduser',
        name: 'Adduser',
        component: () => import("@/views/menu/Adduser.vue"),
      },
      {
        path: 'NewsList',
        name: 'NewsList',
        component: () => import("@/views/menu/NewsList.vue"),
      },
      {
        path: 'Addnews',
        name: 'Addnews',
        component: () => import("@/views/menu/Addnews.vue"),
      },
     
    ],
    
  },

];

const router = new Router({
  mode: 'hash', // 使用 HTML5 History 模式
  routes
});

// 全局导航守卫
router.beforeEach((to, from, next) => {
  if (to.name === from.name && to.params.id === from.params.id) {
    next(false); // 取消导航
  } else {
    next(); // 继续导航
  }
});

// 捕获并处理导航错误
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') throw err;
  });
};

export default router;
