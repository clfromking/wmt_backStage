<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{ path: '/goodsAdmin' }">商品管理</el-breadcrumb-item>
			<el-breadcrumb-item>{{BreadcrumbText}}</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form label-position='left' :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="商品名称" prop="name">
				<el-input :disabled="type==0" placeholder="请输入商品名称" maxLength='20' v-model="ruleForm.name" clearable></el-input>
			</el-form-item>
			<el-form-item  label='商品图片'>
				<el-upload
				  action="http://192.168.0.198/mgr/img/upload"
				  list-type="picture-card"
				  :auto-upload = 'false'
				  :limit='1'
				  ref='upload'
				  :file-list='listArr'
				  :disabled="type==0"
				  :on-exceed='exceed' 
				  :on-preview="handlePictureCardPreview"
				  
				  :on-success='successUpLoad'
				  :on-error='failUpLoad'
				  :on-change='change'
				  :on-remove="handleRemove">
				  <i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog  :visible.sync="dialogVisible">
				  <img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
				
			</el-form-item>
			<el-form-item label="售价" prop="price">
				<el-input :disabled="type==0" placeholder="请输入售价" maxLength='11' v-model="ruleForm.price" clearable></el-input>
			</el-form-item>
			<el-form-item label="库存" prop="status2">
				<el-radio-group @change='radioChange' :disabled="type==0" v-model="ruleForm.status2">
					<el-radio label="不限制"></el-radio>
					<el-radio label="限制"></el-radio>
				</el-radio-group><br>
				
				<el-input v-if='isShowStockNum' :disabled="type==0" placeholder="请输入库存量" maxLength='11' v-model="ruleForm.stockNum" clearable></el-input>
			</el-form-item>
			<el-form-item label="上架状态" prop="status">
				<el-radio-group :disabled="type==0" v-model="ruleForm.status">
					<el-radio label="上架"></el-radio>
					<el-radio label="下架"></el-radio>
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
		name: 'goodsOperation',
		data() {
			return {
				BreadcrumbText: '',
				type: '',
				id:"",
				listArr:[],
				isFull:false,
				dialogVisible: false,
				dialogImageUrl: '',
				isShowStockNum:false,
				ruleForm: {
					name: '',
					price: '',
					stockNum:'',
					type: [],
					status: '上架',
					status2:'不限制',
				},			
				rules: {
					name: [{
							required: true,
							message: '请输入商品名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 位',
							trigger: 'blur'
						}
					],
					price: [{
							required: true,
							message: '请输入售价',
							trigger: 'blur'
						},
						
					],
					status2: [{
						required: true,
						message: '请选择一种库存设置',
						trigger: 'change'
					}],
					
					type: [{
						type: 'array',
						required: true,
						message: '请至少选择一个活动性质',
						trigger: 'change'
					}],
					status: [{
						required: true,
						message: '请选择一种上架状态',
						trigger: 'change'
					}],
					dialogImageUrl:[
						{
							required:true,
							message: '请上传一张封面图片',
							trigger: 'change'
						}
					]
				}
			}
		},
		mounted: function() {
			this.type = this.$route.query.type
			switch (Number(this.$route.query.type)) {
				case 0: //查看
					this.BreadcrumbText = '查看'
					this.loadGoodsDetail()
					break;
				case 1: //编辑
					this.BreadcrumbText = '编辑'
					this.loadGoodsDetail()
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
						// console.log(this.$refs.upload._data.uploadFiles[0].url)
						// return
						if(Number(this.$refs.upload._data.uploadFiles.length) <= 0){
							this.$alert.error('请上传一张封面图片')
							return
						}
						
						if(this.$computed.validate(this.ruleForm.price) == false){
							this.$alert.error('价格格式不正确')
							return
						}
						
						// console.log(this.ruleForm.status2)
						var isEnabled = 0
						if(this.ruleForm.status == '上架'){
							isEnabled = 1
						}
						else{
							isEnabled = 0
						}
						if(this.$computed.isZint(this.ruleForm.stockNum) == false && this.ruleForm.status2 == '限制'){
							this.$alert.error('库存量格式不正确')
							return
						}
						// var userForm = {"productStatus":isEnabled,"name": this.ruleForm.name,"price":Number(this.ruleForm.price)*100,"stockNum":this.ruleForm.stockNum||0,"id":this.id}
						if(this.$refs.upload._data.uploadFiles[0].url.indexOf('blob:') > -1){
							console.log(1)
							this.$refs.upload.submit()
						}
						else{
							console.log(2)
							this.submitMsg(this.$refs.upload._data.uploadFiles[0].url)
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
					this.$refs.upload.clearFiles()
				}
				
			},
			
			back:function(){
				this.$router.back(-1)
			},
			
			loadGoodsDetail:function(){
				var localStorage=window.localStorage;
				this.axios.post('/mgr/product/material/query/detail',{"accessToken":localStorage.accessToken,"id":this.$route.query.id}).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						this.ruleForm.name = res.data.data.name
						this.ruleForm.price = (Number(res.data.data.price)/100)
						this.ruleForm.stockNum = res.data.data.stockNum
						var listArr = this.listArr
						listArr.push({url:res.data.data.coverImg})
// 						listArr.name = 'asdasd'
// 						listArr.url = res.data.data.coverImg
						console.log(listArr)
						this.listArr = listArr
						
						this.id = res.data.data.id
						if(Number(res.data.data.isEnabled) == 1){
							this.ruleForm.status = '上架'
						}
						else{
							this.ruleForm.status = '下架'
						}
					}
				})
			},
			
			handleRemove(file, fileList) {
				console.log(file, fileList);
				this.isFull = false
			},
			
			handlePictureCardPreview(file) {
				console.log(this.dialogImageUrl)
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			
			change:function(file,fileList){
				if(file.raw.type === 'image/png' || file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg'){
					const isLt2M = file.raw.size / 1024 / 1024 < 2;
					if (!isLt2M) {
					  this.$alert.error('上传头像图片大小不能超过 2MB!');
					  this.$refs.upload.clearFiles()
					}
				}
				else{
					this.$alert.error('图片格式必须为png、jpg、jpeg')
					this.$refs.upload.clearFiles()
				}
// 				console.log(file)
// 				console.log(fileList)
// 				if(fileList.length >= 1){
// 					this.isFull = true
// 				}
				// this.isFull = true
			},
			
			//超出限制
			exceed:function(){
				this.$alert.error('图片最多只能上传一张')
			},
			
			//上传前判断
// 			beforeAvatarUpload(file) {
// 				console.log(file.type)
// 				const isJPG = file.type === 'image/jpeg';
// 				const isLt2M = file.size / 1024 / 1024 < 2;
// 
// 				if (!isJPG) {
// 				  this.$message.error('上传头像图片只能是 JPG 格式!');
// 				}
// 				if (!isLt2M) {
// 				  this.$message.error('上传头像图片大小不能超过 2MB!');
// 				}
// 				return isJPG && isLt2M;
// 			},
			
			//是否限制库存改变
			radioChange:function(e){
				console.log(e)
				if(e == '不限制'){
					this.isShowStockNum = false
					this.ruleForm.stockNum = ''
				}
				else{
					this.isShowStockNum = true
				}
			},
			
			
			//上传成功
			successUpLoad:function(res){
				console.log(res)
				var imgUrl = res.data
				this.$refs.upload._data.uploadFiles[0].url = res.data
				this.submitMsg(imgUrl)
				// return
				
			},
			
			//上传失败
			failUpLoad:function(){
				this.$alert.error('图片上传失败，请重试')
			},
			
			submitMsg:function(imgUrl){
				var localStorage = window.localStorage
				var isEnabled = 0
				if(this.ruleForm.status == '上架'){
					isEnabled = 1
				}
				else{
					isEnabled = 0
				}
				if(Number(this.type) == 1){
					
					var userForm = {
						"status":isEnabled,
						"name": this.ruleForm.name,
						"price":Number(this.ruleForm.price)*100,
						"stockNum":this.ruleForm.stockNum||0,
						"id":this.id,
						"coverImg":imgUrl,
						"firstLevel":0,
						"secondLevel":0,
						"thirdLevel":0
					}
					var url = '/mgr/product/material/edit?accessToken='+localStorage.accessToken
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
					var userForm = {
						"status":isEnabled,
						"name": this.ruleForm.name,
						"price":Number(this.ruleForm.price)*100,
						"stockNum":this.ruleForm.stockNum||0,
						"coverImg":imgUrl,
						"firstLevel":0,
						"secondLevel":0,
						"thirdLevel":0
					}
					var url = '/mgr/product/material/save?accessToken='+localStorage.accessToken
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
