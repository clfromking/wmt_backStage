<template>
	<div>
		<div class="shade"></div>
		<div class="login_div">
			<div class="title">
				<div>快速登录</div>
				<div>手机验证码登录</div>
			</div>
			<div class="login_container">
				<el-input
				  placeholder="请输入内容"
				  v-model="phone"
				  clearable
				  class="phone">
				</el-input>	
				<el-input clearable placeholder="请输入内容" v-model="code" class="input-with-select">
					<el-button slot="append"  type="primary">输入验证码</el-button>
				</el-input>
				<el-button @click="login" class='login_btn' type="primary">登录</el-button>
				

				<!-- <div id="myChart" :style="{width: '300px', height: '300px'}"></div> -->


			</div>
		</div>
	</div>
</template>

<script>
	// 引入基本模板
	// let echarts = require('echarts/lib/echarts')
	// 引入柱状图组件
	// require('echarts/lib/chart/bar')
	// 引入提示框和title组件
	// require('echarts/lib/component/tooltip')
	// require('echarts/lib/component/title')
	export default{
		name:'login',
		data() {
			return {
				phone :'',
				code :''
			}
		},
		mounted(){
			// this.drawLine();
		},
		methods: {
			login:function() {
				console.log(this.phone)
				console.log(this.code)
			},
// 			drawLine() {
// 			  // 基于准备好的dom，初始化echarts实例
// 			  let myChart = echarts.init(document.getElementById('myChart'))
// 			  // 绘制图表
// 			  myChart.setOption({
// 				title: { text: 'ECharts 入门示例' },
// 				tooltip: {},
// 				xAxis: {
// 				  data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
// 				},
// 				yAxis: {},
// 				series: [{
// 				  name: '销量',
// 				  type: 'bar',
// 				  data: [5, 20, 36, 10, 10, 20]
// 				}]
// 			  });
// 			}
		},
	}
</script>

<style scoped>
	.shade{
		background: #000000;
		opacity: 0.5;
		height: 100vh;
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
	}
	.login_div{
		width: 500px;
		height: 500px;
		background: #fff;
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		border-radius: 10px;
	}
	.title{
		height: 100px;
		background: #0000FF;
		display: flex;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.title div{
		width: 100%;
		height: 100%;
		text-align: center;
		color: #fff;
		line-height: 100px;
		cursor: pointer;
	}
	.login_container{
		height: 400px;
		/* background: red; */
	}
	.phone{
		width: 300px;
		margin: 80px auto 40px;
	}
	.input-with-select{
		width: 300px;
	}
	.login_btn{
		display: block;
		margin: 50px auto;
	}
</style>
