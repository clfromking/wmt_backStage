<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item :to="{path:'/storeBalanceAccount'}">商户余额账户</el-breadcrumb-item>
				<el-breadcrumb-item>账户详情</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="allPrice">
				<span>品牌名称：</span>
				<span>{{brandName}}</span>
				<span>老板姓名：</span>
				<span>{{bossName}}</span>
				<span>老板手机号：</span>
				<span>{{bossPhone}}</span>
				<!-- <span>总余额：</span>
				<span>{{totalPrice}}</span>
				<span>现金账户总余额：</span>
				<span>{{totalCashPrice}}</span>
				<span>赠送账户总余额：</span>
				<span>{{totalRedPrice}}</span> -->
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
						<el-date-picker :default-time="['00:00:00','23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" unlink-panels v-model="payDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
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
		
		<div class="prices-div">
			<div class="price-item">
				<p class="price-item-title">总金额</p>
				<p class="moneys">{{totalPrice}}</p>
				<p class="alts">总金额</p>
			</div>
			<div class="price-item">
				<p class="price-item-title">现金账户总余额</p>
				<div class="moneys specialMoneys">{{totalCashPrice}}</div>
				<div class="plan-div fr">
					<p>赠送账户总余额</p>
					<p>{{totalRedPrice}}</p>
					<div class="outPlan">
						<div class="inPlan"></div>
					</div>
				</div>
			</div>
			<div class="price-item">
				<p class="price-item-title">赠送账户总余额</p>
				<p class="moneys">{{totalRedPrice}}</p>
				<p class="alts">赠送账户总余额</p>
			</div>
		</div>
		
		<div class="body">
			<div class="clear btns">
				<el-button style='margin-right: 24px;' @click='queryMsg' type="primary fl">查询</el-button>
				<el-button type="primary fl" @click='clearQuery'>清空查询条件</el-button>
				<el-button type="success fr" data-typeId='2' @click='exportExcel'>导出为excel</el-button>
			</div>
			<div class="table">
				<template>
					<el-table id='table' :data="tableData" v-loading="loading" style="width: 100%;display: inline-block;">
						<el-table-column prop="orderId" label="交易单号" row-class-name='test' align='center' width="222%">
						</el-table-column>
						<el-table-column prop="tranTypeText" label="交易类型" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="payTypeText" label="收支类型" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="payamount" label="金额" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="summary" label="涉及账户" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="tranTime" label="交易时间" align='center' width="222%">
						</el-table-column>
						<el-table-column label="操作" align='center' width="222%">
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
	import FileSaver from 'file-saver'
    import XLSX from 'xlsx'
	export default {
		name: 'storeBalanceListDetail',
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
						"label": '会员充值',
						'value': '会员充值'
					},
					{
						"label": '余额充值',
						'value': '余额充值'
					},
				],
				totalPrice:'',
				totalCashPrice:'',
				totalRedPrice:'',
				brandName:'',
				bossName:'',
				bossPhone:'',
				allTableData:''
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
					path: '/storeBalanceDetail',
					query: query
				})
			},

		
				
			//加载表格数据
			loadTableData: function() {
				var accessToken = window.localStorage.accessToken		
				var postData = {
					"poiId":this.$route.query.id,
					"accessToken": accessToken,
					
					"orderId": this.postOrderId.replace(/\s+/g, "")
				}
				if (this.postOption == '全部') {
				
				} else if (this.postOption == '收入') {
					postData.payType = 1
				} else {
					postData.payType = 0
				}
				
				if (this.postOption2 == '全部') {
				
				} else if (this.postOption2 == '余额充值') {
					postData.tranType = 1
				} else {
					postData.tranType = 0
				}
				
				if(postData.orderId){
					
				} else{
					delete postData['orderId']
				}
				
				if(this.postPayDate){
					postData.timeStart = this.postPayDate[0]
					postData.timeEnd = this.postPayDate[1]
				}

				
// 				console.log(postData)
// 				return
				this.axios.post('/mgr/balance/tran/list', postData).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						var list = res.data.data.list
						for (let i = 0; i < list.length; i++) {
							list[i].payment = '¥' + (Number(list[i].payment)/100).toFixed(2)
							list[i].tranTypeText = Number(list[i].tranType)==0?"会员充值":"余额充值"
							list[i].payTypeText = Number(list[i].payType)==0?"支出":"收入"
							list[i].payamount = '¥' + (Number(list[i].amount)/100).toFixed(2)
						}
						this.bossName = res.data.data.name
						this.bossPhone = res.data.data.mobile
						this.brandName = res.data.data.branchName
						this.totalPrice = '¥' + (Number(res.data.data.curBalance)/100).toFixed(2)
						this.totalRedPrice = '¥' + (Number(res.data.data.curRedBalance)/100).toFixed(2)
						this.totalCashPrice = '¥' + ((Number(res.data.data.curBalance)-Number(res.data.data.curRedBalance))/100).toFixed(2)
						var showList = []
						this.allTableData = JSON.parse(JSON.stringify(list))
						for(let i = 0;i<this.pageSize;i++){
							if(this.allTableData[(this.pageSize*this.index)+i]){
								showList.push(this.allTableData[(this.pageSize*this.index)+i])
							}
							
						}
						this.tableData = showList
						this.total = res.data.data.total
						this.loading = false
						if(list.length <= 0){
							this.$alert.info('暂无数据')
						}
					}
				})
			},
			
			//导出
			 exportExcel () { 
				 /* generate workbook object from table */ 
				 var wb = XLSX.utils.table_to_book(document.querySelector('#table')) 
				 /* get binary string as output */ 
				 var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' }) 
				 try { 
					 FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'sheetjs.xlsx') 
					}
				 catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) } return wbout 
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
	.prices-div{
		display: flex;
		height: 300px;
		
		margin-top: 20px;
	}
	.price-item{
		width: 100%;
		height: 300px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		margin-right: 20px;
		padding: 0 22px;
		text-align: left;
	}
	.price-item:nth-child(3){
		margin-right: 0;
	}
	.price-item-title{
		height: 74px;
		line-height: 74px;
		font-size: 16px;
		color: #5D5D5D;
		font-weight: bold;
		text-align: left;
		padding-left: 12px;
		border-bottom: 1px solid #e6e6e6;
	}
	.moneys{
		font-size: 40px;
		color: #5D5D5D;
		text-align: left;
		padding-left: 12px;
		margin-top: 50px;
	}
	.alts{
		font-size: 14px;
		color: #5D5D5D;
		padding-left: 18px;
		text-align: left;
		margin-top: 24px;
	}
	.specialMoneys{
		display: inline-block;
	}
	.plan-div{
		width: 50%;
		height: 225px;
	}
	.plan-div p:nth-child(1){
		font-size: 14px;
		color: #5D5D5D;
		padding-top: 38px;
	}
	.plan-div p:nth-child(2){
		font-size: 30px;
		color: #5D5D5D;
		margin-top: 5px;
	}
	.outPlan{
		width: 217px;
		height: 6px;
		background: #E8E8E8;
		border-radius: 3px;
		margin-top: 16px;
	}
	.inPlan{
		width: 90%;
		height: 6px;
		background-image: linear-gradient(90deg, #6091FE 0%, #6DABFD 100%);
		border-radius: 3px;
		
	}
</style>
