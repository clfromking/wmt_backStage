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
export{
	error,
	success,
	info
}