<template>
	<el-container>
		<el-header style='height: 6.25rem;'>Header</el-header>
		
		<el-container>
			<el-aside style='width: 12.5rem;'>
				<el-menu  unique-opened>
					<el-submenu  v-for="(item,index) in options"  :index="''+(index+1)">
						<template slot='title'><i :class="item.icon"></i>{{item.text}}</template>
						<el-menu-item @click='goNav($event)' :data-path='item1.path' v-for="(item1,index1) in item.children" :index="''+(index+1)+''+'-'+(index1+1)">{{item1.text}}</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-main>
				<keep-alive :include="['accountAdmin']">	
					<router-view/>
				</keep-alive>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	import accountAdmin from '@/components/accountAdmin.vue'
	import accountOperation from '@/components/accountOperation.vue'
	
	export default{
		name:'index',
		components: { accountOperation, accountAdmin},
		data() {
			return {
				options: [
					{
						"icon":"el-icon-document",
						"text":"内容管理",
						"children":[
							{"text":"banner管理","path":'/banner'},
						],
					},
					{
						"icon":"el-icon-tickets",
						"text":"商品管理",
						"children":[
							{"text":"商品管理"},
							{"text":"品类管理"},
						],
					},
					{
						"icon":"el-icon-goods",
						"text":"订单管理",
						"children":[
							{"text":"商品订单" , "path":'/goodsOrder'},
							{"text":"购买会员订单"},
						],
					},
					{
						"icon":"el-icon-service",
						"text":"服务单管理",
						"children":[
							{"text":"免租金开店"},
							{"text":"外卖运营"},
						],
					},
					{
						"icon":"el-icon-news",
						"text":"营销管理",
						"children":[
							{"text":"0元抢购"},
							{"text":"邀请"},
						],
					},
					{
						"icon":"el-icon-star-off",
						"text":"会员管理",
						"children":[
							{"text":"会员管理"},
						],
					},
					{
						"icon":"el-icon-sort",
						"text":"财务管理",
						"children":[
							{"text":"商户余额账户"},
							{"text":"商户分享金账户"},
							{"text":"商户竞价账户"},
							{"text":"总部账户"},
						],
					},
					{
						"icon":"el-icon-view",
						"text":"人员管理",
						"children":[
							{"text":"账号管理","path":'/accountAdmin'},
							{"text":"角色管理"},
						],
					},	
				],
				code :''
			}
		},
		mounted:function(){
			
		},
		methods: {
			goNav:function(event){
				console.log(event.$el.dataset.path)
				this.$router.push({path:event.$el.dataset.path})
			}
		},
	}
</script>

<style scoped>
	.el-header{
		background-image: linear-gradient(-77deg, #5E8DFF 0%, #75BAFB 99%);
		height: 6.25rem;
	}
	.el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 6.25rem;
	}
	  
	.el-aside {
		background-color: #fff;
		color: #333;
		text-align: center;
		line-height: 200px;
		height: calc(100vh - 6.25rem);
		width: 200px;
	}
  
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		/* line-height: 160px; */
	}
  
	body > .el-container {
		margin-bottom: 40px;
	}
	.el-submenu{
		text-align: left;
	}
	
	/* .is-opened div{
		color: #409EFF;
	} */
	/* .el-submenu__title{
		color: #409EFF;
	} */
  
</style>