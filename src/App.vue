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
					"text":"系统首页",
					"children":[
						{"text":"选项1"},
						{"text":"选项2"},
						{"text":"选项3"}
					],
				},
				{
					"icon":"el-icon-message",
					"text":"订单管理",
					"children":[
						{"text":"选项1"},
						{"text":"选项2"},
					],
				},
				{"icon":"el-icon-message","text":"业务管理"},
				{"icon":"el-icon-message","text":"外卖运营管理"},
				{"icon":"el-icon-message","text":"会员管理"}
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
