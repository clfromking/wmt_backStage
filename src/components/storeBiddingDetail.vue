<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{path:'/storeBiddingAccount'}">商户竞价账户</el-breadcrumb-item>
			<el-breadcrumb-item :to="{path:'/storeBiddingListDetail?id='+this.$route.query.poiId}">账户详情</el-breadcrumb-item>
			<el-breadcrumb-item>收支记录详情</el-breadcrumb-item>
		</el-breadcrumb>
		<div class='content'>
			<p>
				<span>交易单号：</span>
				<span>{{allData.orderId}}</span>
			</p>
			<p>
				<span>交易类型：</span>
				<span>{{allData.tranType==0?"竞价花费":"竞价充值"}}</span>
			</p>
			<p>
				<span>收支类型：</span>
				<span>{{allData.payType==0?"支出":"收入"}}</span>
			</p>
			<p>
				<span>金额：</span>
				<span>{{allData.payamount}}</span>
			</p>
			<p>
				<span>交易时间：</span>
				<span>{{allData.createTime}}</span>
			</p>
			<p>
				<span>操作人：</span>
				<span>{{allData.user}} ({{allData.mobile}})</span>
			</p>
			
		</div>
		<el-button type='primary' @click='back'>返回</el-button>
	</div>
</template>

<script>
	export default{
		name:'storeBiddingDetail',
		data() {
			return {
				allData:{
					orderId:'',
					tranType:"",
					payType:'',
					payamount:'',
					createTime:'',
					user:'',
					summary:'',
					mobile:''
				}
			}
		},
		mounted:function(){
			this.loadMemberRecord()
		},
		methods: {
			loadMemberRecord:function(){
				var localStorage = window.localStorage
				var postData = {
					"accessToken":localStorage.accessToken,
					"poiId":this.$route.query.poiId,
					"orderId":this.$route.query.orderId,
					"payType":this.$route.query.payType
				}
				this.axios.post('/mgr/bidding/tran/detail',postData).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						res.data.data.payamount = '¥' + (Number(res.data.data.amount)/100).toFixed(2)
						this.allData = res.data.data
						// this.allData.payamount = '¥' + (Number(res.data.data.amount)/100).toFixed(2)
						// console.log(this.allData.payamount)
					}
				})
			},
			
			back:function(){
				this.$router.back(-1)
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
	}
	
	.el-breadcrumb {
		padding-top: 46px;
		/* padding-left: 50px; */
		text-align: left;
		font-size: 16px;
		color: #5d5d5d;
	}
	.content{
		margin-top: 50px;
	}
	p{
		text-align: left;
		position: relative;
		line-height: 60px;
	}
	p span:nth-child(2){
		position: absolute;
		left: 120px;
	}
	.listDiv{
		text-align: left;
		/* width: 500px; */
	}
	.listDiv span{
		position: static;
	}
	.list{
		display: inline-block;
		text-align: left;
		margin-left: 4px;
		height: 300px;
		overflow-y: auto;
		min-width: 500px;
	}
	.specialSpan{
		line-height: 60px;
	}
	.listItem p{
		position: relative;
	}
	.listItem{
		border-bottom: 2px solid #ccc;
		margin-bottom: 10px;
	}
	.listItem p span:nth-child(2){
		position: absolute;
		left: 100px;
	}
	.listItem p span:nth-child(3){
		position: absolute;
		left: 260px;
	}
	.el-button{
		float: left;
		margin-top: 50px;
	}
</style>
