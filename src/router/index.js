import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore}  from "@/store/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {path: '/login',name:'login',component: () => import('@/views/login/loginPage.vue')},
      {path:'/',name:'layout',component: () => import('@/views/home/layout.vue'),redirect: 'home',
          children: [
              {path:'/document',name:'document',component: () => import('@/views/widgets/document.vue')},
              {path:'/user',name:'user',component: () => import('@/views/user/user.vue')},
              {path:'/home',name:'home',component: () => import('@/views/home/homePage.vue')},
              {path: '/detail' ,name:'detail',component: () => import('@/views/widgets/detail.vue')}
          ]},
      {path: '/center' ,name:'center',component: () => import('@/views/widgets/personalCenter.vue')},
  ]
})


router.beforeEach((to,next) => {
  const userStore = useUserStore();
  if (!userStore.token && to.path!== '/login' && to.path !== '/home') return '/login'
    if (to.path === '/user'&& userStore.role!== 'admin'&&userStore.role!== 'root') {
        ElMessage.error('您没有权限访问该页面')
        next(false)

  }}
 )
export default router