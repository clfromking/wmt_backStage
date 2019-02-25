<template>
	<div>
		<div class="clear">
			<div class="demo-input-suffix">
				姓名：
				<el-input
				  placeholder="请输入内容"
				  v-model="name"
				  maxLength='10'
				  clearable>
				</el-input>
			</div>
			<div class="demo-input-suffix">
				手机号：
				<el-input
				  placeholder="请输入内容"
				  v-model="phone"
				  maxLength='11'
				  clearable>
				</el-input>
			</div>
			<div class="demo-input-suffix">
				状态：
				<el-select v-model="optionValue" clearable placeholder="请选择">
					<el-option
					  v-for="item in options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				</el-select>
			</div>
			
		</div>
		
		
		<div class="clear btns">
			<el-button type="primary fl">查询</el-button>
			<el-button type="primary fl">清空查询条件</el-button>
			<el-button type="primary fr">添加</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'accountAdmin',
		data() {
			return {
				name:'',
				phone:'',
				options:[
					{"label":'全部','value':'全部'},
					{"label":'启用','value':'启用'},
					{"label":'停用','value':'停用'},
				],
				optionValue:'全部'
			}
		},
	}
</script>

<style scoped>
	.demo-input-suffix{
		display: inline-block;
		float: left;
		margin-right: 1.25rem;
	}
	.el-input{
		display: inline-block;
		width: 12.5rem;
	}
	.btns{
		margin-top: 1.25rem;
	}
</style>
