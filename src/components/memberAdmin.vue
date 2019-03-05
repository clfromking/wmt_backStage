<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item>会员管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="clear">
				<div class="demo-input-suffix">
					品牌名称：
					<el-input placeholder="请输入品牌名称" v-model="brandName" maxLength='20' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					<div class="block">
						<span class="demonstration">会员期限：</span>
						<el-date-picker :default-time="['00:00:00','23:59:00']" value-format="yyyy-MM-dd HH:mm:ss" unlink-panels v-model="timeLimit" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</div>
			</div>


		</div>

		<div class="body">
			<div class="clear btns">
				<el-button style='margin-right: 24px;' @click='queryMsg' type="primary fl">查询</el-button>
				<el-button type="primary fl" @click='clearQuery'>清空查询条件</el-button>
				<el-button type="primary fr" @click='routerTo()'>会员卡设置</el-button>
			</div>
			<div class="table">
				<template>
					<el-table :data="tableData" v-loading="loading" style="width: 100%;display: inline-block;">
						<el-table-column prop="branchName" label="品牌名称" row-class-name='test' align='center' width="518%">
						</el-table-column>
						<el-table-column prop="expiredAt" label="会员期限" align='center' width="518%">
						</el-table-column>
						<el-table-column label="操作" align='center' width="518%">
							<template slot-scope="scope">			
								<el-button  @click='examine(scope.row)' type="text" size="small">查看</el-button>
								
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
		name: 'memberAdmin',
		data() {
			return {
				brandName:'',
				timeLimit:'',
				postBrandName: '',
				posttimeLimit:'',
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
				
				if (this.brandName.replace(/\s+/g, "") == '' && this.timeLimit == '') {
					this.$alert.info('请输入查询条件')
					return
				} else {
					this.index = 0
					this.postBrandName = this.brandName
					this.posttimeLimit = this.timeLimit
					this.loadTableData()
				}
			},

			//清空查询条件
			clearQuery: function() {
				if (this.brandName.replace(/\s+/g, "") == '' && this.timeLimit == '') {
					this.$alert.info('暂无查询条件')
					return
				}
				
				this.brandName = ''
				this.timeLimit = ''
				this.postBrandName = ''
				this.posttimeLimit = ''
				this.index = 0
				this.$alert.success('已清空')
				this.loadTableData()
			},

			//跳转
			routerTo: function() {
				this.$router.push({
					path: '/setMemberCard'
				})
			},
			
			//查看
			examine:function(row){
				this.$router.push({
					path: '/examineMemberRecord',
					query: {
						id:row.id
					}
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
					"branchName": this.postBrandName.replace(/\s+/g, ""),
				}
				if (postData.branchName) {

				} else {
					delete postData['branchName']
				}

				
				if(this.posttimeLimit){
					postData.startTime = this.posttimeLimit[0]
					postData.endTime = this.posttimeLimit[1]
				}

				
				// console.log(postData)
				this.axios.post('/mgr/m/member/list', postData).then(res => {
					console.log(res)
					if (res.data.code == 200) {
						var list = res.data.data.list
						this.tableData = list
						this.total = res.data.data.total
						this.loading = false
						if(list.length <= 0){
							this.$alert.info('暂无数据')
						}
					}
				}).catch(error=>{
					this.$alert.error('网络错误，请刷新重试')
					this.loading = false
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
</style>
