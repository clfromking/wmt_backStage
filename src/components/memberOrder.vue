<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item>购买会员订单</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="clear">
				<div class="demo-input-suffix">
					订单编号：
					<el-input placeholder="请输入订单编号" v-model="orderId" maxLength='' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					下单手机号：
					<el-input placeholder="请输入下单手机号" v-model="phone" maxLength='11' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					品牌名称：
					<el-input placeholder="请输入品牌名称" v-model="brandName" maxLength='20' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					<div class="block">
						<span class="demonstration">支付日期：</span>
						<el-date-picker :default-time="['00:00:00','23:59:00']" value-format="yyyy-MM-dd HH:mm:ss" unlink-panels v-model="payDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
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
						<el-table-column prop="orderId" label="订单编号" row-class-name='test' align='center' width="222%">
						</el-table-column>
						<el-table-column prop="payment" label="实付金额" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="payWayText" label="支付方式" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="submitUserMobile" label="手机号" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="timeEnd" label="支付时间" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="poiName" label="品牌名称" align='center' width="222%">
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
	export default {
		name: 'memberOrder',
		data() {
			return {
				orderId: '',
				phone: '',
				brandName:'',
				payDate:'',
				postOrderId:'',
				postPhone: '',
				postBrandName: '',
				postPayDate:'',
				tableData: '',
				pageSize: 10,
				index: 0,
				total: 0,
				loading: true
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
				
				if (this.orderId.replace(/\s+/g, "") == '' && this.phone.replace(/\s+/g, "") == '' && this.brandName.replace(/\s+/g, "") == '' && this.payDate == '') {
					this.$alert.info('请输入查询条件')
					return
				} else {
					this.index = 0
					this.postOrderId = this.orderId
					this.postPhone = this.phone
					this.postBrandName = this.brandName
					this.postPayDate = this.payDate
					this.loadTableData()
				}
			},

			//清空查询条件
			clearQuery: function() {
				if (this.orderId.replace(/\s+/g, "") == '' && this.phone.replace(/\s+/g, "") == '' && this.brandName.replace(/\s+/g, "") == '' && this.payDate == '') {
					this.$alert.info('暂无查询条件')
					return
				}
				this.orderId = ''
				this.phone = ''
				this.brandName = ''
				this.payDate = ''
				this.postOrderId = ''
				this.postPhone = ''
				this.postBrandName = ''
				this.postPayDate = ''
				this.index = 0
				this.$alert.success('已清空')
				this.loadTableData()
			},

			//跳转
			routerTo: function(e,row) {
				var query = {
					
				}
				if(row){
					query.orderId = row.orderId
				}
				this.$router.push({
					path: '/showMemberOrderDetail',
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
					"pageSize": this.pageSize,
					"index": this.index,
					"poiName": this.postBrandName.replace(/\s+/g, ""),
					"userMobile": this.postPhone.replace(/\s+/g, ""),
					"orderId": this.postOrderId.replace(/\s+/g, "")
				}
				if (postData.poiName) {

				} else {
					delete postData['poiName']
				}

				if (postData.userMobile) {

				} else {
					delete postData['userMobile']
				}
				
				if(postData.orderId){
					
				} else{
					delete postData['orderId']
				}
				
				if(this.postPayDate){
					postData.startTime = this.postPayDate[0]
					postData.endTime = this.postPayDate[1]
				}

				
				// console.log(postData)
				this.axios.post('/mgr/member/order/list', postData).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						var list = res.data.data.list
						for (let i = 0; i < list.length; i++) {
							list[i].payment = '¥' + (Number(list[i].payment)/100).toFixed(2)
							switch(Number(list[i].payWay)){
								case 1:
									list[i].payWayText = '银联'
									break;
								case 2:
									list[i].payWayText = '支付宝'
									break;
								case 3:
									list[i].payWayText = '微信支付'
									break;
								case 4:
									list[i].payWayText = '余额支付'
									break;
								default :
									list[i].payWayText = '未知'
									break;
							}
						}
						
						this.tableData = list
						this.total = res.data.data.total
						this.loading = false
						if(list.length <= 0){
							this.$alert.info('暂无数据')
						}
					}
				})
			},
			
// 			tableTitleColor:function(){
// 				return '#abca9a'
// 			},
		},
	}
</script>

<style scoped>
	.header {
		height: 168px;
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
		margin-right: 1.25rem;
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
