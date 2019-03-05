<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{ path: '/memberAdmin' }">会员管理</el-breadcrumb-item>
			<el-breadcrumb-item>查看</el-breadcrumb-item>
		</el-breadcrumb>
		<div class='content'>
			<p>
				<span>品牌名称：</span>
				<span>{{branchName}}</span>
			</p>
			<p>
				<span>老板手机号：</span>
				<span>{{poiUserMobile}}</span>
			</p>
			<p>
				<span>会员期限：</span>
				<span>{{expiredAt}}</span>
			</p>
			<div class="listDiv">
				<span class="specialSpan" style="vertical-align: top;">历史购买记录：</span>
				<div class="list">
					<div class="listItem" v-for='item in recordList'>
						<p>
							<span>购买人：</span>
							<span>{{item.poiUserMobile}}</span>
							<span>{{item.name}}</span>
						</p>
						<p>
							<span>购买商品：</span>
							<span>{{item.durationUnitText}}</span>
							<!-- <span>{{item.name}}</span> -->
						</p>
						<p>
							<span>购买时间：</span>
							<span>{{item.buyTime}}</span>
						</p>
						<p>
							<span>会员期限：</span>
							<span>{{item.buyTime}} - {{item.timeEnd}}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
		<el-button type='primary' @click='back'>返回</el-button>
	</div>
</template>

<script>
	export default{
		name:'examineMemberRecord',
		data() {
			return {
				branchName:'',
				poiUserMobile:'',
				expiredAt:'',
				recordList:''
			}
		},
		mounted:function(){
			this.loadMemberRecord()
		},
		methods: {
			loadMemberRecord:function(){
				var localStorage = window.localStorage
				this.axios.post('/mgr/m/member/history',{"accessToken":localStorage.accessToken,"poiId":this.$route.query.id}).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						if(res.data.data.list <= 0){
							this.$alert.info('暂无数据，已为您返回')
							setTimeout(()=>{
								this.$router.back(-1)
							},1500)
							return
						}
						this.branchName = res.data.data.branchName
						this.poiUserMobile = res.data.data.poiUserMobile
						this.expiredAt = res.data.data.expiredAt
						for(let i =0;i<res.data.data.list.length;i++){
							if(res.data.data.list[i].durationUnit == 'DAY'){
								res.data.data.list[i].durationUnitText = '包日卡'
							}
							else if(res.data.data.list[i].durationUnit == 'WEEK'){
								res.data.data.list[i].durationUnitText = '包周卡'
							}
							else if(res.data.data.list[i].durationUnit == 'MONTH' && res.data.data.list[i].duration !== 3){
								res.data.data.list[i].durationUnitText = '包月卡'
							}
							else if(res.data.data.list[i].durationUnit == 'MONTH' && res.data.data.list[i].duration == 3){
								res.data.data.list[i].durationUnitText = '包季卡'
							}
							else if(res.data.data.list[i].durationUnit == 'YEAR'){
								res.data.data.list[i].durationUnitText = '包年卡'
							}
						}
						this.recordList = res.data.data.list
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
