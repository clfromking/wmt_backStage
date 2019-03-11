import Vue from 'vue'
import Router from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//登录
import login from '@/components/login.vue'
//首页
import index from '@/components/index.vue'
//banner管理
import banner from '@/components/banner.vue'
import bannerOperation from '@/components/bannerOperation.vue'
//商品管理
import goodsAdmin from '@/components/goodsAdmin.vue'
import goodsOperation from '@/components/goodsOperation.vue'
//订单管理 （商品订单部分）
import goodsOrder from '@/components/goodsOrder.vue'
import showOrderDetail from '@/components/showOrderDetail.vue'
//
//订单管理（购买会员订单部分）
import memberOrder from '@/components/memberOrder.vue'
import showMemberOrderDetail from '@/components/showMemberOrderDetail.vue'
//
//会员管理
import memberAdmin from '@/components/memberAdmin.vue'
import setMemberCard from '@/components/setMemberCard.vue'
import editMemberCard from '@/components/editMemberCard.vue'
import examineMemberRecord from '@/components/examineMemberRecord.vue'
//
//服务单管理（订单管理）
import freeShop from '@/components/freeShop.vue'
import showFreeShopDetail from '@/components/showFreeShopDetail.vue'
//服务单管理（外卖运营）
import takeOutOperating	from '@/components/takeOutOperating.vue'
import showTakeOutDetail from '@/components/showTakeOutDetail.vue'
//营销管理 （0元）
import zero from '@/components/zero.vue'
import zeroOperation from '@/components/zeroOperation.vue'
//财务管理
import storeBalanceAccount from '@/components/storeBalanceAccount.vue'
import storeBalanceListDetail from '@/components/storeBalanceListDetail.vue'
import storeBalanceDetail from '@/components/storeBalanceDetail.vue'
import storeBiddingAccount from '@/components/storeBiddingAccount.vue'
import storeBiddingListDetail from '@/components/storeBiddingListDetail.vue'
import storeBiddingDetail from '@/components/storeBiddingDetail.vue'
import biddingPay from '@/components/biddingPay.vue'
import headAccount from '@/components/headAccount.vue'
import headAccountDetail from '@/components/headAccountDetail.vue'
import headAccountPay from '@/components/headAccountPay.vue'
//人员管理
import accountAdmin from '@/components/accountAdmin.vue'
import accountOperation from '@/components/accountOperation.vue'
import roleAdmin from '@/components/roleAdmin.vue'
import roleOperation from '@/components/roleOperation.vue'
//

//修改密码
import changePassword from '@/components/changePassword.vue'


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
					name:'bannerOperation',
					path:'/bannerOperation',
					component:bannerOperation
				},
				{
					name:'goodsAdmin',
					path:'/goodsAdmin',
					component:goodsAdmin
				},
				{
					name:'goodsOperation',
					path:'/goodsOperation',
					component:goodsOperation
				},
				{
					name:'goodsOrder',
					path:'/goodsOrder',
					component:goodsOrder
				},
				{
					name:'showOrderDetail',
					path:'/showOrderDetail',
					component:showOrderDetail
				},
				{
					name:'memberOrder',
					path:'/memberOrder',
					component:memberOrder
				},
				{
					name:'showMemberOrderDetail',
					path:'/showMemberOrderDetail',
					component:showMemberOrderDetail
				},
				{
					name:'freeShop',
					path:'/freeShop',
					component:freeShop
					
				},
				{
					name:'showFreeShopDetail',
					path:'/showFreeShopDetail',
					component:showFreeShopDetail
				},
				{
					name:'takeOutOperating',
					path:'/takeOutOperating',
					component:takeOutOperating
				},
				{
					name:'showTakeOutDetail',
					path:'/showTakeOutDetail',
					component:showTakeOutDetail
				},
				{
					name:'zero',
					path:'/zero',
					component:zero
				},
				{
					name:'zeroOperation',
					path:'/zeroOperation',
					component:zeroOperation
				},
				{
					name:'memberAdmin',
					path:'/memberAdmin',
					component:memberAdmin
				},
				{
					name:'setMemberCard',
					path:'/setMemberCard',
					component:setMemberCard
				},
				{
					name:'editMemberCard',
					path:'/editMemberCard',
					component:editMemberCard
				},
				{
					name:'examineMemberRecord',
					path:'/examineMemberRecord',
					component:examineMemberRecord
				},
				{
					name:'storeBalanceAccount',
					path:'/storeBalanceAccount',
					component:storeBalanceAccount
				},
				{
					name:'storeBalanceListDetail',
					path:'/storeBalanceListDetail',
					component:storeBalanceListDetail
				},
				{
					name:'storeBalanceDetail',
					path:'/storeBalanceDetail',
					component:storeBalanceDetail
				},
				{
					name:'storeBiddingAccount',
					path:'/storeBiddingAccount',
					component:storeBiddingAccount
				},
				{
					name:'storeBiddingListDetail',
					path:'/storeBiddingListDetail',
					component:storeBiddingListDetail
				},
				{
					name:'storeBiddingDetail',
					path:'/storeBiddingDetail',
					component:storeBiddingDetail
				},
				{
					name:'biddingPay',
					path:'/biddingPay',
					component:biddingPay
				},
				{
					name:'headAccount',
					path:'/headAccount',
					component:headAccount
				},
				{
					name:'headAccountDetail',
					path:'/headAccountDetail',
					component:headAccountDetail
				},
				{
					name:'headAccountPay',
					path:'/headAccountPay',
					component:headAccountPay
				},
				{
					name:'accountAdmin',
					path:'/accountAdmin',
					component:accountAdmin,
					meta: {
						keepAlive: true // 需要被缓存
					}
				},
				{
					name:'accountOperation',
					path:'/accountOperation',
					component:accountOperation
				},
				{
					name:'roleAdmin',
					path:'/roleAdmin',
					component:roleAdmin
				},
				{
					name:'roleOperation',
					path:'/roleOperation',
					component:roleOperation
				},
				{
					name:'changePassword',
					path:'/changePassword',
					component:changePassword
				},
			]
		}
	]
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
	var localStorage=window.localStorage;
	if(localStorage.islogin && localStorage.accessToken){	 //登录了 正常
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
 