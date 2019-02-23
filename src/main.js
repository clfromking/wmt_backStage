// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import qs from 'qs'
import echarts from 'echarts'
import '../src/assets/css/common.css'
import { error,success } from '@/assets/js/alert.js'



Vue.prototype.$echarts = echarts 
Vue.prototype.$alert =  { error,success } 
Vue.prototype.url = 'https://www.beta.com'

console.log(Vue.prototype.$a)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
    return qs.stringify(data);
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
	
	config.url = Vue.prototype.url + config.url
	// console.log(this.url)
	console.log(config.url)
	return config;
}, function (error) {
  // 对请求错误做些什么
	return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	console.log(response)
  // 对响应数据做点什么
	return response;
 }, function (error) {
  // 对响应错误做点什么
	return Promise.reject(error);
});


Vue.use(VueAxios, axios)
Vue.use( Vuex );


Vue.config.productionTip = false

/* eslint-disable no-new */

//控制登录模块module
const login = {
	state:{
		islogin:true
	},
	mutations:{
		
	},
	actions:{
		
	}
}


const store = new Vuex.Store({
    //待添加
	//有需要的模块加进去
	modules:{
		login : login,
	}
})


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
