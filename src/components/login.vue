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
				<el-input maxlength='6' clearable placeholder="请输入验证码" v-model="code" class="input-with-select">
					<el-button slot="append" :disabled="getCodeText!=='获取验证码'" @click="getCode" >{{getCodeText}}</el-button>
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
			this.$store.state.login.islogin = true
		},
		methods: {
			login:function() {
				if(!(/^1[34578]\d{9}$/.test(this.phone))){
					this.$alert.error('手机号码格式不正确')
				}
				else if(this.code.length<6){
					this.$alert.error('验证码格式不正确')
				}
				else{
					console.log(this.$store.state.login.islogin)
					
					return
					this.axios.post('/mgr/login/mobile',{"smsCode":this.code , 'mobile':this.phone}).then(res=>{
						
						if(res.data.code == 200){
							
						}
						else{
							this.$alert.error(res.data.msg)
						}
					})
				}
			},
			
			getCode:function(){
				if(!(/^1[34578]\d{9}$/.test(this.phone))){ 
					this.$alert.error('手机号码格式不正确')
				}
				else{
					this.axios.get('/mgr/sms/auth?mobile='+this.phone).then(res=>{
						console.log(res)
						if(res.data.code == 200){
							for (let i = 60; i >= 0; i--) {
							  setTimeout(() => {
								// console.log(i)
								this.getCodeText = i + "S"		
								if (i == 0) {
								  this.getCodeText = '获取验证码'
								}
							  }, 1000 * (60 - i))
							}
						}
					})
				}
			}
		},
	}
</script>

<style scoped>
	.shade{
		background: url(../assets/img/login/bg.png) no-repeat;
		background-size: 100% 100%;
		/* background-size: cover; */
		/* background-position: center; */
		/* opacity: 0.5; */
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
