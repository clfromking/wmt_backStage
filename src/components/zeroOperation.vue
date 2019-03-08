<template>
	<div>
		<div class="title">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item :to="{ path: '/zero' }">0元抢购</el-breadcrumb-item>
				<el-breadcrumb-item>{{BreadcrumbText}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="header">
			<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			  <el-form-item label="名称" prop="name">
				<el-input :disabled="disabled" maxLength='20' placeholder='必填，最多20个字' v-model="ruleForm.name"></el-input>
			  </el-form-item>
			  <el-form-item  label="状态" prop="status">
			  	<el-radio-group :disabled="disabled"  v-model="ruleForm.status">
			  		<el-radio label="启用"></el-radio>
			  		<el-radio label="停用"></el-radio>
			  	</el-radio-group>
			  </el-form-item>
			  <el-form-item label="备注" prop="desc">
				<el-input :disabled="disabled" maxLength='200' placeholder='非必填，最多200个字' type="textarea" v-model="ruleForm.desc"></el-input>
			  </el-form-item>
			  <el-form-item  label="促销日期" prop="date">
				  <el-date-picker :disabled="disabled" value-format="yyyy-MM-dd" v-model="ruleForm.date" type="date" placeholder="选择日期"></el-date-picker>
			  </el-form-item>
				  <!-- <div class="demo-input-suffix">
					促销日期：
					<el-date-picker :disabled="disabled" value-format="yyyy-MM-dd" unlink-panels v-model="ruleForm.date" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
					</el-date-picker>
					<el-button :disabled="disabled" v-if='index!=0' @click='deleteCategory(index)' class='fr' type="danger">删除</el-button>
				  </div> -->
			</el-form>
			
		</div>
		
		<div class="body">
			<div class="formList" v-for='(item , index) in formList'>
				
				
				
				<div class="times">
					<div class="demo-input-suffix">
						时间段： 
						<template>
							<el-time-picker
								v-model="item.timeStart"
								:disabled="disabled"
								:picker-options="{
									selectableRange: '00:00:00 - 23:59:59'
								}"
								style='margin-left: 15px;'
								@change='rootEndTime(index)'
								value-format="HH:mm:ss"
								placeholder="开始时间">
							</el-time-picker>
							-
							<el-time-picker
								
								v-model="item.timeEnd"
								value-format="HH:mm:ss"
								data-id='1'
								:disabled="disabled"
								:picker-options="{
									selectableRange: selectEndTime(item.timeStart),
								}"
								placeholder="结束时间">
							</el-time-picker>
						</template>
						<el-button :disabled="disabled" v-if='index!=0' @click='deleteCategory(index)' class='fr' type="danger">删除</el-button>
						<!-- <el-button v-if='index1 >= item.timesLength' :disabled="disabled" class='addTimeBtn' style='margin-left: 10px;' type="primary">添加</el-button> -->
					</div>
				</div>
				
				<div class="demo-input-suffix">
					促销商品：
					<el-input maxLength='20' placeholder='请输入查询的促销商品' v-model="item.selectName"></el-input>
					<el-button :data-index='index' @click='queryMsg($event)' type="primary">查询</el-button>
					
				</div>
				
				<div class="clear">
					<el-button :disabled="disabled" data-typeId='0' class='fr' style='margin-bottom: 10px;' @click='addGoods(index)' type='primary'>添加</el-button>
				</div>
				
				<div class="table">
					<template>
						<el-table :data="item.goodsList"  style="width: 100%;display: inline-block;">
							<el-table-column prop="name" label="商品名称" row-class-name='test' align='center' width="390%">
							</el-table-column>
							<el-table-column prop="price" label="售价" align='center' width="390%">
							</el-table-column>
							<el-table-column prop="stockNum" label="库存" align='center' width="390%">
							</el-table-column>
							
							<el-table-column label="操作" align='center' width="390%">
								<template slot-scope="scope">
									<el-button data-typeId='0' :disabled="disabled"  @click='deleteGoods(index,scope.row)' type="text" size="small">删除</el-button>
									<!-- <el-button data-typeId='1' @click='routerTo($event,scope.row)' type="text" size="small">编辑</el-button> -->
								</template>
							</el-table-column>
						</el-table>
					</template>
				</div>
				<div class="block">
					<el-pagination @current-change="handleCurrentChange" :page-size="item.pageSize" layout="total, prev, pager, next,jumper"
					 :total="item.total">
					</el-pagination>
				</div>
			</div>
		</div>
		
		<div class="clear" style="margin: 20px 0;">
			<el-button class='fr' v-if="!disabled" @click='addCategory' plain icon='el-icon-circle-plus-outline'>添加类目</el-button>
		</div>
			
		<div class="footer">
			<el-button v-if="!disabled" type="primary" @click="submitForm('ruleForm')">保存</el-button>
			<el-button v-if="!disabled" @click="back">取消</el-button>
			<el-button  type="primary" v-if="disabled"  @click="back">返回</el-button>
		</div>
		
		<div v-show="isShowGenerate"  class="shade">
			<div class="bg-shade" @click="closeShade"></div>
			<div>
				<template>
				  <el-transfer :titles="['暂未添加的商品', '已添加的商品']" @change='changeGenerate' v-model="haveValue" :data="generateData"></el-transfer>
				</template>
			</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		name:'zeroOperation',
		data() {
			return {
				ruleForm: {
				  name: '',
				  desc: '',
				  status:'启用',
				  date:'',
				},
				rules: {
				  name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
				  ],
				  status: [{
				  	required: true,
				  	message: '请选择一种账号状态',
				  	trigger: 'change'
				  }],
				  date:[
					{ required: true, message: '请选择促销日期', trigger: 'blur' },
				  ]
				  
				},
				formList:[
					{
						"timeStart":'',
						'timeEnd':'',						
						'timesLength':1,
						'goodsList':[
							// {'name':'','price':'','stockNum':'','goodsId':''}
						],
						'selectName':'',
						'pageSize':10,
						'index':0,
						'total':0
					},
				],
				allformList:[
					{
						"timeStart":'',
						'timeEnd':'',						
						'timesLength':1,
						'goodsList':[
							// {'name':'','price':'','stockNum':'','goodsId':''}
						],
						'selectName':'',
						'pageSize':10,
						'index':0,
						'total':0
					},
				],
				type:'',
				BreadcrumbText:'',
				disabled:false,
				cateId:'',
				generateData: [],
				haveValue: [1, 4],
				isSelectIndex:0,		//选择添加的index值
				isShowGenerate:false
			};
		},
		mounted:function(){
			this.type = this.$route.query.type
			switch (Number(this.$route.query.type)) {
				case 0: //查看
					this.BreadcrumbText = '查看'
					this.disabled = true
					this.loadAllMsg()
					break;
				case 1: //编辑
					this.BreadcrumbText = '编辑'
					this.disabled = false
					this.loadAllMsg()
					this.loadAllGoods()
					break;
				case 2: //添加
					this.BreadcrumbText = '添加'
					this.disabled = false
					this.loadAllGoods()
					break;
			}
		},
		methods: {
			//分页改变
			handleCurrentChange:function(){
				
			},
			
			//提交表单,(保存和添加)
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						var allformList = this.allformList
						var formList = this.formList
						console.log(formList,allformList)
						for(let i=0;i<formList.length;i++){
							allformList[i].timeStart = formList[i].timeStart
							allformList[i].timeEnd = formList[i].timeEnd
						}
						this.formList = formList
						this.allformList = allformList
						
						for(let i=0;i<this.allformList.length;i++){
							if(!this.allformList[i].timeStart){
								this.$alert.error('时间段开始时间不能为空')
								return
							}
							
							if(!this.allformList[i].timeEnd){
								this.$alert.error('时间段结束时间不能为空')
								return
							}
							
							if(this.allformList[i].goodsList.length <= 0){
								this.$alert.error('类目的商品项不能为空')
								return
							}
						}
						
						var postFormList = JSON.parse(JSON.stringify(this.allformList))
						for(let i=0;i<postFormList.length;i++){
							delete postFormList[i]['total']
							delete postFormList[i]['pageSize']
							for(let j=0;j<postFormList[i].goodsList.length;j++){
								delete postFormList[i].goodsList[j]['index']
								postFormList[i].goodsList[j].price = Number(postFormList[i].goodsList[j].price.substr(1))*100
							}
						}
						
						var localStorage = window.localStorage
						var isEnabled = 0
						if(this.ruleForm.status == '启用'){
							isEnabled = 1
						}
						else{
							isEnabled = 0
						}
						
					
						if(Number(this.type) == 1){
							
							// var userForm = {"isEnabled":isEnabled,"name": this.ruleForm.name,"password":this.ruleForm.password,"mobile":this.ruleForm.phone,"id":this.id},
							var userForm = {
								"cateId":this.cateId,
								"name":this.ruleForm.name,
								"drcp":this.ruleForm.desc,
								"dateSnap":this.ruleForm.date,
								"isEnabled":isEnabled,
								"cateList":postFormList
							}
							var url = '/mgr/snap/cate/edit?accessToken='+localStorage.accessToken
							//复杂的表单提交用封装的ajax,而不用axios
							this.$ajax.post(url,userForm).then(res=>{
								console.log(res)
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
								"name":this.ruleForm.name,
								"drcp":this.ruleForm.desc,
								"dateSnap":this.ruleForm.date,
								"isEnabled":isEnabled,
								"cateList":postFormList
							}
							var url = '/mgr/snap/cate/add?accessToken='+localStorage.accessToken
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
			
			
			//查询
			queryMsg:function(e){
				// console.log(e.target.dataset.index)
				// console.log(this.formList[e.target.dataset.index].selectName)
				console.log(this.allformList)
				
				var goodsNameArr = []
				for(let i=0;i<this.allformList[e.target.dataset.index].goodsList.length;i++){
					// console.log(this.allformList[e.target.dataset.index].goodsList[i].name)
					goodsNameArr.push(this.allformList[e.target.dataset.index].goodsList[i].name)
				}
				// console.log(this.fuzzyQuery(this.allformList[e.target.dataset.index].goodsList,this.formList[e.target.dataset.index].selectName))
				var formList = this.formList
				formList[e.target.dataset.index].goodsList = this.fuzzyQuery(this.allformList[e.target.dataset.index].goodsList,this.formList[e.target.dataset.index].selectName)
				this.formList = formList
			},
			
			//返回
			back:function(){
				this.$router.back(-1)
			},
			
			//删除商品
			deleteGoods:function(index,row){
				// console.log(index,row.index)
				var options = { confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}
				this.$alert.showModal('确定要删除该商品嘛？','提示',options).then(res=>{
					var formList = this.formList
					formList[index].goodsList.splice(row.index,1)
					formList[index].total = formList[index].total-1
					this.formList = formList
					var allformList = this.allformList
					allformList[index].goodsList.splice(row.index,1)
					allformList[index].total = allformList[index].total-1
					this.allformList = allformList
					// allformList[index].goodsList[row.index].operation = 2
					this.$alert.success('已成功删除,点击保存后方可成功删除')
					
					console.log(this.allformList)
				}).catch(error=>{
					
				})
			},
			
			//添加类目
			addCategory:function(){
				var addListMsg = {
					
					"timeStart":'',
					'timeEnd':'',
					'timesLength':1,
					'goodsList':[
						// {'name':'','price':'','stockNum':'','goodsId':''}
					],
					'selectName':'',
					'pageSize':10,
					'index':0,
					'total':0
				}
				var formList = this.formList
				var allformList = this.allformList
				formList.push(addListMsg)
				allformList.push(addListMsg)
				this.formList = formList
				this.allformList = allformList	
				console.log(allformList)
			},
			
			//删除类目
			deleteCategory:function(index){
				// alert(index)
				var options = { confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}
				this.$alert.showModal('确定要删除该类目嘛？','提示',options).then(res=>{
					var formList = this.formList
					formList.splice(index,1)
					var allformList = this.allformList
					allformList.splice(index,1)
					this.allformList = allformList
					this.$alert.success('已成功删除')
					this.formList = formList
// 					console.log(this.formList)
// 					console.log(this.allformList)
				}).catch(error=>{
					
				})
			},
			
			//限制结束时间
			selectEndTime:function(e){
				if(e){
					return e + '-23:59:59'
				}
				else{
					return '00:00:00-23:59:59'
				}
				
			},
			
			
			//初始化结束时间
			rootEndTime:function(index){
				this.selectEndTime(this.formList[index].timeStart)
				this.formList[index].timeEnd = ''
				// console.log(index,index1)
			},
			
			
			//加载信息
			loadAllMsg:function(){
				var localStorage = window.localStorage
				this.axios.post('/mgr/snap/cate/detail',{"accessToken":localStorage.accessToken,'cateId':this.$route.query.id}).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						let data = res.data.data
						this.cateId = data.cateId
						this.ruleForm.name = data.name
						this.ruleForm.status = data.isEnabled==1?"启用":"停用"
						this.ruleForm.desc = data.drcp
						this.ruleForm.date = data.dateSnap
						
						for(let i=0;i<data.cateList.length;i++){
							for(let j=0;j<data.cateList[i].goodsList.length;j++){
								data.cateList[i].goodsList[j].price = '¥' + (Number(data.cateList[i].goodsList[j].price)/100).toFixed(2)
								data.cateList[i].goodsList[j].index = j
							}
							data.cateList[i].total = data.cateList[i].goodsList.length
							data.cateList[i].pageSize = 10
							
						}
						
						this.formList = data.cateList
// 						var allformList = []
// 						for(let i =0;i<this.formList.length;i++){
// 							allformList.push(this.formList[i])
// 						}
						this.allformList = JSON.parse(JSON.stringify(data.cateList))
// 						console.log(this.formList)
// 						console.log(this.allformList)
// 						this.formList[2] = 'asdasd'
// 						console.log(this.allformList)
					}
				})
			},
			
			//加载全部商品信息
			loadAllGoods:function(){
				var localStorage = window.localStorage
				this.axios.get('/mgr/product/m/list?accessToken='+localStorage.accessToken).then(res=>{
					console.log(res)
					var data = {}
					var generateData = this.generateData
					if(res.data.code == 200){
						for(let i = 0;i<res.data.data.list.length;i++){
							data = {
								key:res.data.data.list[i].id,
								label:res.data.data.list[i].name,
								price:res.data.data.list[i].price,
								stockNum:res.data.data.list[i].stockNum
							}
							generateData.push(data)
						}
						this.generateData = generateData
					}
				})
			},
			
			
			//模糊查询
			fuzzyQuery:function(list, keyWord) {
				var reg =  new RegExp(keyWord);
				var arr = [];
				var newList = JSON.parse(JSON.stringify(list))
				for (var i = 0; i < newList.length; i++) {
				  if (reg.test(newList[i].name)) {
					arr.push(newList[i]);
				  }
				}
				return arr;
			},
			
			//穿梭框改变
			changeGenerate:function(e){
// 				console.log(this.generateData)
// 				console.log(e)
				var allformList = this.allformList		
				var formList = this.formList
				var pushData = {}
				var ids = []
				for(let i=0;i<this.generateData.length;i++){
					ids.push(this.generateData[i].key)
				}
				
				allformList[this.isSelectIndex].goodsList.length = 0
				formList[this.isSelectIndex].goodsList.length = 0
				for(let i=0;i<e.length;i++){
					if(ids.indexOf(e[i]) > -1){
						pushData = {
							name:this.generateData[ids.indexOf(e[i])].label,
							goodsId:this.generateData[ids.indexOf(e[i])].key,
							price: '¥' + (Number(this.generateData[ids.indexOf(e[i])].price)/100).toFixed(2),
							stockNum:this.generateData[ids.indexOf(e[i])].stockNum||0
						}
						// allformList[this.isSelectIndex].goodsList.push(pushData)
						formList[this.isSelectIndex].goodsList.push(pushData)
					}
				}
				formList[this.isSelectIndex].total = e.length 
				this.allformList = allformList
				this.formList = formList
				//深拷贝
				var allformList = this.allformList
				allformList = JSON.parse(JSON.stringify(formList))
				this.allformList = allformList
				
			},
			
			
			//添加商品
			addGoods:function(index){
				var ids = []
				var haveValue = []
				//所有key取出来
				for(let i=0;i<this.generateData.length;i++){
					ids.push(this.generateData[i].key)
				}
				
				//把已经存在的拿出来
				for(let i=0;i<this.allformList[index].goodsList.length;i++){
					if(ids.indexOf(this.allformList[index].goodsList[i].goodsId) > -1){		
						haveValue.push(this.generateData[ids.indexOf(this.allformList[index].goodsList[i].goodsId)].key)
					}
				}
				this.haveValue = haveValue
				this.isSelectIndex = index
				this.isShowGenerate = true
			},
			
			//关闭遮罩
			closeShade:function(){
				this.isShowGenerate = false
			},
		},
	}
</script>

<style scoped>
	.title,.footer{
		height: 70px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
	}
	.header{
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 20px 0;
		margin-top: 20px;
	}
	.el-breadcrumb {
		/* padding-top: 46px; */
		padding-left: 50px;
		line-height: 70px;
		text-align: left;
		font-size: 16px;
		color: #5d5d5d;
	}
	.formList{
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding:30px 50px;
		margin-top: 20px;
	}
	.demo-input-suffix{
		text-align: left;
		margin-bottom: 25px;
	}
	.el-form {
		text-align: left;
		margin-top: 40px;
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
	.el-textarea{
		width: 300px;
	}
	.el_button:nth-child(1){
		display: none;
	}
	.footer{
		text-align: left;
		padding-top: 15px;
		box-sizing: border-box;
		padding-left: 50px;
	}
	.el-pagination{
		margin-top: 20px;
	}
	
	.bg-shade{
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left:0;
		bottom: 0;
		right: 0;
		margin: auto;
		background: #000;
		opacity: 0.29;
		z-index: 9;
	}
	.el-transfer{
		position: fixed;
		top: 0;
		left:0;
		height: 294px;
		width: 500px;
		bottom: 0;
		right: 0;
		margin: auto;
		z-index: 10;
		text-align: left;
	}
	/* .footer el-button{
		margin-top: 15px;
	} */
</style>
