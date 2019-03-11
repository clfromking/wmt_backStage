<template>
	<div>
		<div class="shade"></div>
		<div class="login_div">
			<div class="title">
				<div @click="selectLoginType($event)" data-id='0' :class="selectIndex==0?'isSelect':''">手机密码登录</div>
				<!-- <img :src="src"> -->
				<div @click="selectLoginType($event)" data-id='1' :class="selectIndex==1?'isSelect':''">手机验证码登录</div>
			</div>
			<div class="login_container">
				<div v-show="selectIndex==0">
					<el-input
					  placeholder="请输入手机号"
					  v-model="phone"
					  clearable
					  maxlength='11'
					  class="phone">
					</el-input>	
					<el-input maxlength='20' clearable placeholder="请输入密码" v-model="password" class="input-with-select">
					</el-input>
					<div class="imgCodeDiv clear">
						<el-input maxlength='4' clearable placeholder="请输入图形验证码" v-model="imgCode0" class="input-with-select imgCodeInput fl">
						</el-input>
						<img :src="src" class="imgCode fl" alt="">
					</div>
					
					<el-button @click="passwordLogin" plain class='login_btn' type="primary">登录</el-button>
				</div>
				<div v-show="selectIndex==1">
					<el-input
					  placeholder="请输入手机号"
					  v-model="phone1"
					  clearable
					  maxlength='11'
					  class="phone">
					</el-input>	
					<el-input maxlength='6' clearable placeholder="请输入验证码" v-model="code" class="input-with-select">
						<el-button slot="append" :disabled="getCodeText!=='获取验证码'" @click="getCode" >{{getCodeText}}</el-button>
					</el-input>
					<div class="imgCodeDiv clear">
						<el-input maxlength='4' clearable placeholder="请输入图形验证码" v-model="imgCode1" class="input-with-select imgCodeInput fl">
						</el-input>
						<img :src="src" class="imgCode fl" alt="">
					</div>
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
				src:'',
				imgCode0:'',		//账号密码登录的图形码
				imgCode1:'',		//验证码登录的图形码		
			}
		},
		mounted(){
			var localStorage=window.localStorage;
			if(localStorage.islogin){
				this.$router.push({path:'/index'})
				return
			}
			this.getImgCode()
			
			
		},
		methods: {
			//选择登录方式
			selectLoginType:function(e){
				this.phone = ''
				this.phone1 = ''
				this.password = ''
				this.code = ''
				this.imgCode0 = ''
				this.imgCode1 = ''
				this.selectIndex = e.target.dataset.id
				
				this.getImgCode()
			},
			
			//密码登录按钮事件
			passwordLogin:function(){
				if(!(/^1[34578]\d{9}$/.test(this.phone))){
					this.$alert.error('手机号码格式不正确')
				}
				else if(this.password.length<=0){
					this.$alert.error('密码不能为空')
				}
				else if(this.imgCode0.length<4){
					this.$alert.error('图形验证码格式不正确')
				}
				else{
					this.axios.post('/mgr/login/pwd',{"pwd":this.password , 'mobile':this.phone , "authCode":this.imgCode0}).then(res=>{
						if(res.data.code == 200){
							console.log(res.data.data)
							this.$alert.success('登录成功')
							this.$store.state.roles = res.data.data.powers
							setTimeout(()=>{
								var localStorage=window.localStorage;
								localStorage.accessToken = res.data.data.accessToken
								localStorage.islogin = true
								localStorage.name  = res.data.data.name
								this.$router.push({path:'/index'})
							},1500)
						}
						else if(res.data.code == 400){
							this.$alert.error(res.data.msg)
							this.getImgCode()
						}
						else{
							this.$alert.error(res.data.msg)
						}
					})
				}
			},
			
			//验证码登录按钮事件
			codeLogin:function() {		
				// console.log(this.phone1)
				if(!(/^1[34578]\d{9}$/.test(this.phone1))){
					this.$alert.error('手机号码格式不正确')
				}
				else if(this.code.length<6){
					this.$alert.error('验证码格式不正确')
				}
				else if(this.imgCode1.length<4){
					this.$alert.error('图形验证码格式不正确')
				}
				else{
					this.axios.post('/mgr/login/mobile',{"smsCode":this.code , 'mobile':this.phone1 ,'authCode':this.imgCode1}).then(res=>{
						if(res.data.code == 200){
							console.log(res.data.data)
							this.$store.state.roles = res.data.data.powers
							this.$alert.success('登录成功')
							setTimeout(()=>{
								var localStorage=window.localStorage;
								localStorage.accessToken = res.data.data.accessToken
								localStorage.name  = res.data.data.name
								localStorage.islogin = true
								this.$router.push({path:'/index'})
							},1500)
						}
						else if(res.data.code == 400){
							this.$alert.error(res.data.msg)
							this.getImgCode()
						}
						else{
							this.$alert.error(res.data.msg)
						}
					})
				}
			
			},
			
			//获取验证码
			getCode:function(){
				if(!(/^1[34578]\d{9}$/.test(this.phone1))){ 
					this.$alert.error('手机号码格式不正确')
				}
				else{
					this.axios.get('/mgr/sms/auth?mobile='+this.phone1).then(res=>{
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
			},
			
			getImgCode:function(){
				this.axios.get('/mgr/img/code',{responseType: 'arraybuffer'}).then(res=>{
					console.log(res.data)
					this.src = 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
				})
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
		height: 400px;
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
		margin: 3vh auto 2vh;
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
	
	.imgCodeDiv{
		height: 40px;
		width: 15vw;
		margin: 2vh auto;
	}
	.imgCodeInput{
		width: 10.95vw;
		text-align: left;
		vertical-align: top;
		
	}
	/* .el-input:nth-child(3){
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	} */
	.imgCode{
		width: 4.05vw;
		height: 40px;
	}
</style>
