<template>
  <div class="main">
	<img class="banner" src=""  alt="">
	<div class="index_link">
		<router-link to="/register" class="link_btn link_btn1">
			<img src="../assets/images/icon1.png" alt="">
			<p class="link_title">预约挂号</p>
		</router-link>
		<router-link to="" class="link_btn link_btn2">
			<img src="../assets/images/icon2.png" alt="">
			<p class="link_title">挂号查询</p>
		</router-link>
		<router-link to="" class="link_btn link_btn3">
			<img src="../assets/images/icon3.png" alt="">
			<p class="link_title">常用预约人管理</p>
		</router-link>
	</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
@import '../assets/css/index.scss';
.main{
	width: 100%;
	min-height: 100%;
	background-color: #f7f7f7;
	overflow: hidden;
	background: url('../assets/images/bg.jpg')repeat ;
	background-size: 50%;
}
.banner{
	width: 100%;
	height: px(500);
	border: 1px solid #ccc;
}
.index_link{
	display: flex;
	flex-direction:column;
	align-items:center;

	.link_btn1{
		animation: slideInRight .8s .2s both 1;
	}
	.link_btn2{
		animation: slideInRight .6s .4s both 1;
	}
	.link_btn3{
		animation: slideInRight .6s .6s both 1;
	}
	.link_btn{
		display: flex;
		flex-direction:column;
		align-items:center;
		justify-content:space-around;
		width:px(420);
		box-shadow: 0 0 px(5) rgba(0,0,0,.3);
		height: px(200);
		border-radius:px(10);
		margin-top: px(30);
		background: #fff;
		img{
			width:px(100);
		}
		p{
			font-size: px(30);
			color:#26a2ff;
		}
	}
}
</style>
