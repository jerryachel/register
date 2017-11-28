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
			<label for="morning" :class="[curTime == 'morning'?'chosen':'',morningIsDisabled? 'disabled':'']">
				<div class="chosen_bg"></div>
				<div class="register_info">
					<p>早班</p>
					<p>营业时间：8:30～11:30</p>
					<p>剩余号数：18</p>
					<input :disabled="morningIsDisabled" id="morning" type="radio" value="morning" v-model="curTime" >
				</div>
				<img src="../../assets/images/choose.png" alt="">
			</label>
			<label for="afternoon" :class="[curTime == 'afternoon'?'chosen':'',afternoonIsDisabled? 'disabled':'']">
				<div class="chosen_bg"></div>
				<div class="register_info">
					<p>晚班</p>
					<p>营业时间：18:40～21:30</p>
					<p>剩余号数：10</p>
					<input :disabled="afternoonIsDisabled" id="afternoon" type="radio" value="afternoon" v-model="curTime" >
				</div>
				<img src="../../assets/images/choose.png" alt="">
			</label>
			<div :class="['comfirm_btn',curTime?'comfirm_btn_active':'']">确&nbsp;&nbsp;定</div>
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
      	curChoose:0, //选择的日期
      	curTime:'',  //选择早班晚班
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
  	let timer = new Date()
  	
  	/*setInterval(function(){
  		timer.getTime()+ 1000
  		console.log(timer.getTime())
  	},1000)*/
  },
  watch:{
  	curTime(){
  		console.log(this.curTime)
  	}
  },
  computed:{
  	morningIsDisabled:function(){
  		let now = new Date()
  		let hours = now.getHours()
  		let minute = now.getMinutes()
  		//有剩余号源 且 (选中日期为当天 且 时间在9点前) || (选中日期不为当天 且 时间在7点~22点) 
  		if (1 == 1 && (this.date[this.curChoose] == now.getDate() && hours < 9) || (this.date[this.curChoose] != now.getDate() && hours > 7 && hours <22)){  	
			return false
  		}else{
  			return true
  		}
  	},
  	afternoonIsDisabled:function(){
  		let now = new Date()
  		let hours = now.getHours()
  		let minute = now.getMinutes()
  		//有剩余号源 且 (选中日期为当天 且 时间在17:30前) || (选中日期不为当天 且 时间在7点~22点)
  		if (1 == 1 && (this.date[this.curChoose] == now.getDate() && (hours < 17 || (hours==17 && minute<=30 ))) || (this.date[this.curChoose] != now.getDate() && hours > 7 && hours <22) ) {
  			return false
  		}else{
  			return true
  		}
  	},


  	//disabled:0  //0:全部允许 1:上午  2:晚上  3:全部禁止
  	disabled:function(){
  		let now = new Date()
  		let hours = now.getHours()
  		let minute = now.getMinutes()

  		let status = 0
  		//当天
		if(this.date[this.curChoose] == now.getDate()){
			//9点前
  			if(hours< 9){
  				status = 0
  			//9点~17点30
  			}else if(hours>= 9 && (hours < 17 || (hours==17 && minute<=30 ))){
  				status = 1
  			}
  			//17点30后
  			else if (hours > 17 || (hours==17 && minute > 30 )){
  				console.log(hours > 17 || (hours==17 && minute > 30 ))
  				status = 3
  			}
  		//非当天 且 7~22点内
  		}else if (hours > 7 && hours < 22){
  			status = 0
  		}else {
  			status = 3
  		}


  		return status
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
		border:px(2) solid #ccc;
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
		border:px(0) solid transparent;
		.chosen_bg{
			opacity: 1;
			transform:translate3d(-50%,-50%,0) scale(1);
		}
	}
	.disabled{
		color: #8cc5ff;
		background-color: #ecf5ff;
		border-color: #d9ecff;
	}
	.comfirm_btn{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: px(80);
		text-align: center;
		line-height: px(78);
		background-color: #c2e7b0;
		color: #fff;
		font-size: px(30);	
		transition: ease all .3s;
	}
	.comfirm_btn_active{
		background-color: #67c23a;
	}
}
</style>