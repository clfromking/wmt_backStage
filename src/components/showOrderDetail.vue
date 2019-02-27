<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item :to="{ path: BreadcrumbUrl }">{{BreadcrumbText}}</el-breadcrumb-item>
				<el-breadcrumb-item>查看</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="detail">
				<span>订单编号：</span>
				<span>{{orderId}}</span>
				<span>手机号：</span>
				<span>{{phone}}</span>
				<span>下单时间：</span>
				<span>{{startTime}}</span>
				<span>支付时间：</span>
				<span>{{endTime}}</span>
			</div>
			
		</div>
		<div class="body">
			
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
	</div>
</template>

<script>
	export default {
		name: 'showOrderDetail',
		data() {
			return {
				BreadcrumbText: '',
				BreadcrumbUrl:'',
				orderId:'20190118140296062001',
				phone:'',
				startTime:'',
				endTime:'',
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
				case 0: //商品订单
					this.BreadcrumbText = '商品订单'
					this.BreadcrumbUrl = '/goodsOrder'
					this.loadOrderDetail()
					break;
				case 1: //购买会员订单
					this.BreadcrumbText = '购买会员订单'
					this.loadOrderDetail()
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
			
			loadOrderDetail:function(){
				var localStorage=window.localStorage;
				this.axios.post('/mgr/order/item',{"accessToken":localStorage.accessToken,"orderId":this.$route.query.orderId}).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						
					}
				})
			},
		}
	}
</script>

<style scoped>
	.header {
		height: 229px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
	}
	.body {
		min-height: 491px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 0 54px 50px;
		/* margin-top: 21px; */
		box-sizing: border-box;
	}

	.el-breadcrumb {
		padding-top: 36px;
		padding-left: 50px;
		text-align: left;
		font-size: 16px;
		color: #5d5d5d;
		
	}

	.el-form {
		text-align: left;
		margin-top: 21px;
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
	
	.detail{
		margin-top: 51px;
		text-align: left;
		padding-left: 50px;
	}
</style>
