<template>
	<div class="body">
		
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{path:'/storeBiddingAccount'}">商户竞价账户</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path:'/storeBiddingListDetail?id='+this.$route.query.poiId}">账户详情</el-breadcrumb-item>
			<el-breadcrumb-item>竞价花费</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="allPrice">
			<span>账户余额：</span>
			<span>{{totalPrice}}</span>
		</div>
		
		<el-form label-position='left' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="竞价花费" prop="price">
				<el-input  placeholder="请输入竞价花费金额" maxLength='20' v-model="ruleForm.price" clearable></el-input>
			</el-form-item>
			<el-form-item label="备注" prop="desc">
				<el-input maxLength='200' placeholder='非必填，最多200个字' type="textarea" v-model="ruleForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">取消</el-button>
				<!-- <el-button v-if='type==0' type='primary' @click='back'>返回</el-button> -->
			</el-form-item>
		</el-form>
		
	</div>
</template>

<script>
	export default{
		name:'biddingPay',
		data() {
			return {
				ruleForm: {
				  price: '',
				  desc: '',
				},
				rules: {
				  price: [
					{ required: true, message: '请输入竞价花费金额', trigger: 'blur' },
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
				  ], 
				},
				totalPrice:''
			}
		},
		mounted:function(){
			this.totalPrice = '¥' + (Number(this.$route.query.price)/100).toFixed(2)
		},
		methods: {
			//提交表单,(保存和添加)
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(this.$computed.validate(this.ruleForm.price) == false){
							this.$alert.error('价格格式不正确')
							return
						}
						var postData = {
							"accessToken":window.localStorage.accessToken,
							"poiId":this.$route.query.poiId,
							"amount":Number(this.ruleForm.price)*100,
							"summary":this.ruleForm.desc,
							"userId":this.$route.query.userId,
							"name":this.$route.query.name
						}
						this.axios.post('/mgr/bidding/consume/save',postData).then(res=>{
							console.log(res)
							if(res.data.code == 200){
								this.$alert.success('提交成功')
								setTimeout(()=>{
									this.$router.back(-1)
								},1500)
							}
							
						})
						
					} 
					else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			
		},
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
	.el-form-item:nth-child(2){
		margin-left: 10px;
		margin-right: -10px;
	}
	.el-textarea{
		width: 300px;
		margin-left: -10px;
	}
	.allPrice{
		text-align: left;
		padding-left: 10px;
		color: #5d5d5d;
		margin: 70px 0 10px;
	}
	.allPrice span:nth-child(2n){
		margin-right: 50px;
	}
</style>
