import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import login from '@/components/login.vue'
import index from '@/components/index.vue'
import banner from '@/components/banner.vue'
import accountAdmin from '@/components/accountAdmin.vue'

Vue.use(Router)
Vue.use(ElementUI)

const router = new Router({
	routes: [
		{
			name:"login",
			path:"/",
			component:login
		},
		{
			name:'index',
			path:'/index',
			component:index,
			// redirect: {name: 'banner'}, // 跳转到下一级第一个
			children:[
				{
					name:'banner',
					path:'/banner',
					component:banner
				},
				{
					name:'accountAdmin',
					path:'/accountAdmin',
					component:accountAdmin
				}
			]
		}
	]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
	var localStorage=window.localStorage;
	if(localStorage.islogin){	 //登录了 正常
		next()
	}
	else{		//没登陆
		//避免死循环
		if(to.path !== '/'){    //如果即将要进入的不是登录
			next('/')			//进入登录
		}
		else{
			next()
		}
	}
	// to: Route: 即将要进入的目标 路由对象
	// from: Route: 当前导航正要离开的路由
	// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
	
});


export default router
 