<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item>0元抢购</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="clear">
				<div class="demo-input-suffix">
					活动名称：
					<el-input placeholder="请输入活动名称" v-model="activityName" maxLength='' clearable>
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
						<span class="demonstration">日期：</span>
						<!-- <el-date-picker value-format="yyyy-MM-dd" unlink-panels v-model="selectDate" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"> -->
						<el-date-picker value-format="yyyy-MM-dd" v-model="selectDate" type="date" placeholder="选择日期"></el-date-picker>
						</el-date-picker>
					</div>
				</div>
				<div class="demo-input-suffix">
					<div class="block">
						<span class="demonstration">时间段：</span>
						<template>
							<el-time-picker
								v-model="startTime"
								:picker-options="{
									selectableRange: '00:00:00 - 23:59:59'
								}"
								@change='rootEndTime()'
								value-format="HH:mm:ss"
								placeholder="开始时间">
							</el-time-picker>
							-
							<el-time-picker
								
								v-model="endTime"
								value-format="HH:mm:ss"
								:picker-options="{
									selectableRange: selectEndTime(),
								}"
								placeholder="结束时间">
							</el-time-picker>
						  <!-- <el-time-picker
							is-range
							v-model="selectTime"
							range-separator="-"
							value-format="HH:mm:ss"
							start-placeholder="开始时间"
							end-placeholder="结束时间"
							placeholder="选择时间范围">
						  </el-time-picker>
						  -->
						</template> 
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
						<el-table-column prop="name" label="活动名称" align='center' width="311%">
						</el-table-column>
						<el-table-column prop="activeDate" label="日期" align='center' width="311%">
						</el-table-column>
						<el-table-column prop="activeTime" label="时间段" align='center' width="311%">
							<template  slot-scope="scope">
								<div v-for='item in scope.row.times'>
									<span>{{item.timeStart}}  至 {{item.timeEnd}}</span>
								</div>
								
							</template>
						</el-table-column>
						<el-table-column prop="status" label="活动状态" align='center' width="311%">
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
	export default{
		name:'zero',
		data() {
			return {
				activityName: '',
				optionValue:'全部',
				selectDate:'',
				startTime:'',
				endTime:'',
				postActivityName:'',
				postOption:'全部',
				postSelectDate:'',
				postStartTime:'',
				postEndTime:'',
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
				index:0,
				pageSize:10,
				total:0,
				tableData:'',
				loading:true
			}
		},
		mounted:function(){
			this.loadTableData()
		},
		methods: {
			
			//查询
			queryMsg: function() {
				if (this.activityName == '' && this.optionValue == '全部' && this.selectDate == '' && this.startTime == '' && this.endTime == '') {
					this.$alert.info('请输入查询条件')
					return
				} 
				else {
					if((this.startTime == '' && this.endTime) || (this.endTime == '' && this.startTime)){
						this.$alert.error('请输入完整的搜索条件')
						return
					}
					this.index = 0
					this.postActivityName = this.activityName
					this.postOption = this.optionValue
					this.postSelectDate = this.selectDate
					this.postStartTime = this.startTime
					this.postEndTime = this.endTime
					this.loadTableData()
				}
			},
			
			//清空查询条件
			clearQuery: function() {
				if (this.activityName == '' && this.optionValue == '全部' && this.selectDate == '' && this.startTime == '' && this.endTime == '') {
					this.$alert.info('暂无查询条件')
					return
				} 
				this.activityName = ''
				this.selectDate = ''
				this.startTime = ''
				this.endTime = ''
				this.optionValue = '全部'
				this.postActivityName = ''
				this.postSelectDate = ''
				this.postStartTime = ''
				this.postEndTime= ''
				this.postOption = '全部'
				this.index = 0
				this.$alert.success('已清空')
				this.loadTableData()
			},
			
			
			//分页改变
			handleCurrentChange: function(val) {
// 				console.log(this.startTime)
// 				console.log(this.endTime)
// 				return
				this.index = val - 1
				this.loading = true
				this.loadTableData()
			},
			
			//限制结束时间
			selectEndTime:function(){
				if(this.startTime){
					return this.startTime + '-23:59:59'
				}
				else{
					return '00:00:00-23:59:59'
				}
				
			},
			
			
			//初始化结束时间
			rootEndTime:function(){
				this.selectEndTime()
				this.endTime = ''
				// console.log(index,index1)
			},
			
			
			
			
			routerTo:function(e,row){
// 				console.log(e.target.dataset.typeid)
// 				console.log(row.id)
// 				return
				var query = {
					type: e.target.dataset.typeid
				}
				if(row){
					query.id = row.cateId
				}
				this.$router.push({
					path:'/zeroOperation',
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
					"name": this.postActivityName.replace(/\s+/g, ""),
// 					"submitUserMobile": this.postPhone.replace(/\s+/g, ""),
// 					"orderId": this.postOrderId.replace(/\s+/g, "")
				}
				
				if (this.postOption == '全部') {
							
				} else if (this.postOption == '启用') {
					postData.isEnabled = 1
				} else {
					postData.isEnabled = 0
				}
				
				if(this.postSelectDate){
					postData.dateStart = this.postSelectDate
					postData.dateEnd = this.postSelectDate
				}
				
				if(this.postActivityName.replace(/\s+/g, "")){
					
				}
				else{
					delete postData['name']
				}
				
				if(this.postStartTime){
					postData.timeStart = this.postStartTime
					
				}
				if(this.postEndTime){
					postData.timeEnd = this.postEndTime
				}
				
				this.axios.post('/mgr/snap/cate/list', postData).then(res => {
					// console.log(res)
					if (res.data.code == 200) {
						var list = res.data.data.list
						console.log(res.data.data)
						for (let i = 0; i < list.length; i++) {
							list[i].activeDate = list[i].dateSnap
							list[i].activeTime = list[i].timeStart + ' 至 ' + list[i].timeEnd
							if(Number(list[i].isEnabled) == 0){
								list[i].status = '停用'
							}
							else{
								list[i].status = '启用'
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
		margin-right:20px;
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
	.el-select{
		width: 200px;
	}
</style>
