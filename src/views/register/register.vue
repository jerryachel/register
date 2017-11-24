<template>
	<div class="register_container">
		<nav-top title="选择预约时间"></nav-top>
		<div class="register">
			<ul class="register_days">
				<li @click="chooseDay(index,item)" :class="index == curChoose?'active':''" v-for="(item, index) in week">{{item}}</li>
			</ul>
			<ul class="register_days">
				<li v-for="(item, index) in date">{{item}}</li>
			</ul>
			<label for="morning" :class="[curTime == 'morning'?'chosen':'',disabled == 1 || disabled == 3? 'disabled':'']">
				<div class="chosen_bg"></div>
				<div class="register_info">
					<p>早班</p>
					<p>营业时间：8:30～11:30</p>
					<p>剩余号数：18</p>
					<input :disabled="disabled == 1 || disabled == 3" id="morning" type="radio" value="morning" v-model="curTime" >
				</div>
				<img src="../../assets/images/choose.png" alt="">
			</label>


			<label for="afternoon" :class="[curTime == 'afternoon'?'chosen':'',disabled == 2 || disabled == 3? 'disabled':'']">
				<div class="chosen_bg"></div>
				<div class="register_info">
					<p>晚班</p>
					<p>营业时间：18:40～21:30</p>
					<p>剩余号数：10</p>
					<input :disabled="disabled == 2 || disabled == 3" id="afternoon" type="radio" value="afternoon" v-model="curTime" >
				</div>
				<img src="../../assets/images/choose.png" alt="">
				
			</label>
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
      	curChoose:0,
      	curTime:'',
      	disabled:0  //1:上午  2:晚上  3:全部
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
  watch:{
  	curTime(){
  		console.log(this.curTime)
  	}
  },
  methods:{
  	chooseDay(i,day){
  		this.curChoose = i
  		//重置选择上午下午
  		this.curTime = ''
  		console.log(day)
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
		color:#333;
		li{
			width: px(70);
			height: px(70);
			display: flex;
			align-items:center;
			justify-content:center;
			border-radius:100%;
			transition:all ease .3s;
			position: relative;
		}
		.active{
			background-color: #6cb7f1;
			color:#fff;
		}
	}
	label{
		display: block;
		width: 100%;
		height: px(200);
		border:px(4) solid #ccc;
		font-size: px(30);
		background-color: #f6f6f6;
		border-radius:px(10);
		color:#333;
		margin: px(100) 0 0;
		position: relative;
		transition:all ease .3s;
		overflow: hidden;
		.chosen_bg{
			width: px(750);
			height: px(750);
			border-radius: 100%;
			position: absolute;
			top:50%;
			left:50%;
			transform:translate3d(-50%,-50%,0) scale(0);
			background-color: #6cb7f1;
			transition:all ease .3s;
			opacity: 0;
		}
		.register_info{
			width: 100%;
			height: 100%;
			position: absolute;
			top:0;
			left: 0;
			z-index: 1;
			display: flex;
			flex-direction:column;
			align-items:center;
			justify-content:space-around;
		}
		input{
			display: none;
		}
		img{
			position: absolute;
			width: px(80);
			top:35%;
			left:3%;
			opacity:0;
			transition:all ease .3s;
		}
	}
	.chosen{
		color:#fff;
		border:px(4) solid #6cb7f1;
		.chosen_bg{
			opacity: 1;
			transform:translate3d(-50%,-50%,0) scale(1);
		}
	}
	.disabled{
		background-color: #e2e0e0;
		color: #fff;
	}
}
</style>