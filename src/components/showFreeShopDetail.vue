<template>
	<div class="body">
		<el-breadcrumb separator-class="el-icon-arrow-right header-title">
			<el-breadcrumb-item :to="{ path: '/freeShop' }">免租金开店</el-breadcrumb-item>
			<el-breadcrumb-item>查看</el-breadcrumb-item>
		</el-breadcrumb>
		<div class="content">
			<p>
				<span>服务单编号：</span>
				<span>{{allData.id}}</span>
			</p>
			<p>
				<span>品牌名：</span>
				<span>{{allData.brandName}}</span>
			</p>
			<p>
				<span>所在区域：</span>
				<span>{{allData.area}}</span>
			</p>
			<p>
				<span>详细地址：</span>
				<span>{{allData.address}}</span>
			</p>
			<p>
				<span>已上线外卖平台：</span>
				<span>{{allData.platformText}}</span>
			</p>
			<p>
				<span>门店类型：</span>
				<span>{{allData.poiTypeText}}</span>
			</p>
			<p>
				<span>经营类型：</span>
				<span>{{allData.dishCateId}}</span>
			</p>
			<p>
				<span>门店数量：</span>
				<span>{{allData.amount}}</span>
			</p>
			<p>
				<span>姓名：</span>
				<span>{{allData.poiUserName}}</span>
			</p>
			<p>
				<span>手机号：</span>
				<span>{{allData.poiUserMobile}}</span>
			</p>
			<p>
				<span>提交时间：</span>
				<span>{{allData.createTime}}</span>
			</p>
		</div>
		
		<el-button type='primary' @click='back'>返回</el-button>
		
	</div>
</template>

<script>
	export default{
		name:'showFreeShopDetail',
		data() {
			return {
				allData:{
					'brandName':'',
					'amount':'',
					'address':'',
					'poiUserMobile':'',
					'city':'',
					'districts':'',
					'poiUserName':'',
					'platform':'',
					'platformText':'',
					'province':'',
					'createTime':'',
					'dishCateId':'',
					'poiType':'',
					'poiTypeText':'',
					'id':'',
					'area':'',
					
				}
				
			}
		},
		mounted:function(){
			this.loadDetail()
		},
		methods: {
			
			back:function(){
				this.$router.back(-1)
			},
			
			loadDetail:function(){
				var localStorage = window.localStorage
				this.axios.post('/mgr/poi/request/detail',{"accessToken":localStorage.accessToken,'id':this.$route.query.id,'usefor':0}).then(res=>{
					console.log(res)
					if(res.data.code == 200){
						res.data.data.area = res.data.data.province +'-'+ res.data.data.city +'-'+ res.data.data.districts
						if(res.data.data.platform == '1'){
							res.data.data.platformText = '美团'
						}
						else if(res.data.data.platform == '2'){
							res.data.data.platformText = '饿了么'
						}
						else if(res.data.data.platform == '1,2'){
							res.data.data.platformText = '美团、饿了么'
						}
						else{
							res.data.data.platformText = '未知'
						}
						
						if(Number(res.data.data.poiType) == '1'){
							res.data.data.poiTypeText = '单店自创品牌'
						}
						else if(Number(res.data.data.poiType) == '2'){
							res.data.data.poiTypeText = '连锁加盟'
						}
						else if(Number(res.data.data.poiType) == '3'){
							res.data.data.poiTypeText = '连锁直营'
						}
						else{
							res.data.data.poiTypeText = '未知'
						}
						
						this.allData = res.data.data
					}
				})
			}
			
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
		text-align: left;
		color: #606266;
		line-height: 46px;
		margin-top: 40px;
	}
	p{
		position: relative;
	}
	p span:nth-child(2){
		position: absolute;
		left: 180px;
	}
	.el-button{
		margin: 0;
		float: left;
		margin-top: 40px;
	}
</style>
