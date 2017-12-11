<template>
	<div class="result_container">
		<nav-top title="预约结果"></nav-top>
		<p class="success">
			<img src="../../assets/images/success.png"  alt="">
			已成功预约
		</p>
		<p class="info">您的预约时间为：2017年9月22日(周四)<br>下午您的号码为：15，16，17</p>
		<div class="btn_group">
			<router-link to="/" class="btn_l">返回首页</router-link >
			<router-link to="/"class="btn_r">查看详情</router-link >
		</div>
	</div>
</template>
<script>
import navTop from '../../components/nav.vue'
export default {
	components: {
		navTop:navTop
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js App'
		}
	},
	beforeRouteLeave(to, from, next){
		console.log(to,from)
		if (to.path == "/register_form") {
			next('/')
		}else{
			next()
		}
		
	}
}
</script>
<style lang="scss">
@import '../../assets/css/index.scss';
.result_container{
	color: #333;
	padding-top: px(80);
	height: 100%;
	position: relative;
	.back_icon{
		display: none;
	}
	.success{
		display: flex;
		align-items:center;
		justify-content:center;
		margin: px(80) 0;
		font-size: px(36);
		img{
			width: px(60);
			margin-right: px(15);
		}
	}
	.info{
		text-align: center;
		padding: 0 px(40);
		font-size: px(36);
		line-height: 2
	}
	.btn_group{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: px(80);
		display: flex;
		box-shadow:  0 px(-2)  px(5) rgba(0,0,0,.2);
		a{
			flex:1;
			text-align: center;
			line-height: px(78);
		}
	}
}
</style>