import Vue from 'vue'


function error(msg,title,showClose){
	Vue.prototype.$notify.error({
		title: title||'错误',
		message: msg,
		showClose: showClose||false
	});
}

function success(msg,title,showClose){
	Vue.prototype.$notify.success({
		title: title||'成功',
		message: msg,
		showClose: showClose||false
	});
}

function info(msg,title,showClose){
	Vue.prototype.$notify.info({
		title: title||'提示',
		message: msg,
		showClose: showClose||false
	})
}

function showModal(content,title,options){
	var promise = new Promise((resolve,reject)=>{
		Vue.prototype.$confirm(content,title,options).then(res=>{
			  resolve(res)
		  }).catch(error=>{
			  reject(error)
		  })
	})
	return promise
}

export{
	error,
	success,
	info,
	showModal
}