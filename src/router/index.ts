import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LayoutView from '../views/Layout.vue'
import HomeView from '@/views/main/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: LayoutView,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView,
          meta:{
            isLogin:true
          },
          children:[        {
            path: '/interface',
            name: 'interface',
            component: () => import('../views/main/InterfaceView.vue')
          },
          {
            path: '',
            name: 'project',
            component: () => import('../views/main/ProjectView.vue')
          }]
        },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta:{
        isLogin:false
      }
    }
  ]
})
// import {useUserStore} from '../stores/index'
// const store = useUserStore()
// router.beforeEach((to,from,next)=>{
//   console.log(to.meta)
//   if(to.meta.isLogin){
//       let token = store.token;
//       if(token){
//           next();
//       }else{
//           next({
//               name:'login'
//           })
//       }
//   }else{
//       next();
//   }
// })
export default router
