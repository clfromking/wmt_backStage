<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item>账号管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="clear">
				<div class="demo-input-suffix">
					姓名：
					<el-input placeholder="请输入姓名" v-model="name" maxLength='10' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					手机号：
					<el-input placeholder="请输入手机号" v-model="phone" maxLength='11' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					状态：
					<el-select v-model="optionValue" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
			</div>


		</div>

		<div class="body">
			<div class="clear btns">
				<el-button style='margin-right: 24px;' @click='queryMsg' type="primary fl">查询</el-button>
				<el-button type="primary fl" @click='clearQuery'>清空查询条件</el-button>
				<el-button type="primary fr" data-typeId='2' @click='routerTo($event)'>添加</el-button>
			</div>
			<div class="table">
				<template>
					<el-table :data="tableData" v-loading="loading" style="width: 100%;display: inline-block;">
						<el-table-column prop="name" label="姓名" row-class-name='test' align='center' width="311%">
						</el-table-column>
						<el-table-column prop="mobile" label="手机号" align='center' width="311%">
						</el-table-column>
						<el-table-column prop="isEnabled" width="311%" align='center' label="状态">
						</el-table-column>
						<el-table-column prop="updTime" label="最近登录时间" align='center' width="311%">
						</el-table-column>
						<el-table-column label="操作" align='center' width="311%">
							<template slot-scope="scope">
								<el-button data-typeId='0'  @click='routerTo($event,scope.row)' type="text" size="small">查看</el-button>
								<el-button data-typeId='1' @click='routerTo($event,scope.row)' type="text" size="small">编辑</el-button>
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
		name: 'accountAdmin',
		data() {
			return {
				name: '',
				phone: '',
				optionValue: '全部',
				postName: '',
				postPhone: '',
				postOption: '全部',
				options: [{
						"label": '全部',
						'value': '全部'
					},
					{
						"label": '启用',
						'value': '启用'
					},
					{
						"label": '停用',
						'value': '停用'
					},
				],
				tableData: '',
				pageSize: 10,
				index: 0,
				total: 0,
				loading: true
			}
		},
		mounted: function() {
			
			this.minusPrice()
			console.log(this.$store.state.roles)
			this.loadTableData()
		},
		methods: {
			minusPrice() {
				this.$store.commit('changeRoles', 2); //提交`minusPrice,payload为2
			},
			//分页改变
			handleCurrentChange: function(val) {
				this.index = val - 1
				this.loading = true
				this.loadTableData()
			},

			//查询
			queryMsg: function() {
				if (this.name == '' && this.phone == '' && this.optionValue == '全部') {
					this.$alert.info('请输入查询条件')
					return
				} else {
					this.index = 0
					this.postName = this.name
					this.postPhone = this.phone
					this.postOption = this.optionValue
					this.loadTableData()
				}
			},

			//清空查询条件
			clearQuery: function() {
				if (this.name == '' && this.phone == '' && this.optionValue == '全部') {
					this.$alert.info('暂无查询条件')
					return
				} 
				this.name = ''
				this.phone = ''
				this.optionValue = '全部'
				this.postName = ''
				this.postPhone = ''
				this.postOption = '全部'
				this.index = 0
				this.$alert.success('已清空')
				this.loadTableData()
			},

			//跳转
			routerTo: function(e,row) {
				var type = 0
				if(e.target.innerText == '查看'){
					
				}
				else if(e.target.innerText == '编辑'){
					type = 1
				}
				else{
					type = 2
				}
				var query = {
					type: type
				}
				// console.log(e)
				if(row){
					query.id = row.id
				}
				
				this.$router.push({
					path: '/accountOperation',
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
					"name": this.postName.replace(/\s+/g, ""),
					"mobile": this.postPhone.replace(/\s+/g, ""),
					"isEnabled": isEnabled
				}
				if (postData.name) {

				} else {
					delete postData['name']
				}

				if (postData.mobile) {

				} else {
					delete postData['mobile']
				}

// 				if (postData.isEnabled) {
// 
// 				} else {
// 					delete postData['isEnabled']
// 				}
				// console.log(postData)
				this.axios.post('/mgr/user/list', postData).then(res => {
					// console.log(res)
					if (res.data.code == 200) {
						var list = res.data.data.list
						for (let i = 0; i < list.length; i++) {
							if (list[i].isEnabled == 1) {
								list[i].isEnabled = '启用'
							} else {
								list[i].isEnabled = '停用'
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
