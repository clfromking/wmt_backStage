<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{ path: '/memberAdmin'}">会员管理</el-breadcrumb-item>
			<el-breadcrumb-item>会员卡设置</el-breadcrumb-item>
		</el-breadcrumb>
		
		<div class="table">
			<template>
				<el-table :data="tableData" v-loading="loading" style="width: 100%;display: inline-block;">
					<el-table-column prop="name" label="会员卡名称" row-class-name='test' align='center' width="222%">
					</el-table-column>
					<el-table-column prop="timeLength" label="会员卡时长" align='center' width="222%">
					</el-table-column>
					<el-table-column prop="price" label="价格" align='center' width="222%">
					</el-table-column>
					<el-table-column prop="newDiscountText" label="优惠" align='center' width="222%">
					</el-table-column>
					<el-table-column prop="showSeq" label="排序" align='center' width="222%">
					</el-table-column>
					<el-table-column prop="mainRecmdText" label="是否推荐" align='center' width="222%">
					</el-table-column>
					<el-table-column label="操作" align='center' width="222%">
						<template slot-scope="scope">			
							<el-button  @click='goEdit(scope.row)' type="text" size="small">编辑</el-button>
							<el-button v-if='scope.row.mainRecmdText!="推荐"' @click='setRecmd($event,scope.row)' type="text" size="small">设为推荐</el-button>
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
</template>

<script>
	export default{
		name:'setMemberCard',
		data() {
			return {
				total: 0,
				pageSize:10,
				index:0,
				tableData:'',
				loading:true
			}
		},
		mounted:function(){
			this.loadTableData()
		},
		methods: {
			//分页改变
			handleCurrentChange: function(val) {
				this.index = val - 1
				this.loading = true
				this.loadTableData()
			},
			
			//编辑
			goEdit:function(row){
				console.log(row)
				this.$router.push({
					path:'/editMemberCard',
					query:{
						id:row.id
					}
				})
			},
			
			//设为推荐
			setRecmd:function(e,row){
				console.log(row)
				var localStorage = window.localStorage
				var options = { confirmButtonText: '确定',cancelButtonText: '取消',type: 'warning'}
				this.$alert.showModal('确定将该会员卡设置为推荐？','提示',options).then(()=>{
					this.axios.post('/mgr/m/card/suggest',{"accessToken":localStorage.accessToken,"cardId":row.id,"flag":1}).then(res=>{
						if(res.data.code == 200){
							this.$alert.success('设置成功');
							this.loadTableData()
						}
					})
				}).catch(()=>{
// 					this.$message({
// 						type: 'info',
// 						message: '删除shiba!'
// 					});
				})
			},
			
			loadTableData:function(){
				var localStorage = window.localStorage
				this.axios.get('/mgr/m/card/list?accessToken=' + localStorage.accessToken).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						this.tableData = res.data.data
						this.total = res.data.data.length
						var unit = ''
						for(let i=0;i<res.data.data.length;i++){
							if(res.data.data[i].durationUnit == 'DAY'){
								unit = '日'
							}
							else if(res.data.data[i].durationUnit == 'WEEK'){
								unit = '周'
							}
							else if(res.data.data[i].durationUnit == 'MONTH'){
								unit = '月'
							}
							else if(res.data.data[i].durationUnit == 'YEAR'){
								unit = '年'
							}
							res.data.data[i].timeLength = res.data.data[i].duration + unit
							res.data.data[i].mainRecmdText = res.data.data[i].mainRecmd==1?"推荐":"不推荐"
							res.data.data[i].newDiscountText = res.data.data[i].newDiscount==0?"无":"新用户立减"+(Number(res.data.data[i].newDiscount)/100)
							res.data.data[i].price =  '¥' + (Number(res.data.data[i].price)/100).toFixed(2)
						}
						this.loading = false
					}
				})
			},
		},
	}
</script>

<style scoped>
	.body {
		min-height: 720px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 0 54px 50px;
		/* margin-top: 21px; */
		box-sizing: border-box;
		position: relative;
	}
	.el-breadcrumb {
		padding-top: 46px;
		padding-left: 50px;
		text-align: left;
		font-size: 16px;
		color: #5d5d5d;
	}
	.table {
		text-align: center;
		margin-top: 50px;
	}
	.block{
		position: absolute;
		left: 0;
		right: 0;
		/* top: 0; */
		bottom: 30px;
		margin: auto;
	}
</style>
