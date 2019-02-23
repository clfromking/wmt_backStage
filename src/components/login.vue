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
				  placeholder="请输入手机号"
				  v-model="phone"
				  clearable
				  maxlength='11'
				  class="phone">
				</el-input>	
				<el-input clearable placeholder="请输入验证码" v-model="code" class="input-with-select">
					<el-button slot="append" @click="getCode" type="primary">{{getCodeText}}</el-button>
				</el-input>
				<el-button @click="login" plain class='login_btn' type="primary">登录</el-button>
				

				<div id="myChart" :style="{width: '300px', height: '300px'}"></div>


			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'login',
		
		data() {
			return {
				phone :'',
				code :'',
				getCodeText:'获取验证码'
			}
		},
		mounted(){

		},
		methods: {
			login:function() {
				console.log(this.phone)
				console.log(this.code)
			},
			
			getCode:function(){
				console.log(this.phone)
				var phone = this.phone
				if(!(/^1[34578]\d{9}$/.test(phone))){ 
					this.$alert.error('错误','手机号码格式不正确',false)
				}
				else{
					this.axios.get('/mgr/sms/auth?mobile='+this.phone).then(res=>{
						console.log(res)
					})
				}
			}
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
