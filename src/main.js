//openId为空则跳转菜单
if (!window.location.hash.split('openId=')[1]) {
   window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxaf63b620a0b0110d&redirect_uri=http%3A%2F%2Fregister.gzbige.com%2Fclinic%2Fredirect.do&response_type=code&scope=snsapi_userinfo&state=HOME#wechat_redirect"
}
// 格式化时间
Date.prototype.Format = function(fmt) { //author: 
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/public.css'
import axios from './service/axios.js'
import './assets/js/flexible.min.js'
import wx from 'weixin-js-sdk'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
