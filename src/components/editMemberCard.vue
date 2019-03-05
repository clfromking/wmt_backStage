<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{ path: '/memberAdmin' }">会员管理</el-breadcrumb-item>
			<el-breadcrumb-item :to="{ path: '/setMemberCard' }">会员卡设置</el-breadcrumb-item>
			<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-position='left' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="会员卡名称" prop="cardName">
				<el-input placeholder="请输入会员卡名称" maxLength='20' v-model="ruleForm.cardName" clearable></el-input>
			</el-form-item>
			<el-form-item label="会员卡时长" prop="time">
				<el-input class='smallInput' placeholder="请输入会员卡时长" maxLength='11' v-model="ruleForm.time" clearable></el-input>
				<el-select v-model="optionValue" placeholder="请选择">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="价格" prop="price">
				<el-input placeholder="请输入价格" maxLength='12' v-model="ruleForm.price" clearable></el-input>
				元
			</el-form-item>
			<el-form-item label="是否有优惠" prop="haveDiscount">
				<el-radio-group v-model="ruleForm.haveDiscount">
					<el-radio label="无优惠"></el-radio>
					<el-radio label="新商户立减"></el-radio>
					<el-input placeholder="请输入价格" style='width: 120px;' :disabled="ruleForm.haveDiscount=='无优惠'" v-model="discounts" clearable></el-input><p style="display: inline-block;font-size: 14px;margin-left: 5px;">元</p>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="排序" prop="sort">
				<el-input placeholder="数字越大越靠前" maxLength='12' v-model="ruleForm.sort" clearable></el-input>
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
				<el-button @click='back'>取消</el-button>
				<!-- <el-button @click="resetForm('ruleForm')">取消</el-button> -->
				<!-- <el-button type='primary' @click='back'>返回</el-button> -->
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		name: 'editMemberCard',
		data() {
			return {
				id:"",
				mainRecmd:'',
				optionValue:'',
				options: [{
						"label": '日',
						'value': '日'
					},
					{
						"label": '周',
						'value': '周'
					},
					{
						"label": '月',
						'value': '月'
					},
					{
						"label": '年',
						'value': '年'
					},
				],
				discounts:'',
				ruleForm: {
					cardName: '',
					time: '',
					price: '',
					type: [],
					haveDiscount: '',
					sort:'',
				},			
				rules: {
					cardName: [{
							required: true,
							message: '请输入会员卡名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 位',
							trigger: 'blur'
						}
					],
					time: [{
							required: true,
							message: '请输入会员卡时长',
							trigger: 'blur'
						},
						
					],
					price: [{
							required: true,
							message: '请输入价格',
							trigger: 'blur'
						}
					],
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					haveDiscount: [{
						required: true,
						message: '请选择一种账号状态',
						trigger: 'change'
					}],
					sort: [{
							required: true,
							message: '请输入排序数值，且数字越大越靠前',
							trigger: 'blur'
						}
					],
				}
			}
		},
		mounted: function() {
			this.id = this.$route.query.id
			this.loadMemberCardDetail()
		},
		methods: {
			
			//提交表单,(保存和添加)
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						// console.log(this.ruleForm.haveDiscount)
						var localStorage = window.localStorage
						// return
						var newDiscount = 0
						if(this.ruleForm.haveDiscount == '无优惠'){
							newDiscount = 0
						}
						else{
							if(this.discounts.replace(/\s+/g, "")){
								newDiscount = this.discounts
							}
							else{
								this.$alert.error('请输入优惠价格')
							}
							
						}
						var durationUnit = ''
						if(this.optionValue == '日'){
							durationUnit = 'DAY'
						}
						else if(this.optionValue == '周'){
							durationUnit = 'WEEK'
						}
						else if(this.optionValue == '月'){
							durationUnit = 'MONTH'
						}
						else if(this.optionValue == '年'){
							durationUnit = 'YEAR'
						}

						var cardForm = {
							"newDiscount":Number(newDiscount)*100,
							"name": this.ruleForm.cardName,
							"price":Number(this.ruleForm.price)*100,
							"duration":this.ruleForm.time,
							"durationUnit":durationUnit,
							"mainRecmd":this.mainRecmd,
							"id":this.id,
							"showSeq":Number(this.ruleForm.sort)
						}

						var url = '/mgr/m/card/edit?accessToken='+localStorage.accessToken
						//复杂的表单提交用封装的ajax,而不用axios
						this.$ajax.post(url,cardForm).then(res=>{
							if(res.code == 200){
								this.$alert.success('编辑成功')
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
			
			loadMemberCardDetail:function(){
				var localStorage=window.localStorage;
				this.axios.post('/mgr/m/card/detail',{"accessToken":localStorage.accessToken,"cardId":this.$route.query.id}).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						this.ruleForm.cardName = res.data.data.name
						this.ruleForm.time = res.data.data.duration
						if(res.data.data.durationUnit == 'DAY'){
							this.optionValue = '日'
						}
						else if(res.data.data.durationUnit == 'WEEK'){
							this.optionValue = '周'
						}
						else if(res.data.data.durationUnit == 'MONTH'){
							this.optionValue = '月'
						}
						else if(res.data.data.durationUnit == 'YEAR'){
							this.optionValue = '年'
						}
						
						this.ruleForm.price = (Number(res.data.data.price)/100).toFixed(2)
						// res.data.data.newDiscount = 500
						if(Number(res.data.data.newDiscount) <= 0){
							this.ruleForm.haveDiscount = '无优惠'
						}
						else{
							this.ruleForm.haveDiscount = '新用户立减'
							this.discounts = (Number(res.data.data.newDiscount)/100).toFixed(2)
						}
						this.mainRecmd = res.data.data.mainRecmd
						this.ruleForm.sort = res.data.data.showSeq
// 						if(Number(res.data.data.isEnabled) == 1){
// 							this.ruleForm.haveDiscount = '启用'
// 						}
// 						else{
// 							this.ruleForm.haveDiscount = '停用'
// 						}
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
		width: 315px;
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
	.el-select{
		width: 100px;
	}
	.smallInput{
		width: 210px;
	}
	.el-radio:nth-child(2){
		margin-right: 5px;
	}
</style>
