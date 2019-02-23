import Vue from 'vue'


function error(title,msg,showClose){
	Vue.prototype.$notify.error({
		title: title,
		message: msg,
		showClose: showClose
	});
}

function success(title,msg,showClose){
	Vue.prototype.$notify.success({
		title: title,
		message: msg,
		showClose: showClose
	});
}

export{
	error,
	success
}