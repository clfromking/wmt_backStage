<template>
	<el-container>
		<el-header style='height: 6.25rem;'>
			<div class="logo-div" style="display: inline-block;height: 6.25rem;width: 78px;">
				<img class="logo" src="../assets/img/all/logo.png" alt="">
			</div>
			<span class="title">外卖通总部管理系统</span>
			<el-dropdown  @command="handleCommand">
			  <span class="el-dropdown-link clear">
				<span style="display: inline-block;vertical-align: top;" class="left">{{name}}</span>
				
				<span class="left">
					<span class="point">·</span>
					<span class="point">·</span>
					<span class="point">·</span>
				</span>
				
			  </span>
			  <el-dropdown-menu slot="dropdown">
				<el-dropdown-item command='0'>修改密码</el-dropdown-item>
				<el-dropdown-item command='1' divided>退出登录</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</el-header>
		
		<el-container>
			
			<el-aside style='width: 12.5rem;'>
				<el-menu  :default-openeds="openeds" :default-active='openeds[1]'  unique-opened>
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
							{"text":"商品管理","path":'/goodsAdmin'},
							// {"text":"品类管理"},
						],
					},
					{
						"icon":"el-icon-goods",
						"text":"订单管理",
						"children":[
							{"text":"商品订单" , "path":'/goodsOrder'},
							{"text":"购买会员订单" ,'path':'/memberOrder'},
						],
					},
					{
						"icon":"el-icon-service",
						"text":"服务单管理",
						"children":[
							{"text":"免租金开店" , "path":'/freeShop'},
							{"text":"外卖运营" , 'path':'/takeOutOperating'},
						],
					},
					{
						"icon":"el-icon-news",
						"text":"营销管理",
						"children":[
							{"text":"0元抢购",'path':'/zero'},
						],
					},
					{
						"icon":"el-icon-star-off",
						"text":"会员管理",
						"children":[
							{"text":"会员管理","path":'/memberAdmin'},
						],
					},
					{
						"icon":"el-icon-sort",
						"text":"财务管理",
						"children":[
							{"text":"商户余额账户" , "path":'/storeBalanceAccount'},
							{"text":"商户竞价账户","path":"/storeBiddingAccount"},
							{"text":"总部账户","path":'/headAccount'},
						],
					},
					{
						"icon":"el-icon-view",
						"text":"人员管理",
						"children":[
							{"text":"账号管理","path":'/accountAdmin'},
							{"text":"角色管理","path":'/roleAdmin'},
						],
					},	
				],
				code :'',
				name:'',
				openeds:[],
			}
		},
		mounted:function(){
			this.name = window.localStorage.name||"未知"
			this.controlSelect()

		},
		methods: {
			goNav:function(event){
				console.log(event.$el.dataset.path)
				this.$router.push({path:event.$el.dataset.path})
			},
			
			controlSelect:function(){
				if(this.$route.path == '/banner'){
					this.openeds = ['1','1-1']
				}
				else if(this.$route.path == '/goodsAdmin' || this.$route.path == '/goodsOperation'){
					this.openeds = ['2','2-1']
				}
				else if(this.$route.path == '/goodsOrder' || this.$route.path == '/showOrderDetail'){
					this.openeds = ['3','3-1']
				}
				else if(this.$route.path == '/memberOrder' || this.$route.path == '/showMemberOrderDetail'){
					this.openeds = ['3','3-2']
				}
				else if(this.$route.path == '/memberAdmin' || this.$route.path == '/setMemberCard' || this.$route.path == '/editMemberCard' || this.$route.path == '/examineMemberRecord'){
					this.openeds = ['4','4-1']
				}
				else if(this.$route.path == '/freeShop' || this.$route.path == '/showFreeShopDetail'){
					this.openeds = ['5','5-1']
				}
				else if(this.$route.path == '/takeOutOperating' || this.$route.path == '/showTakeOutDetail'){
					this.openeds = ['5','5-2']
				}
				else if(this.$route.path == '/zero' || this.$route.path == '/zeroOperation'){
					this.openeds = ['6','6-1']
				}
				else if(this.$route.path == '/storeBalanceAccount' || this.$route.path == '/storeBalanceListDetail' || this.$route.path == '/storeBalanceDetail'){
					this.openeds = ['7','7-1']
				}
				else if(this.$route.path == '/storeBiddingAccount' || this.$route.path == '/storeBiddingListDetail' || this.$route.path == '/storeBiddingDetail' || this.$route.path == '/biddingPay'){
					this.openeds = ['7','7-2']
				}
				else if(this.$route.path == '/headAccount' || this.$route.path == '/headAccountDetail' || this.$route.path == '/headAccountPay'){
					this.openeds = ['7','7-3']
				}
				else if(this.$route.path == '/accountAdmin' || this.$route.path == '/accountOperation'){
					this.openeds = ['8','8-1']
				}
				else if(this.$route.path == '/roleAdmin' || this.$route.path == '/roleOperation'){
					this.openeds = ['8','8-2']
				}
				else if(this.$route.path == '/changePassword'){
					this.openeds = ['0','0']
				}
			},
		
			handleCommand:function(command) {
				if(Number(command) == 0){
					this.$router.push({path:'/changePassword'})
					this.openeds = ['0','0']
				}
				else{
					var options = { confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}
					this.$alert.showModal('确定要退出登录嘛？','提示',options).then(res=>{
						window.localStorage.clear()
						this.$alert.success('成功退出')
						setTimeout(()=>{
							this.$router.push({path:'/'})
						},1500)
					}).catch(error=>{
						console.log(error)
					})
				}
			},
			
// 			exitLogin:function(){
// 				alert(1)
// 				
// 			},
		},
	}
</script>

<style scoped>
	.el-header{
		background-image: linear-gradient(-77deg, #5E8DFF 0%, #75BAFB 99%);
		height: 6.25rem;
		text-align: left;
	}
	/* .el-header, .el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 6.25rem;
	} */
	  
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
	/* .header{
		text-align: center;
	} */
	.logo-div{
		position: relative;
		
	}
	.logo{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	.title{
		display: inline-block;
		height: 100%;
		line-height: 6.25rem;
		vertical-align: top;
		color: #fff;
		font-size: 20px;
		margin-left: 20px;
	}
	.name{
		
	}
	.el-dropdown{
		float: right;
		line-height: 6.25rem;
		margin-right: 10px;
	}
	.el-dropdown-link {
		cursor: pointer;
		color: #fff;
		font-size: 20px;
		display: inline-block;
		height: 6.25rem;
		vertical-align: top;
		line-height: 6.25rem;
	}
	.el-icon-arrow-down {
		font-size: 20px;
		
	}
	.el-dropdown-menu{
		width: 100px;
	}
	.point{
		position: relative;
		font-size: 30px;
	}
	.point:nth-child(1){
		top: -10px;
		right: -15px;
	}
	.point:nth-child(2){
		/* top: -10px; */
		right: 0.5px;
	}
	.point:nth-child(3){
		top: 10px;
		right: 16px;
	}
	.el-menu-item{
		text-align: left;
		padding-left: 54px !important;
	}
	/* .is-opened div{
		color: #409EFF;
	} */
	/* .el-submenu__title{
		color: #409EFF;
	} */
  
</style>