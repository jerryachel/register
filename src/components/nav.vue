<template>
	<div class="nav_container">
		<img @click="back" src="../assets/images/back.png" class="back_icon" alt="">
		{{title}}
	</div>
</template>
<script>
export default {
  props:['title'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  	back(){
  		this.$router.back()
  	}
  }
}
	
</script>
<style lang="scss">
@import '../assets/css/index.scss';
.nav_container{
	background-color: #6cb7f1;
	width: 100%;
	height: px(80);
	position: relative;
	font-size: px(36);
	display: flex;
	align-items:center;
	justify-content:center;
	color: #fff;
	box-shadow:  0 px(2)  px(5) rgba(107,183,242,.3);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9;
}
.back_icon{
	width:px(50);
	height: px(50);
	position: absolute;
	top:50%;
	transform:translate3d(0, -50% , 0);
	left: px(20);
}
</style>