<template>
  <div id="app">
    
	<el-container>
		<el-header>Header</el-header>
		<el-container>
			<el-aside width="200px">
				<el-menu :default-openeds="['1']" unique-opened>
					<el-submenu  v-for="(item,index) in options"  :index="''+(index+1)">
						<template slot='title'><i :class="item.icon"></i>{{item.text}}</template>
						<el-menu-item v-for="(item1,index1) in item.children" :index="''+(index+1)+''+'-'+(index1+1)">{{item1.text}}</el-menu-item>
					</el-submenu>
					<div>{{code}}</div>
				</el-menu>
			</el-aside>
			<el-main>
				<router-view/>
			</el-main>
		</el-container>
	</el-container>

		
  
  </div>
</template>

<script>

export default {
  name: 'App',
	data() {
		return {
			options: [
				{
					"icon":"el-icon-message",
					"text":"内容管理",
					"children":[
						{"text":"banner管理"},
					],
				},
				{
					"icon":"el-icon-message",
					"text":"商品管理",
					"children":[
						{"text":"商品库"},
						{"text":"品类管理"},
					],
				},
				{
					"icon":"el-icon-message",
					"text":"订单管理",
					"children":[
						{"text":"商品订单"},
						{"text":"商品订单"},
					],
				},
				{
					"icon":"el-icon-message",
					"text":"服务单管理",
					"children":[
						{"text":"免租金开店"},
						{"text":"外卖运营"},
					],
				},
				{
					"icon":"el-icon-message",
					"text":"营销管理",
					"children":[
						{"text":"0元抢购"},
					],
				},
				{
					"icon":"el-icon-message",
					"text":"会员管理",
					"children":[
						{"text":"会员管理"},
					],
				},
				{
					"icon":"el-icon-message",
					"text":"账号管理",
					"children":[
						{"text":"账号管理"},
					],
				},
				{
					"icon":"el-icon-message",
					"text":"角色管理",
					"children":[
						{"text":"角色管理"},
					],
				},
				{
					"icon":"el-icon-message",
					"text":"财务管理",
					"children":[
						{"text":"用户余额账户"},
						{"text":"用户分享金账户"},
						{"text":"用户竞价账户"},
						{"text":"总部账户"},
					],
				},
			],
			code :''
		}
	},
	mounted:function(){

	},
}
</script>

<style>
  #app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
  }
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
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
  
</style>
