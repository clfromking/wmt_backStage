<template>
	<div>
		<div class="header">
			<el-breadcrumb separator-class="el-icon-arrow-right header-title">
				<el-breadcrumb-item :to="{ path: BreadcrumbUrl }">{{BreadcrumbText}}</el-breadcrumb-item>
				<el-breadcrumb-item>查看</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="detail">
				<span>订单编号：</span>
				<span class="content">{{orderId}}</span>
				<span>手机号：</span>
				<span class="content">{{phone}}</span>
				<span>下单时间：</span>
				<span class="content">{{buyTime}}</span>
				<span>支付时间：</span>
				<span class="content">{{timeEnd}}</span>
			</div>
			
			<div class="orderStatus">
				<span>支付方式：</span>
				<span class="content">{{payWayText}}</span>
				<span>订单状态：</span>
				<span class="content">{{Number(payStatus)==1?"未付款":"已付款"}}</span>
				
			</div>
			
		</div>
		<div class="body clear">
			<div class="table">
				<template>
					<el-table :data="tableData" v-loading="loading" style="width: 100%;display: inline-block;">
						<el-table-column prop="goodsName" label="商品" align='center' width="518%">
						</el-table-column>
						<el-table-column prop="payment" label="单价" align='center' width="518%">
						</el-table-column>
						<el-table-column prop="num" label="数量" align='center' width="518%">
						</el-table-column>
						
					</el-table>
				</template>
			</div>
			<div class="clear">
				<div class="orderDetail fr clear">
					<div class="detailItem">
						<p>商品数量：</p>
						<p>{{totalNum}}个</p>
					</div>
					<div class="detailItem">
						<p>商品总额：</p>
						<p>¥{{total}}</p>
					</div>
					<div class="detailItem">
						<p>优惠金额：</p>
						<p>- ¥{{discounts}}</p>
					</div>
					<div class="actual fr">
						<p>实际支付：</p>
						<p class="actualMoney">¥{{payment}}</p>
					</div>
				</div>
			</div>
			
			<div class="clear">
				<el-button type='primary' @click='back' class='fl backBtn'>返回</el-button>
			</div>
			
			
		</div>
	</div>
</template>

<script>
	export default {
		name: 'showMemberOrderDetail',
		data() {
			return {
				BreadcrumbText: '',
				BreadcrumbUrl:'',
				orderId:'20190118140296062001',
				phone:'',
				buyTime:'',
				timeEnd:'',
				payWayText:'',
				payStatus:'',
				totalNum:0,
				total:0,
				discounts:0,
				payment:0,
				id:"",
				tableData: '',
				pageSize: 10,
				index: 0,
				total: 0,
				loading: true
				
			}
		},
		mounted: function() {
			this.BreadcrumbText = '购买会员订单'
			this.BreadcrumbUrl = '/memberOrder'
			this.loadOrderDetail()
		},
		methods: {
			
			back:function(){
				this.$router.back(-1)
			},
			
			loadOrderDetail:function(){
				var localStorage=window.localStorage;
				this.axios.post('/mgr/member/order/detail',{"accessToken":localStorage.accessToken,"orderId":this.$route.query.orderId}).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						this.orderId = res.data.data.orderId
						this.phone = res.data.data.submitUserMobile
						this.buyTime = res.data.data.buyTime
						this.timeEnd = res.data.data.timeEnd
						switch(Number(res.data.data.payWay)){
							case 1:
								this.payWayText = '银联'
								break;
							case 2:
								this.payWayText = '支付宝'
								break;
							case 3:
								this.payWayText = '微信支付'
								break;
							case 4:
								this.payWayText = '余额支付'
								break;
							default :
								this.payWayText = '未知'
								break;
						}
						this.payStatus = res.data.data.payStatus
						
						this.total = (Number(res.data.data.total)/100).toFixed(2)
						this.payment = ((Number(res.data.data.total) - Number(res.data.data.discount))/100).toFixed(2)
						this.discounts = (Number(res.data.data.discount)/100).toFixed(2)
						
						for(let i =0 ; i<res.data.data.list.length;i++){
							res.data.data.list[i].payment = '¥' + (Number(res.data.data.list[i].payment)/100).toFixed(2)
							res.data.data.list[i].num = 1
							if (res.data.data.list[i].durationUnit=="DAY"){
								res.data.data.list[i].goodsName = "日度会员卡"
							}
							else if (res.data.data.list[i].durationUnit == "WEEK"){
								res.data.data.list[i].goodsName = "周度会员卡"
							}
							else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration !==3 ){
								res.data.data.list[i].goodsName = "月度会员卡"
							}
							else if (res.data.data.list[i].durationUnit == "MONTH" && res.data.data.list[i].duration == 3){
								res.data.data.list[i].goodsName = "季度会员卡"
							}
							else if (res.data.data.list[i].durationUnit == "YEAR"){
								res.data.data.list[i].goodsName = "年度会员卡"
							}
						}
// 						alert()
						this.totalNum = res.data.data.list.length
						this.tableData = res.data.data.list
						this.loading = false
					}
				})
			},
		}
	}
</script>

<style scoped>
	.header {
		height: 229px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
	}
	.body {
		min-height: 491px;
		background: #fff;
		border-radius: 5px;
		box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
		padding: 0 54px 50px;
		margin-top: 21px;
		box-sizing: border-box;
	}
	
	.el-table{
		margin-top: 50px;
	}
	
	.el-breadcrumb {
		padding-top: 36px;
		padding-left: 50px;
		text-align: left;
		font-size: 16px;
		color: #5d5d5d;
		
	}

	.el-form {
		text-align: left;
		margin-top: 21px;
	}

	.el-input {
		/* display: inline-block; */
		width: 12.5rem;
	}

	.el-form-item {
		margin-bottom: 44px;
	}

	.el-checkbox {
		/* display: block; */
	}

	.el-checkbox-group {
		max-height: 200px;
		overflow-y: auto;
		display: inline-block;
		width: 14.5rem;
		box-sizing: border-box;
	}
	
	.detail{
		margin-top: 51px;
		text-align: left;
		padding-left: 50px;
	}
	
	.orderStatus{
		margin-top: 39px;
		text-align: left;
		padding-left: 50px;
	}
	
	.content{
		margin-right: 50px;
	}
	
	.orderDetail{
		width: 300px;
		margin-top: 50px;
		/* margin-right: 100px; */
	}
	
	.detailItem{
		display: flex;
	}
	.detailItem p{
		line-height: 40px;
		width: 100%;
		text-align: left;
	}
	.detailItem:nth-child(3){
		border-bottom: 2px #cee4fe solid;
		padding-bottom: 20px;
	}
	.actual{
		display: flex;
		line-height: 80px;
		width: 200px;
	}
	.actual p{
		width: 100%;
	}
	.actual p:nth-child(1){
		text-align: right;
		padding-right: 5px;
	}
	.actual p:nth-child(2){
		text-align: left;
		padding-left: 5px;
	}
	.actualMoney{
		font-size: 20px;
		color: #faae04;
	}
	.backBtn{
		margin-top: 30px;
	}

</style>
