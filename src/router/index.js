import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {path: '/login',name:'login',component: () => import('@/views/login/loginPage.vue')},
      {path:'/',name:'layout',component: () => import('@/views/home/layout.vue'),redirect: 'home',
          children: [
              {path:'/document',name:'document',component: () => import('@/views/widgets/document.vue')},
              {path:'/admin',name:'admin',component: () => import('@/views/user/admin.vue')},
              {path:'/user',name:'user',component: () => import('@/views/user/user.vue')},
              {path:'/home',name:'home',component: () => import('@/views/home/homePage.vue')},
          ]},
  ]
})

export default router