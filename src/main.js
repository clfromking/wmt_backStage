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
import $ from 'jquery'
import '../src/assets/css/common.css'
import { error,success , info ,showModal } from '@/assets/js/alert.js'
import { isZint ,validate} from '@/assets/js/computed.js'
import { post } from '@/assets/js/ajax.js'



Vue.prototype.$echarts = echarts 
Vue.prototype.$alert =  { error,success ,info, showModal } 
Vue.prototype.$computed = {isZint,validate}
Vue.prototype.$ajax =  { post } 
Vue.prototype.url = 'http://192.168.0.198'


axios.defaults.withCredentials = true

//生产需要打开
Vue.config.productionTip = true   	


// console.log(axios.defaults.withCredentials)
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
	// Vue.http.options.emulateJSON = true;
	data = qs.stringify(data)
    return data;
	
}

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
	config.url = Vue.prototype.url + config.url
	return config;
}, function (error) {
  // 对请求错误做些什么
	return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
	// console.log(response)
  // 对响应数据做点什么
	return response;
 }, function (error) {
	 // console.log(111)
  // 对响应错误做点什么
	return Promise.reject(error);
});


Vue.use(VueAxios, axios)
Vue.use( Vuex );


Vue.config.productionTip = false

/* eslint-disable no-new */

//控制登录模块module
// const login = {
// 	state:{
// 		islogin:false
// 	},
// 	mutations:{
// 		
// 	},
// 	actions:{
// 		
// 	}
// }
// 

const store = new Vuex.Store({
    //待添加
	//有需要的模块加进去
	state:{
		// roles:[2,4,6,7,9,10,12,14,16,17,18,20,21],
		roles:[]
	},
	mutations:{
		changeRoles:function(state,payload){
			console.log(payload)
			state.roles[0] = payload
		}
	}
})


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
