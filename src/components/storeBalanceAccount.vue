<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item>商户余额账户</el-breadcrumb-item>
			</el-breadcrumb>
			<!-- <div class="allPrice">
				<span>总余额：</span>
				<span>{{totalPrice}}</span>
				<span>现金账户总余额：</span>
				<span>{{totalCashPrice}}</span>
				<span>赠送账户总余额：</span>
				<span>{{totalRedPrice}}</span>
			</div> -->
			<div class="clear">
				<div class="demo-input-suffix">
					品牌名称：
					<el-input placeholder="请输入品牌名称" v-model="brandName" maxLength='10' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					老板姓名：
					<el-input placeholder="请输入老板姓名" v-model="name" maxLength='10' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					老板手机号：
					<el-input placeholder="请输入老板手机号" v-model="phone" maxLength='11' clearable>
					</el-input>
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
				<!-- <el-button type="primary fr" data-typeId='2' @click='routerTo($event)'>添加</el-button> -->
			</div>
			<div class="table">
				<template>
					<el-table :data="tableData" v-loading="loading" style="width: 100%;display: inline-block;">
						<el-table-column prop="brandName" label="品牌名称" row-class-name='test' align='center' width="222%">
						</el-table-column>
						<el-table-column prop="name" label="老板姓名" row-class-name='test' align='center' width="222%">
						</el-table-column>
						<el-table-column prop="mobile" label="老板手机号" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="totalBalance" label="总金额" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="cashBalance" label="现金账户余额" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="redBalance" width="222%" align='center' label="赠送账户余额">
						</el-table-column>
						
						<el-table-column label="操作" align='center' width="222%">
							<template slot-scope="scope">
								<el-button  @click='routerTo(scope.row)' type="text" size="small">查看</el-button>
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
		name: 'storeBalanceAccount',
		data() {
			return {
				name: '',
				phone: '',
				brandName:'',
				postName: '',
				postPhone: '',
				postBrandName:'',
				tableData: '',
				pageSize: 10,
				index: 0,
				total: 0,
				loading: true,
				totalPrice:'',
				totalCashPrice:'',
				totalRedPrice:''
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
				// console.log(this.brandName)
				if (this.name == '' && this.phone == '' && this.brandName == '') {
					this.$alert.info('请输入查询条件')
					return
				} else {
					this.index = 0
					this.postName = this.name
					this.postPhone = this.phone
					this.postBrandName = this.brandName
					this.loadTableData()
				}
			},

			//清空查询条件
			clearQuery: function() {
				if (this.name == '' && this.phone == '' && this.brandName == '') {
					this.$alert.info('暂无查询条件')
					return
				} 
				this.name = ''
				this.phone = ''
				this.brandName = ''
				this.postName = ''
				this.postPhone = ''
				this.postBrandName = ''
				this.index = 0
				this.$alert.success('已清空')
				this.loadTableData()
			},

			//跳转
			routerTo: function(row) {
				var query = {
					
				}
// 				console.log(row.id)
// 				return
				if(row){
					query.id = row.id
				}
				this.$router.push({
					path: '/storeBalanceListDetail',
					query: query
				})
			},

		
				
			//加载表格数据
			loadTableData: function() {
				var accessToken = window.localStorage.accessToken
				var isEnabled = ''
				var postData = {
					"accessToken": accessToken,
					"pageSize": this.pageSize,
					"index": this.index,
					"name": this.postName.replace(/\s+/g, ""),
					"branchName":this.postBrandName.replace(/\s+/g, ""),
					"mobile": this.postPhone.replace(/\s+/g, ""),
				}
				if (postData.name) {

				} else {
					delete postData['name']
				}

				if (postData.mobile) {

				} else {
					delete postData['mobile']
				}
				
				if(postData.branchName){
					
				} else{
					delete postData['branchName']
				}
				
// 				if (postData.isEnabled) {
// 
// 				} else {
// 					delete postData['isEnabled']
// 				}
				// console.log(postData)
				this.axios.post('/mgr/poi/account/list', postData).then(res => {
					// console.log(res)
					if (res.data.code == 200) {
						var list = res.data.data.list
						for (let i = 0; i < list.length; i++) {
							list[i].redBalance = '¥' + (Number(list[i].curRedBalance)/100).toFixed(2)
							list[i].totalBalance = '¥' + (Number(list[i].curBalance)/100).toFixed(2)
							list[i].cashBalance = '¥' + ((Number(list[i].curBalance)-Number(list[i].curRedBalance))/100).toFixed(2)
						}
						this.tableData = list
						this.total = res.data.data.total
						this.totalPrice = '¥' + (Number(res.data.data.sumCurBalance)/100).toFixed(2)
						this.totalRedPrice = '¥' + (Number(res.data.data.sumCurRedBalance)/100).toFixed(2)
						this.totalCashPrice = '¥' + ((Number(res.data.data.sumCurBalance)-Number(res.data.data.sumCurRedBalance))/100).toFixed(2)
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
		margin-right: 50px;
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
