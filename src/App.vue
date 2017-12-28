<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from './service/axios.js'
export default {
	name: 'app',
	created(){
		let openId = this.$route.query.openId || sessionStorage.getItem('uid')
		sessionStorage.setItem('uid', openId);
		console.log(openId)
		axios.get('clinic/login.do',{
			params:{
				openId:openId
			}
		})
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
