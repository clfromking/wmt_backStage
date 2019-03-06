<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item :to="{path:'/storeBiddingAccount'}">商户竞价账户</el-breadcrumb-item>
				<el-breadcrumb-item>账户详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="allPrice">
				<span>品牌名称：</span>
				<span>{{brandName}}</span>
				<span>老板姓名：</span>
				<span>{{bossName}}</span>
				<span>老板手机号：</span>
				<span>{{bossPhone}}</span>
				<span>总余额：</span>
				<span>{{totalPrice}}</span>
				<el-button type="primary" @click='goBiddingPay'>竞价花费</el-button>
			</div>
			<div class="clear">
				<div class="demo-input-suffix">
					交易单号：
					<el-input placeholder="请输入交易单号" v-model="orderId" maxLength='' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					<div class="block">
						<span class="demonstration">交易时间：</span>
						<el-date-picker :default-time="['00:00:00','23:59:00']" value-format="yyyy-MM-dd HH:mm:ss" unlink-panels v-model="payDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</div>
				<div class="demo-input-suffix">
					收支类型：
					<el-select v-model="optionValue" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="demo-input-suffix">
					交易类型：
					<el-select v-model="optionValue2" placeholder="请选择">
						<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
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
						<el-table-column prop="orderId" label="交易单号" row-class-name='test' align='center' width="259%">
						</el-table-column>
						<el-table-column prop="tranTypeText" label="交易类型" align='center' width="259%">
						</el-table-column>
						<el-table-column prop="payTypeText" label="收支类型" align='center' width="259%">
						</el-table-column>
						<el-table-column prop="payamount" label="金额" align='center' width="259%">
						</el-table-column>
						<el-table-column prop="createTime" label="交易时间" align='center' width="259%">
						</el-table-column>
						<el-table-column label="操作" align='center' width="259%">
							<template slot-scope="scope">
								<el-button data-typeId='0'  @click='routerTo(scope.row)' type="text" size="small">查看</el-button>
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
		name: 'storeBiddingListDetail',
		data() {
			return {
				orderId: '',
				payDate:'',
				optionValue: '全部',
				optionValue2: '全部',
				postOrderId:'',
				postPayDate:'',
				postOption: '全部',
				postOption2: '全部',
				tableData: '',
				pageSize: 10,
				index: 0,
				total: 0,
				loading: true,
				options: [{
						"label": '全部',
						'value': '全部'
					},
					{
						"label": '收入',
						'value': '收入'
					},
					{
						"label": '支出',
						'value': '支出'
					},
				],
				options2: [{
						"label": '全部',
						'value': '全部'
					},
					{
						"label": '竞价花费',
						'value': '竞价花费'
					},
					{
						"label": '竞价充值',
						'value': '竞价充值'
					},
				],
				totalPrice:'',
				brandName:'',
				bossName:'',
				bossPhone:'',
				userId:''
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
				
				if (this.orderId.replace(/\s+/g, "") == '' && this.payDate == '' && this.optionValue == '全部' && this.optionValue2 == '全部') {
					this.$alert.info('请输入查询条件')
					return
				} else {
					this.index = 0
					this.postOrderId = this.orderId
					this.postOption = this.optionValue
					this.postOption2 = this.optionValue2
					this.postPayDate = this.payDate
					this.loadTableData()
				}
			},
			
			//清空查询条件
			clearQuery: function() {
				if (this.orderId.replace(/\s+/g, "") == '' && this.payDate == '' && this.optionValue == '全部' && this.optionValue2 == '全部') {
					this.$alert.info('暂无查询条件')
					return
				}
				this.orderId = ''
				this.payDate = ''
				this.optionValue = '全部'
				this.optionValue2 = '全部'
				this.postOrderId = ''
				this.postOption = '全部'
				this.postOption2 = '全部'
				this.postPayDate = ''
				this.index = 0
				this.$alert.success('已清空')
				this.loadTableData()
			},

			//跳转
			routerTo: function(row) {
				var query = {
					
				}
				if(row){
					query.orderId = row.orderId
					query.poiId = this.$route.query.id,
					query.payType = row.payType
				}
// 				console.log(row.orderId)
// 				return
				this.$router.push({
					path: '/storeBiddingDetail',
					query: query
				})
			},

			//竞价消费
			goBiddingPay:function(){
				var query = {
					name:this.bossName,
					userId:this.userId,
					poiId:this.$route.query.id,
					price:Number(this.totalPrice.substr(1))*100
				}
				// console.log(query)
				this.$router.push({
					path:'/biddingPay',
					query:query
				})
			},
				
			//加载表格数据
			loadTableData: function() {
				var accessToken = window.localStorage.accessToken		
				var postData = {
					"poiId":this.$route.query.id,
					"accessToken": accessToken,
					"pageSize": this.pageSize,
					"index": this.index,
					"orderId": this.postOrderId.replace(/\s+/g, "")
				}
				if (this.postOption == '全部') {
				
				} else if (this.postOption == '收入') {
					postData.payType = 1
				} else {
					postData.payType = 0
				}
				
				if (this.postOption2 == '全部') {
				
				} else if (this.postOption2 == '竞价充值') {
					postData.tranType = 1
				} else {
					postData.tranType = 0
				}
				
				if(postData.orderId){
					
				} else{
					delete postData['orderId']
				}
				
				if(this.postPayDate){
					postData.startTime = this.postPayDate[0]
					postData.endTime = this.postPayDate[1]
				}

				
// 				console.log(postData)
// 				return
				this.axios.post('/mgr/bidding/tran/list', postData).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						var list = res.data.data.list
						for (let i = 0; i < list.length; i++) {
							list[i].payment = '¥' + (Number(list[i].payment)/100).toFixed(2)
							list[i].tranTypeText = Number(list[i].tranType)==0?"竞价花费":"竞价充值"
							list[i].payTypeText = Number(list[i].payType)==0?"支出":"收入"
							list[i].payamount = '¥' + (Number(list[i].amount)/100).toFixed(2)
						}
						this.bossName = res.data.data.name
						this.bossPhone = res.data.data.mobile
						this.brandName = res.data.data.branchName
						this.totalPrice = '¥' + (Number(res.data.data.curBiddingBalance)/100).toFixed(2)
						this.userId = res.data.data.userId
						this.tableData = list
						this.total = res.data.data.total
						this.loading = false
						if(list.length <= 0){
							this.$alert.info('暂无数据')
						}
					}
					else{
						this.$alert.error(res.data.msg)
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
	.allPrice{
		text-align: left;
		padding-left: 50px;
		color: #5d5d5d;
		margin: 40px 0 10px;
	}
	.allPrice span:nth-child(2n){
		margin-right: 50px;
	}
</style>
