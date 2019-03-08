<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{ path: '/roleAdmin' }">角色管理</el-breadcrumb-item>
			<el-breadcrumb-item>{{BreadcrumbText}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-position='left' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
			<el-form-item label="角色" prop="roleName">
				<el-input :disabled="type==0" placeholder="请输入角色" maxLength='20' v-model="ruleForm.roleName" clearable></el-input>
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-radio-group :disabled="type==0" v-model="ruleForm.status">
					<el-radio label="启用"></el-radio>
					<el-radio label="停用"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item prop='checkedKeys' label='角色适用权限'>
				<el-tree
				  :data="treeData"
				  show-checkbox
				  node-key="id"
				  ref="tree"
				  :default-expanded-keys="[0]"
				  :default-checked-keys="ruleForm.checkedKeys"
				  @check-change="getChecked"
				  :props="defaultProps">
				</el-tree>
			</el-form-item>
			<el-form-item>
				<el-button v-if='type!=0' type="primary" @click="submitForm('ruleForm')">{{type==1?"保存":"立即添加"}}</el-button>
				<el-button v-if='type!=0' @click="resetForm('ruleForm')">{{type==1?"取消":"重置"}}</el-button>
				<el-button v-if='type==0' type='primary' @click='back'>返回</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default{
		name:'roleOperation',
		data() {
			return {
				BreadcrumbText: '',
				type: '',
				id:"",
				ruleForm: {
					roleName: '',
					status: '',
					checkedKeys:[],
				},			
				rules: {
					roleName: [{
							required: true,
							message: '请输入角色',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 位',
							trigger: 'blur'
						}
					],
					status: [{
						required: true,
						message: '请选择一种账号状态',
						trigger: 'change'
					}],
					checkedKeys:[
						
					]
				},
				treeData: [{
				  id: 0,
				  label: '外卖通总部管理系统',
				  disabled: Number(this.$route.query.type)==0,
				  children: [
					{
						id: 1,
						label: '内容管理',
						children: [{
						  id: 2,
						  label: 'banner管理',
						  disabled: Number(this.$route.query.type)==0,
						}],
						disabled: Number(this.$route.query.type)==0,
					},
					{
						id: 3,
						label: '商品管理',
						children: [{
						  id: 4,
						  label: '商品管理',
						  disabled: Number(this.$route.query.type)==0,
						}],
						disabled: Number(this.$route.query.type)==0,
					},
					{
						id: 5,
						label: '订单管理',
						disabled: Number(this.$route.query.type)==0,
						children: [{
						  id: 6,
						  label: '商品订单',
						  disabled: Number(this.$route.query.type)==0,
						},{
							id: 7,
							label: '购买会员订单',
							disabled: Number(this.$route.query.type)==0,
							}
						]
					},
					{
						id: 8,
						label: '服务单管理',
						disabled: Number(this.$route.query.type)==0,
						children: [{
						  id: 9,
						  label: '免租金开店',
						  disabled: Number(this.$route.query.type)==0,
						},{
							id: 10,
							label: '外卖运营',
							disabled: Number(this.$route.query.type)==0,
							}
						]
					},
					{
						id: 11,
						label: '营销管理',
						disabled: Number(this.$route.query.type)==0,
						children: [{
						  id: 12,
						  label: '0元抢',
						  disabled: Number(this.$route.query.type)==0,
						}]
					},
					{
						id: 13,
						label: '会员管理',
						disabled: Number(this.$route.query.type)==0,
						children: [{
						  id: 14,
						  label: '会员管理',
						  disabled: Number(this.$route.query.type)==0,
						}]
					},
					{
						id: 15,
						label: '财务管理',
						disabled: Number(this.$route.query.type)==0,
						children: [{
						  id: 16,
						  label: '商户余额账户',
						  disabled: Number(this.$route.query.type)==0,
						},{
							id: 17,
							label: '商户竞价账户',
							disabled: Number(this.$route.query.type)==0,
						},
						{
							id: 18,
							label: '总部账户',
							disabled: Number(this.$route.query.type)==0,
						}
						]
					},
					{
						id: 19,
						label: '人员管理',
						disabled: Number(this.$route.query.type)==0,
						children: [{
						  id: 20,
						  label: '账户管理',
						  disabled: Number(this.$route.query.type)==0,
						},{
							id: 21,
							label: '角色管理',
							disabled: Number(this.$route.query.type)==0,
						}
						]
					},
					
				  ]
				}],
				defaultProps: {
				  children: 'children',
				  label: 'label'
				},
				checkedArr:[],
				
			}
		},
		mounted: function() {
			this.type = this.$route.query.type
			switch (Number(this.$route.query.type)) {
				case 0: //查看
					this.BreadcrumbText = '查看'
					this.loadRoleDetail()
					break;
				case 1: //编辑
					this.BreadcrumbText = '编辑'
					this.loadRoleDetail()
					break;
				case 2: //添加
					this.BreadcrumbText = '添加'
					break;
			}
		},
		methods: {
			
			getChecked:function(){
				
				
				var checkedArr = []
				for(let i =0 ;i<this.$refs.tree.getCheckedNodes().length;i++){
					checkedArr.push(this.$refs.tree.getCheckedNodes()[i].id)
				}
				this.checkedArr = checkedArr
				// console.log(this.checkedArr)
			},
			
			//提交表单,(保存和添加)
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						if(this.checkedArr.length<=0){
							this.$alert.error('角色适用权限不能为空,请选择后重试')
							return
						}
						var checkedArr = JSON.parse(JSON.stringify(this.checkedArr))
						if(checkedArr.indexOf(0)>-1){
							checkedArr.splice(checkedArr.indexOf(0),1)
						}
						if(checkedArr.indexOf(1)>-1){
							checkedArr.splice(checkedArr.indexOf(1),1)
						}
						if(checkedArr.indexOf(3)>-1){
							checkedArr.splice(checkedArr.indexOf(3),1)
						}
						if(checkedArr.indexOf(5)>-1){
							checkedArr.splice(checkedArr.indexOf(5),1)
						}
						if(checkedArr.indexOf(8)>-1){
							checkedArr.splice(checkedArr.indexOf(8),1)
						}
						if(checkedArr.indexOf(11)>-1){
							checkedArr.splice(checkedArr.indexOf(11),1)
						}
						if(checkedArr.indexOf(13)>-1){
							checkedArr.splice(checkedArr.indexOf(13),1)
						}
						if(checkedArr.indexOf(15)>-1){
							checkedArr.splice(checkedArr.indexOf(15),1)
						}
						if(checkedArr.indexOf(19)>-1){
							checkedArr.splice(checkedArr.indexOf(19),1)
						}
						var localStorage = window.localStorage
						var isEnabled = 0
						if(this.ruleForm.status == '启用'){
							status = 0
						}
						else{
							status = 1
						}
						if(Number(this.type) == 1){
							
							var postForm = {"status":status,"role": this.ruleForm.roleName,"id":this.id,"list":checkedArr}
							console.log(postForm)
							// return
							var url = '/mgr/user/role/edit?accessToken='+localStorage.accessToken
							//复杂的表单提交用封装的ajax,而不用axios
							this.$ajax.post(url,postForm).then(res=>{
								if(res.code == 200){
									this.$alert.success('编辑成功')
									setTimeout(()=>{
										this.$router.back(-1)
									},1500)
								}
							})
							
						}
						else{
							var postForm = {"status":status,"role": this.ruleForm.roleName,"list":checkedArr}
							var url = '/mgr/user/role/add?accessToken='+localStorage.accessToken
							this.$ajax.post(url,postForm).then(res=>{
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
			
			
			//加载角色信息
			loadRoleDetail:function(){
				var postData = {
					"accessToken":window.localStorage.accessToken,
					"id":this.$route.query.id
				}
				this.axios.post('/mgr/user/role/detail',postData).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						this.ruleForm.roleName = res.data.data.role
						this.ruleForm.status = Number(res.data.data.status)==0?"启用":"停用"
						this.ruleForm.checkedKeys = res.data.data.power.split(",")
						this.id = res.data.data.id
					}
				})
			},
			
			//返回
			back:function(){
				this.$router.back(-1)
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
	.el-tree{
		margin-top: 6px;
		width: 200px;
	}
	
</style>
