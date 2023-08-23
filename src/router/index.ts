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
          meta: {
            isLogin: true
          },
          children: [
            {
              path: '',
              name: 'team',
              component: () => import('../views/main/TeamView.vue'),
              children: [
                {
                  path: '',
                  name: 'itemlist',
                  component: () => import('../views/project/ItemList.vue')
                },
                {
                  path: '/setting',
                  name: 'setting',
                  component: () => import('../views/project/Setting.vue')
                }
              ]
            },
            {
              path: '/project',
              name: 'project',
              component: () => import('../views/main/ProjectView.vue'),
              children: [
                {
                  path: '/interface/:title',
                  name: 'interface',
                  component: () => import('../views/main/InterfaceView.vue')
                  // children: [
                  //   {
                  //     path: '/perview',
                  //     name: 'preview',
                  //     component: () => import('../views/interface/PreviewView.vue')
                  //   },
                  //   {
                  //     path: '/edit',
                  //     name: 'edit',
                  //     component: () => import('../views/interface/Edit.vue')
                  //   },
                  //   {
                  //     path: '/running',
                  //     name: 'running',
                  //     component: () => import('../views/interface/Running.vue')
                  //   }
                  // ]
                },
                {
                  path: '/interfacelist',
                  name: 'interfacelist',
                  component: () => import('../views/interface/InterfaceList.vue')
                }
              ]
            },
            {
              path: '/personalspace',
              name: 'personalspace',
              component: () => import('../views/user/Personal.vue')
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        isLogin: false
      }
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('../views/RegistView.vue'),
      meta: {
        isLogin: false
      }
    },
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
