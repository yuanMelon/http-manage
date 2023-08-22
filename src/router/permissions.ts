import router from './index'
import pinia from '@/stores/store'
// import {useUserStore} from '../stores/index'
import {useUserStore} from '../stores/useuser'
const store = useUserStore(pinia)
router.beforeEach((to,from,next)=>{
    console.log(to,from)
    if(to.meta.isLogin){
        console.log(to.meta)
        let token = store.token;
        if(token){
            next();
        }else{
            next({
                name:'login'
            })
        }
    }else{
        console.log('islogin = false')
        next();
    }
})