<template>
	<div class="register_container">
		<nav-top title="选择预约时间"></nav-top>
		<div class="register">
			<ul class="register_days">
				<li @click="chooseDay(index)" :class="index == curChoose?'active':''" v-for="(item, index) in week">{{item}}</li>
			</ul>
			<ul class="register_days">
				<li v-for="(item, index) in date">{{item}}</li>
			</ul>
		</div>
	</div>
</template>
<script>
import navTop from '../../components/nav.vue'
export default {
  components: {
	navTop
  },
  data () {
    return {
      	week:[],
      	date:[],
      	curChoose:0
    }
  },
  mounted(){
  	let aWeek = new Array("日", "一", "二", "三", "四", "五", "六")
  	//获取未来七天
  	for(let i = 0 ;i<7;i++){
  		let date = new Date()
  		date.setDate(new Date().getDate()+i)
  		this.date.push(date.getDate())
  		this.week.push(aWeek[date.getDay()])
  	}
  },
  methods:{
  	chooseDay(i){
  		this.curChoose = i
  	}
  }
}
	
</script>
<style lang="scss">
@import '../../assets/css/index.scss';
.register_container{
	width: 100%;
	height: 100%;	
}
.register{
	width: 100%;
	height: 100%;
	background-color: #f6f6f6;
	padding: px(80) px(80) 0 px(80);
	.register_days{
		@extend %flex_justify;
		font-size: px(28);
		margin: px(40) 0;
		li{
			width: px(70);
			height: px(70);
			display: flex;
			align-items:center;
			justify-content:center;
			border-radius:100%;
			transition:all ease .3s;
		}
		.active{
			background-color: #6cb7f1;
			color:#fff;
		}
	}
}
</style>