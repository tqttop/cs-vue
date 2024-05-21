import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore}  from "@/store/user.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {path: '/login',name:'login',component: () => import('@/views/login/loginPage.vue')},
      {path:'/',name:'layout',component: () => import('@/views/home/layout.vue'),redirect: 'home',
          children: [
              {path:'/document',name:'document',component: () => import('@/views/home/document.vue')},
              {path:'/user',name:'user',component: () => import('@/views/user/user.vue')},
              {path:'/home',name:'home',component: () => import('@/views/home/homePage.vue')},
              ]},
      {path: '/detail/:title' ,name:'detail',component: () => import('@/views/widgets/detail.vue')},
      {path:'/center',name:'center',component: () => import('@/views/widgets/personalCenter.vue')},
      {path:'/ArticleDetail/:id',name:'ArticleDetail',component: () => import('@/views/widgets/ArticleDetail.vue')},
      {path:'/Article',name:'Article',component: () => import('@/views/home/Article.vue'),redirect: 'ArticleList',
          children: [
      {path:'/ArticleList',name:'ArticleList',component: () => import('@/views/widgets/ArticleList.vue')},
      {path:'/ArticlePost',name:'ArticlePost',component: () => import('@/views/widgets/ArticlePost.vue')},
          ]},
  ]
})


router.beforeEach((to,next) => {
  const userStore = useUserStore();
    if (to.path === '/user'&& userStore.role!== 'admin'&&userStore.role!== 'root') {
        ElMessage.error('您没有权限访问该页面')
        next(false)

  }}
 )
export default router