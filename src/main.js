// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import '../src/assets/css/common.css'


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = function (data) {
    return qs.stringify(data);
}
Vue.use(VueAxios, axios)

Vue.prototype.url = 'https://www.waimaitong.xin/'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
