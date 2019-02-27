<template>
	<div>
		<div class="shade"></div>
		<div class="login_div">
			<div class="title">
				<div @click="selectLoginType($event)" data-id='0' :class="selectIndex==0?'isSelect':''">手机密码登录</div>
				<div @click="selectLoginType($event)" data-id='1' :class="selectIndex==1?'isSelect':''">手机验证码登录</div>
			</div>
			<div class="login_container">
				<div v-show="selectIndex==0">
					<el-input
					  placeholder="请输入手机号"
					  v-model="phone1"
					  clearable
					  maxlength='11'
					  class="phone">
					</el-input>	
					<el-input maxlength='6' clearable placeholder="请输入密码" v-model="password" class="input-with-select">
					</el-input>
					<el-button @click="passwordLogin" plain class='login_btn' type="primary">登录</el-button>
				</div>
				<div v-show="selectIndex==1">
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
					<el-button @click="codeLogin" plain class='login_btn' type="primary">登录</el-button>
				</div>
				
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
				phone1 : '',
				password :'',
				code :'',
				getCodeText:'获取验证码',
				selectIndex:0,
			}
		},
		mounted(){
			var localStorage=window.localStorage;
			if(localStorage.islogin){
				this.$router.push({path:'/index'})
			}
			
		},
		methods: {
			//选择登录方式
			selectLoginType:function(e){
				this.selectIndex = e.target.dataset.id
			},
			
			//密码登录按钮事件
			passwordLogin:function(){
				if(!(/^1[34578]\d{9}$/.test(this.phone1))){
					this.$alert.error('手机号码格式不正确')
				}
				else if(this.code.length<=0){
					this.$alert.error('密码不能为空')
				}
				else{
					this.axios.post('/mgr/login/mobile',{"smsCode":this.code , 'mobile':this.phone}).then(res=>{
						if(res.data.code == 200){
							console.log(res.data.data)
							this.$alert.success('登录成功')
							setTimeout(()=>{
								var localStorage=window.localStorage;
								localStorage.accessToken = res.data.data.accessToken
								localStorage.islogin = true
								this.$router.push({path:'/index'})
							},1500)
						}
						else{
							this.$alert.error(res.data.msg)
						}
					})
				}
			},
			
			//验证码登录按钮事件
			codeLogin:function() {		
				if(!(/^1[34578]\d{9}$/.test(this.phone))){
					this.$alert.error('手机号码格式不正确')
				}
				else if(this.code.length<6){
					this.$alert.error('验证码格式不正确')
				}
				else{
					this.axios.post('/mgr/login/mobile',{"smsCode":this.code , 'mobile':this.phone}).then(res=>{
						if(res.data.code == 200){
							console.log(res.data.data)
							this.$alert.success('登录成功')
							setTimeout(()=>{
								var localStorage=window.localStorage;
								localStorage.accessToken = res.data.data.accessToken
								localStorage.islogin = true
								this.$router.push({path:'/index'})
							},1500)
						}
						else{
							this.$alert.error(res.data.msg)
						}
					})
				}
			
			},
			
			//获取验证码
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
		background-size: cover;
		background-position: center;
		/* opacity: 0.5; */
		height: 100%;
		width: 100%;
		min-width: 1200px;
		position: fixed;
		top: 0;
		left: 0;
	}
	.login_div{
		width: 20%;
		height: 50%;
		background: #fff;
		position: fixed;
		top: 30%;
		bottom: 0;
		right: 8%;
		/* left: 0; */
		/* margin: auto; */
		border-radius: 10px;
	}
	.title{
		height: 10vh;
		/* background: #0000FF; */
		display: flex;
		color: #000;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
	.title div{
		width: 100%;
		height: 100%;
		text-align: center;
		color: #000;
		line-height: 10vh;
		cursor: pointer;
		font-size: .8rem;
	}
	.login_container{
		height: 40vh;
		/* background: red; */
	}
	.phone{
		width: 15vw;
		margin: 5vh auto 4vh;
	}
	.input-with-select{
		width: 15vw;
	}
	.login_btn{
		display: block;
		width: 15vw;
		margin: 4vh auto;
	}
	
	
	.isSelect{
		border-bottom: 3px solid #0000FF;
		box-sizing: border-box;
	}
	
	
</style>
