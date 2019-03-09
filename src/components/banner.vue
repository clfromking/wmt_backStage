<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item>banner管理</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="clear">
				<div class="demo-input-suffix">
					banner名称：
					<el-input placeholder="请输入banner名称" v-model="bannerName" maxLength='10' clearable>
					</el-input>
				</div>
				<div class="demo-input-suffix">
					状态：
					<el-select v-model="optionValue" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</div>
				<div class="demo-input-suffix">
					<div class="block">
						<span class="demonstration">显示日期：</span>
						<el-date-picker value-format="yyyy-MM-dd" unlink-panels v-model="showDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
				</div>
				<div class="demo-input-suffix">
					<div class="block">
						<span class="demonstration">创建日期：</span>
						<el-date-picker :default-time="['00:00:00','23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" unlink-panels v-model="createDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期">
						</el-date-picker>
					</div>
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
						<el-table-column prop="name" label="banner名称" row-class-name='test' align='center' width="222%">
						</el-table-column>
						<el-table-column  label="图片" row-class-name='test' align='center' width="222%">
							<template slot-scope="scope">
								<div class="imgDiv">
									<img :src="scope.row.imgUrl" alt="">
								</div>
							</template>
						</el-table-column>
						<el-table-column prop="showDate" label="显示日期" row-class-name='test' align='center' width="222%">
						</el-table-column>
						<el-table-column prop="isEnabled" label="状态" align='center' width="222%">
						</el-table-column>
						<el-table-column prop="createDate" width="222%" align='center' label="创建时间">
						</el-table-column>
						<el-table-column prop="showSeq" label="排序" align='center' width="222%">
						</el-table-column>
						<el-table-column label="操作" align='center' width="222%">
							<template slot-scope="scope">
								<el-button data-typeId='0' @click='routerTo($event,scope.row)' type="text" size="small">查看</el-button>
								<el-button data-typeId='1' @click='routerTo($event,scope.row)' type="text" size="small">编辑</el-button>
								<el-button @click='deleteBanner(scope.row)' type="text" size="small">删除</el-button>
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
		name: 'banner',
		data() {
			return {
				bannerName: '',
				optionValue: '全部',
				showDate:'',
				createDate:'',
				postName: '',
				postOption: '全部',
				postShowDate:'',
				postCreateDate:'',
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
			this.loadTableData()
		},
		methods: {
			//分页改变
			handleCurrentChange: function(val) {
				console.log(val)
				this.index = val - 1
				this.loading = true
				this.loadTableData()
			},

			//查询
			queryMsg: function() {
				console.log(this.showDate)
				if (this.bannerName == '' && this.showDate == '' && this.createDate == '' && this.optionValue == '全部') {
					return
				} else {
					this.index = 0
					this.postName = this.bannerName
					this.postShowDate = this.showDate
					this.postCreateDate = this.createDate
					this.postOption = this.optionValue
					this.loadTableData()
				}
			},

			//清空查询条件
			clearQuery: function() {
				this.bannerName = ''
				this.showDate = ''
				this.createDate = ''
				this.optionValue = '全部'
				this.postName = ''
				this.postShowDate = ''
				this.postCreateDate = ''
				this.postOption = '全部'
				this.index = 0
				this.loadTableData()
			},

			//跳转
			routerTo: function(e, row) {
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
				if (row) {
					query.id = row.id
				}
				this.$router.push({
					path: '/bannerOperation',
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
				}
				if (postData.name) {

				} else {
					delete postData['name']
				}
				
				if (this.postOption == '全部') {
					postData.isEnabled = -1
				} else if (this.postOption == '启用') {
					postData.isEnabled = 1
				} else {
					postData.isEnabled = 0
				}
				
				if(this.postShowDate){
					postData.expiredStart = this.postShowDate[0]
					postData.expiredEnd = this.postShowDate[1]
				}
				
				if(this.postCreateDate){
					postData.createDateStart = this.postCreateDate[0]
					postData.createDateEnd = this.postCreateDate[1]
				}
				
				// console.log(postData)
				this.axios.post('/mgr/banner/list', postData).then(res => {
					// console.log(res)
					if (res.data.code == 200) {
						var list = res.data.data.list
						for (let i = 0; i < list.length; i++) {
							if (list[i].isEnabled == 1) {
								list[i].isEnabled = '启用'
							} else {
								list[i].isEnabled = '停用'
							}
							list[i].showDate = list[i].expiredStart + ' 至 ' + list[i].expiredEnd
						}
						
						this.tableData = list
						this.total = res.data.data.total
						this.loading = false
						lastPostData = postData
					}
				})
			},
		
			//删除banner
			deleteBanner:function(row){
				var options = { confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}
				this.$alert.showModal('确定要将此banner删除？','提示',options).then(res=>{
					console.log(row.id)
					this.axios.post('/mgr/banner/rm',{"accessToken":window.localStorage.accessToken,"id":row.id}).then(res=>{
						if(res.data.code == 200){
							this.$alert.success('删除成功')
							this.loadTableData()
						}
					})
				})
			},
			
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
	
	.demo-input-suffix:nth-child(2){
		margin-right: 5rem;
	}
	.el-date-picker{
		width: 20%;
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
		width: 10.5rem;
	}
	.el-select{
		width: 10.5rem;
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
	.imgDiv{
		display: inline-block;
		width: 60px;
		height: 60px;
	}
	.imgDiv img{
		display: block;
		width: auto;
		height: auto;
		max-width: 100%;
		height: 100%;
		margin: auto;
	}
</style>
