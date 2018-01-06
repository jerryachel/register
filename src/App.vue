<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from './service/axios.js'
import wx from 'weixin-js-sdk'
export default {
	name: 'app',
	created(){
		let openId = this.$route.query.openId || sessionStorage.getItem('uid')
		sessionStorage.setItem('uid', openId);
		//登录
		axios.get('clinic/login.do',{
			params:{
				openId:openId
			}
		}).then(()=>{
			//console.log(window.location.href.replace("#/", ""))
			//配置wx.config
		    axios.get('clinic/jsApiConfig.do',{
		        params: {
		            currentUrl: window.location.href
		        }
		    }).then(({data})=>{
		        console.log(data)
		        let res = data.model
		        sessionStorage.setItem('shareUrl', res.shareUrl);
		        wx.config({
		            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
		            appId: res.appId, // 必填，公众号的唯一标识
		            timestamp: res.timestamp, // 必填，生成签名的时间戳
		            nonceStr: res.nonceStr, // 必填，生成签名的随机串
		            signature: res.signature, // 必填，签名，见附录1
		            jsApiList: [
			            'onMenuShareAppMessage',
			            'onMenuShareTimeline'
		            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
		        })
		        wx.ready(function() {
					wx.onMenuShareAppMessage({
						title: '陈景辉诊所', // 分享标题
						desc: '欢迎来到陈景辉诊所！', // 分享描述
						link: 'http://www.gzbige.com/dist/#/?openId=', // 分享链接
						imgUrl: '', // 分享图标
						type: '', // 分享类型,music、video或link，不填默认为link
						dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
						success: function() {
						// 用户确认分享后执行的回调函数
						},
						cancel: function() {
						// 用户取消分享后执行的回调函数
						}
					});
					wx.onMenuShareTimeline({
						title: '陈景辉诊所', // 分享标题
						link: 'http://www.gzbige.com/dist/#/?openId=',
						imgUrl: '', // 分享图标
						success: function() {
						// 用户确认分享后执行的回调函数
						},
						cancel: function() {
						// 用户取消分享后执行的回调函数
						}
					});
				});
		    })
		})
	},
	mounted(){
		
	}

}
</script>

<style >
html,body,#app{
    width:100%;
    height:100%;
    font-family: "Microsoft YaHei"
}
.border{
    box-shadow: 0 1px 0 hsla(0,0%,86%,.3);
}
.mint-indicator-wrapper{
	z-index: 999
}
</style>
