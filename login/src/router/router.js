import { createRouter,createWebHashHistory } from "vue-router";
import login from '../views/login.vue'
import register from '../views/register.vue'
import Administrator from '@/views/Administrator.vue';
import S1 from '@/views/S1.vue';
import S2 from '@/views/S2.vue';
import S3 from '@/views/S3.vue';
import S4 from '@/views/S4.vue';

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/",
            redirect:"/login"
        },
        {//登录界面
            path:"/login",
            name:"login",
            component:login
        },
        {//注册界面
            path:"/register",
            name:"register",
            component:register
        },
        {
            path: "/administrator",
            name: "Administrator",
            component: Administrator,
          },
          {
            path: "/main_information",
            name: "S1",
            component: S1,
          },
          {
            path: "/underwater_system",
            name: "S2",
            component: S2,
          },
          {
            path: "/data_center",
            name: "S3",
            component: S3,
          },
          {
            path: "/ai_center",
            name: "S4",
            component: S4,
          },
    ]
});

export default router;