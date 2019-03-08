<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item>修改密码</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-position='left' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
			<el-form-item label="原密码" prop="password">
				<el-input  placeholder="请输入原密码" type='password' maxLength='12' v-model="ruleForm.password" clearable></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newpassword">
				<el-input  placeholder="请输入新密码" type='password' maxLength='20' v-model="ruleForm.newpassword" clearable></el-input>
			</el-form-item>
			<el-form-item label="再次输入新密码" prop="confirm">
				<el-input  placeholder="请输入密码" type='password' maxLength='11' v-model="ruleForm.confirm" clearable></el-input>
			</el-form-item>
			<!-- <el-form-item label="角色" prop="type">
				<el-checkbox-group v-model="ruleForm.type">
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox><br>
					<el-checkbox label="地推活动" name="type"></el-checkbox><br>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox><br>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox><br>
					<el-checkbox label="地推活动" name="type"></el-checkbox><br>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox><br>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
					<el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox><br>
					<el-checkbox label="地推活动" name="type"></el-checkbox><br>
					<el-checkbox label="线下主题活动" name="type"></el-checkbox><br>
					<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
				</el-checkbox-group>
			</el-form-item> -->
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
				<el-button type='' @click='back'>返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'changePassword',
		data() {
			return {
				ruleForm: {
					password: '',
					newpassword: '',
					confirm: '',
					
				},			
				rules: {
					newpassword: [{
							required: true,
							message: '请输入新密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 位,可以是大写字母,小写字母,数字,一种或多种',
							trigger: 'blur'
						}
					],
					confirm: [{
							required: true,
							message: '请输入确认密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 位,可以是大写字母,小写字母,数字,一种或多种',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入原密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 位,可以是大写字母,小写字母,数字,一种或多种',
							trigger: 'blur'
						}
					],
				}
			}
		},
		mounted: function() {
			
		},
		methods: {
			
			//提交表单,(保存和添加)
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// console.log(this.ruleForm.newpassword.replace(/\s+/g, ""))
						if(this.ruleForm.newpassword.replace(/\s+/g, "") == this.ruleForm.confirm.replace(/\s+/g, "")){
							var postData = {
								oldPass:this.ruleForm.password,
								newPass:this.ruleForm.newpassword,
								checkPass:this.ruleForm.confirm,
								accessToken:window.localStorage.accessToken
							}
							this.axios.post('/mgr/user/pass/modify',postData).then(res=>{
								if(res.data.code == 200){
									this.$alert.success('修改成功')
									setTimeout(()=>{
										this.$router.push({path:'/'})
									},1500)
								}
							})
						}
						else{
							this.$alert.error('两次密码不一致，请核对后重新提交')
						}
					} 
					else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			
			//重置表单
			resetForm(formName) {
				if(Number(this.type) == 1){
					this.$router.back(-1)
				}
				else{
					this.$refs[formName].resetFields();
				}
				
			},
			
			back:function(){
				this.$router.push({path:'/'})
			},
			
			
		}
	}
</script>

<style scoped>
	.body {
		min-height: 720px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 0 54px 50px;
		/* margin-top: 21px; */
		box-sizing: border-box;
	}

	.el-breadcrumb {
		padding-top: 46px;
		/* padding-left: 50px; */
		text-align: left;
		font-size: 16px;
		color: #5d5d5d;
	}

	.el-form {
		text-align: left;
		margin-top: 50px;
	}

	.el-input {
		/* display: inline-block; */
		width: 12.5rem;
		/* margin-left: 50px; */
	}

	.el-form-item {
		margin-bottom: 44px;
	}

	.el-checkbox {
		/* display: block; */
	}

	.el-checkbox-group {
		max-height: 200px;
		overflow-y: auto;
		display: inline-block;
		width: 14.5rem;
		box-sizing: border-box;
	}
</style>
