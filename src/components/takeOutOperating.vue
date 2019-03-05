<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item>外卖运营</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="clear">
				<div class="demo-input-suffix">
					服务单编号：
					<el-input placeholder="请输入服务单编号" v-model="orderId" maxLength='' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					姓名：
					<el-input placeholder="请输入姓名" v-model="name" maxLength='11' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					下单手机号：
					<el-input placeholder="请输入下单手机号" v-model="phone" maxLength='11' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					品牌名：
					<el-input placeholder="请输入品牌名" v-model="brandName" maxLength='20' clearable>
					</el-input>
				</div>
				
			</div>
			<div class="clear">
				<div class="demo-input-suffix">
					所在区域：
					<el-cascader
					  size="large"
					  :options="options"
					  v-model="selectedOptions"
					  @change="addressChange">
					</el-cascader>
				</div>
				<div class="demo-input-suffix">
					<div class="block">
						<span class="demonstration">提交时间：</span>
						<el-date-picker :default-time="['00:00:00','23:59:00']" value-format="yyyy-MM-dd HH:mm:ss" unlink-panels v-model="submitTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</div>
			</div>
		</div>
		
	    
		
		<div class="body">
			<div class="clear btns">
				<el-button style='margin-right: 24px;' @click='queryMsg' type="primary fl">查询</el-button>
				<el-button type="primary fl" @click='clearQuery'>清空查询条件</el-button>
				<!-- <el-button type="primary fr" data-typeId='2' @click='routerTo($event)'>添加</el-button> -->
			</div>
			<div class="table">
				<template>
					<el-table :data="tableData" v-loading="loading" style="width: 100%;display: inline-block;">
						<el-table-column prop="id" label="服务单编号" row-class-name='test' align='center' width="222%">
						</el-table-column>
						<el-table-column prop="brandName" label="品牌名" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="area" label="所在区域" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="name" label="姓名" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="mobile" label="手机号" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="createTime" label="提交时间" align='center' width="222%">
						</el-table-column>
						<el-table-column label="操作" align='center' width="222%">
							<template slot-scope="scope">
								<el-button data-typeId='0'  @click='routerTo($event,scope.row)' type="text" size="small">查看</el-button>
								<!-- <el-button data-typeId='1' @click='routerTo($event,scope.row)' type="text" size="small">编辑</el-button> -->
							</template>
						</el-table-column>
					</el-table>
				</template>
			</div>
			<div class="block">
				<el-pagination @current-change="handleCurrentChange" :page-size="pageSize" layout="total, prev, pager, next,jumper"
				 :total="total">
				</el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'
	export default {
		name: 'takeOutOperating',
		data() {
			return {
				orderId: '',
				name:'',
				phone: '',
				brandName:'',
				submitTime:'',
				postOrderId:'',
				postName:'',
				postPhone: '',
				postBrandName: '',
				postsubmitTime:'',
				tableData: '',
				pageSize: 10,
				index: 0,
				total: 0,
				loading: true,
				//三级联动数据
				options: regionData,
				selectedOptions: [],
				postSelectOptions:[]
			}
		},
		mounted: function() {
			this.loadTableData()
		},
		methods: {
			//分页改变
			handleCurrentChange: function(val) {
				this.index = val - 1
				this.loading = true
				this.loadTableData()
			},

			//查询
			queryMsg: function() {
				
				if (this.orderId.replace(/\s+/g, "") == '' && this.phone.replace(/\s+/g, "") == '' && this.brandName.replace(/\s+/g, "") == '' && this.submitTime == '' && this.name == '' && this.selectedOptions.length<=0) {
					this.$alert.info('请输入查询条件')
					return
				} else {
					this.index = 0
					this.postOrderId = this.orderId
					this.postPhone = this.phone
					this.postName = this.name
					this.postSelectOptions = this.selectedOptions
					this.postBrandName = this.brandName
					this.postsubmitTime = this.submitTime
					this.loadTableData()
				}
			},

			//清空查询条件
			clearQuery: function() {
				if (this.orderId.replace(/\s+/g, "") == '' && this.phone.replace(/\s+/g, "") == '' && this.brandName.replace(/\s+/g, "") == '' && this.submitTime == '' && this.name == '' && this.selectedOptions.length<=0) {
					this.$alert.info('暂无查询条件')
					return
				}
				this.orderId = ''
				this.name = ''
				this.phone = ''
				this.brandName = ''
				this.selectedOptions = []
				this.submitTime = ''
				this.postOrderId = ''
				this.postName = ''
				this.postPhone = ''
				this.postBrandName = ''
				this.postSelectOptions = []
				this.postsubmitTime = ''
				this.index = 0
				this.$alert.success('已清空')
				this.loadTableData()
			},

			//跳转
			routerTo: function(e,row) {
				var query = {
					
				}
				if(row){
					query.id = row.id
				}
				this.$router.push({
					path: '/showTakeOutDetail',
					query: query
				})
			},

		
				
			//加载表格数据
			loadTableData: function() {
				var accessToken = window.localStorage.accessToken
				var isEnabled = ''
				if (this.postOption == '全部') {

				} else if (this.postOption == '启用') {
					isEnabled = 1
				} else {
					isEnabled = 0
				}
				var postData = {
					"accessToken": accessToken,
					"usefor":1,
					"pageSize": this.pageSize,
					"index": this.index,
					"poiUserName":this.postName.replace(/\s+/g,""),
					"brandName": this.postBrandName.replace(/\s+/g, ""),
					"poiUserMobile": this.postPhone.replace(/\s+/g, ""),
					"orderId": this.postOrderId.replace(/\s+/g, "")
				}
				if (postData.poiUserName) {
				
				} else {
					delete postData['poiUserName']
				}
				
				if (postData.brandName) {

				} else {
					delete postData['brandName']
				}

				if (postData.poiUserMobile) {

				} else {
					delete postData['poiUserMobile']
				}
				
				if(postData.orderId){
					
				} else{
					delete postData['orderId']
				}
				
				if(this.postsubmitTime){
					postData.startTime = this.postsubmitTime[0]
					postData.endTime = this.postsubmitTime[1]
				}
				
				if(this.postSelectOptions){
					postData.province = CodeToText[this.postSelectOptions[0]]
					postData.city = CodeToText[this.postSelectOptions[1]]=='市辖区'?CodeToText[this.postSelectOptions[0]]:CodeToText[this.postSelectOptions[1]]
					postData.districts = CodeToText[this.postSelectOptions[2]]
				}

				
				// console.log(postData)
				this.axios.post('/mgr/poi/request/list', postData).then(res => {
					if (res.data.code == 200) {
						var list = res.data.data.list
						for (let i = 0; i < list.length; i++) {
							list[i].area = list[i].province +'-'+ list[i].city +'-'+ list[i].districts
						}
						
						this.tableData = list
						this.total = list.length
						this.loading = false
						if(list.length <= 0){
							this.$alert.info('暂无数据')
						}
					}
					else if(res.data.code == 410){
						this.$alert.error(res.data.msg)
						this.orderId = ''
						this.name = ''
						this.phone = ''
						this.brandName = ''
						this.selectedOptions = []
						this.submitTime = ''
						this.postOrderId = ''
						this.postName = ''
						this.postPhone = ''
						this.postBrandName = ''
						this.postSelectOptions = []
						this.postsubmitTime = ''
						this.index = 0
						this.loadTableData()
					}
				})
			},
			
			//三级联动组建选择
			addressChange:function(arr) {
				console.log(arr);
				console.log(CodeToText[arr[0]], CodeToText[arr[1]], CodeToText[arr[2]]);
			},
// 			tableTitleColor:function(){
// 				return '#abca9a'
// 			},
		},
	}
</script>

<style scoped>
	.header {
		height: 228px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
	}

	.el-breadcrumb {
		padding-top: 46px;
		padding-left: 50px;
		text-align: left;
		font-size: 16px;
		color: #5d5d5d;
	}

	.demo-input-suffix:nth-child(1) {
		margin-left: 50px;
	}

	.demo-input-suffix {
		display: inline-block;
		float: left;
		margin-right: 40px;
		margin-top: 25px;
	}

	.body {
		min-height: 720px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 0 54px 50px;
		margin-top: 21px;
		box-sizing: border-box;
		
	}

	.el-input {
		display: inline-block;
		width: 12.5rem;
	}

	.btns {
		padding-top: 65px;
	}

	.table {
		text-align: center;
		margin-top: 50px;
	}

	.el-table td,
	.el-table th {
		text-align: center !important;
	}

	.el-pagination {
		margin-top: 20px;
	}
</style>
