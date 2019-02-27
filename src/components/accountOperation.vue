<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{ path: '/accountAdmin' }">账号管理</el-breadcrumb-item>
			<el-breadcrumb-item>{{BreadcrumbText}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-position='left' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="姓名" prop="name">
				<el-input :disabled="type==0" placeholder="请输入姓名" maxLength='20' v-model="ruleForm.name" clearable></el-input>
			</el-form-item>
			<el-form-item label="手机号码" prop="phone">
				<el-input :disabled="type==0" placeholder="请输入手机号码" maxLength='11' v-model="ruleForm.phone" clearable></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input :disabled="type==0" placeholder="请输入密码" maxLength='12' v-model="ruleForm.password" clearable></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio-group :disabled="type==0" v-model="ruleForm.status">
					<el-radio label="启用"></el-radio>
					<el-radio label="停用"></el-radio>
				</el-radio-group>
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
				<el-button v-if='type!=0' type="primary" @click="submitForm('ruleForm')">{{type==1?"保存":"立即添加"}}</el-button>
				<el-button v-if='type!=0' @click="resetForm('ruleForm')">{{type==1?"取消":"重置"}}</el-button>
				<el-button v-if='type==0' type='primary' @click='back'>返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'accountOperation',
		data() {
			return {
				BreadcrumbText: '',
				type: '',
				id:"",
				ruleForm: {
					name: '',
					phone: '',
					password: '',
					type: [],
					status: '',

				},			
				rules: {
					name: [{
							required: true,
							message: '请输入姓名',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 位',
							trigger: 'blur'
						}
					],
					phone: [{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '手机号码格式不正确',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 6 到 12 位,可以是大写字母,小写字母,数字,一种或多种',
							trigger: 'blur'
						}
					],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					status: [{
						required: true,
						message: '请选择一种账号状态',
						trigger: 'change'
					}],
				}
			}
		},
		mounted: function() {
			this.type = this.$route.query.type
			switch (Number(this.$route.query.type)) {
				case 0: //查看
					this.BreadcrumbText = '查看'
					this.loadPersonDetail()
					break;
				case 1: //编辑
					this.BreadcrumbText = '编辑'
					this.loadPersonDetail()
					break;
				case 2: //添加
					this.BreadcrumbText = '添加'
					break;
			}
		},
		methods: {
			
			//提交表单,(保存和添加)
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log(this.ruleForm.status)
						var localStorage = window.localStorage
						var isEnabled = 0
						if(this.ruleForm.status == '启用'){
							isEnabled = 1
						}
						else{
							isEnabled = 0
						}
						if(Number(this.type) == 1){
							
							var userForm = {"isEnabled":isEnabled,"name": this.ruleForm.name,"password":this.ruleForm.password,"mobile":this.ruleForm.phone,"id":this.id}
							var url = '/mgr/user/edit?accessToken='+localStorage.accessToken
							//复杂的表单提交用封装的ajax,而不用axios
							this.$ajax.post(url,userForm).then(res=>{
								if(res.code == 200){
									this.$alert.success('编辑成功')
									setTimeout(()=>{
										this.$router.back(-1)
									},1500)
								}
							})
							
						}
						else{
							var userForm = {"isEnabled":isEnabled,"name":this.ruleForm.name,"password":this.ruleForm.password,"mobile":this.ruleForm.phone}
							var url = '/mgr/user/add?accessToken='+localStorage.accessToken
							this.$ajax.post(url,userForm).then(res=>{
								if(res.code == 200){
									this.$alert.success('添加成功')
									setTimeout(()=>{
										this.$router.back(-1)
									},1500)
								}
							})
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
				this.$router.back(-1)
			},
			
			loadPersonDetail:function(){
				var localStorage=window.localStorage;
				this.axios.post('/mgr/user/detail',{"accessToken":localStorage.accessToken,"mgrUid":this.$route.query.id}).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						this.ruleForm.name = res.data.data.name
						this.ruleForm.phone = res.data.data.mobile
						this.ruleForm.password = res.data.data.password
						this.id = res.data.data.id
						if(Number(res.data.data.isEnabled) == 1){
							this.ruleForm.status = '启用'
						}
						else{
							this.ruleForm.status = '停用'
						}
					}
				})
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
