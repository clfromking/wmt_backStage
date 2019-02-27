import $ from 'jquery'
import Vue from 'vue'

function post(url,data){
	var promise = new Promise((resolve,reject)=>{
		$.ajax({
			url: Vue.prototype.url+url,
			method:'POST',
			contentType: 'application/json; charset=utf-8',
			dataType: "json",
			data:data = JSON.stringify(data),
			success:function(res){
				resolve(res)
			}
		})
	})
	return promise
	
}


export{
	post
}