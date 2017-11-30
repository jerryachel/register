<template>
	<div class="register_container">
		<nav-top title="填写预约信息"></nav-top>
		<div class="register_form">
			<p class="register_time">所选时间：{{$route.query.date}}（周{{$route.query.week}}）&nbsp;&nbsp;{{$route.query.time=='morning'?'早班':'晚班'}}</p>
			<transition-group name="appointment">
				<div class="appointment" v-for="(item , index) in appointment" :key="index">
					<p class="appointment_title">请填写预约人信息或者
						<mt-button @click="uesCommonAppointment(index)" type="primary" size="small">使用常用预约人</mt-button>
					</p>
					<mt-field label="您的名字" placeholder="请输入您的名字" v-model="item.name"></mt-field>
					<mt-field label="您的电话" placeholder="请输入您的电话" v-model="item.phone"></mt-field>
					<mt-field label="您的地址" placeholder="请输入您的地址" v-model="item.address"></mt-field>
					<div class="appointment_sex">
						<span class="">您的性别</span>
						<div class="sex">
							<label :for="'man'+index" :class="item.sex=='man'? 'sex_active':''">男
								<input :id="'man'+index" type="radio" value="man" v-model="item.sex">
							</label>
							<label :for="'woman'+index" :class="item.sex=='woman'? 'sex_active':''">女
								<input :id="'woman'+index" type="radio" value="woman" v-model="item.sex">
							</label>
						</div>
					</div>
					<img @click="deleteAppointment(index)" src="../../assets/images/delete.png" class="delete_appointment" alt="">
				</div>
			</transition-group >
		</div>
		<div class="register_btn_group">
			<div @click="add_appointment" class="register_btn add_appointment">添加预约人</div>
			<div @click="comfirm" class="register_btn comfirm_appointment">确&nbsp;&nbsp;定</div>
		</div>
		<transition name="popup">
			<div v-show="popupVisible" class="popup_container">
				<nav-top title="常用预约人"></nav-top>
				123456
			</div>
		</transition>
	</div>
</template>
<script>
import navTop from '../../components/nav.vue'
import { Button,Field,MessageBox} from 'mint-ui'
export default {
  components: {
	navTop:navTop,
	mtButton:Button,
	mtField:Field
  },
  data(){
  	return {
  		appointment : [{
  			name:'',
  			phone:'',
  			address:'',
  			sex:'man'
  		}],
  		popupVisible:false
  	}
  },
  created(){

  },
  methods:{
  	//删除预约人
  	deleteAppointment(i){
  		console.log(i)
		MessageBox.confirm('确定删除该预约人信息吗?').then(action => {
			this.appointment.splice(i,1)
		});
  		
  	},
  	//添加预约人
  	add_appointment(){
  		let appointment = {
  			name:'',
  			phone:'',
  			address:'',
  			sex:'man'
  		}
  		this.appointment.push(appointment)
  	},
  	//使用常用预约人
  	uesCommonAppointment(i){
  		this.popupVisible = true
  	},
  	//确认提交
  	comfirm(){
  		let len = this.appointment.length
  		if (len == 0) {
  			MessageBox.alert('请添加预约人')
  			return false
  		}else{
  			this.appointment.forEach(function(obj){
  				for(var key in obj){
  					if (obj[key] == '') {
  						MessageBox.alert('请完整填写预约人信息后再提交')
  					}
				}
  			})
  		}
  	}
  }
}
</script>
<style lang="scss">
@import '../../assets/css/index.scss';
.register_container{
	width: 100%;
	height: 100%;		
	position: relative;
	overflow: hidden;
}
.register_form{
	width: 100%;
	height: 100%;
	background-color: #fff;
	padding: px(80) px(40);
	-webkit-overflow-scrolling: touch;
	position: relative;
	overflow: auto;
	.register_time{
		font-size:px(30);
		margin: px(30) 0;
	}
	.appointment{
		width: 100%;
		border: px(2) solid $blue;
		border-radius:px(10);
		padding: px(30) px(20);
		position: relative;
		margin-bottom: px(40);
	}
	.appointment_title{
		font-size: px(30);
		@extend %flex_justify;
		margin-bottom: px(30);
		padding: 0 10px;
	}
	.mint-button--primary{
		background-color: $blue;
		height: px(60)
	}
	.mint-button-text{
		font-size: px(30);
	}
	.mint-cell-wrapper{
		font-size: px(30)
	}
	.appointment_sex{
		font-size: px(30);
		@extend %flex_justify;
		padding: 0 10px;
		margin-top: px(20);
	}
	.sex{
		width: 68%;
		@extend %flex_justify;
		label{
			display: block;
			width: 45%;
			height: px(60);
			border: px(1) solid #ccc;
			text-align: center;
			line-height: px(55);
			border-radius:px(6);
			transition: all ease .3s;
			background-color: #fff;
		}
		.sex_active{
			background-color: $blue;
			color: #fff;
		}
		input{
			display: none;
		}
	}
	.delete_appointment{
		position: absolute;
		right: px(-25);
		top: px(-25);
		width: px(50);
		background: #fff;

	}
}
.register_btn_group{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: px(80);
	display: flex;
	box-shadow:  0 px(-2)  px(5) rgba(0,0,0,.2);
	.register_btn{
		width: 50%;
		text-align: center;
		line-height: px(78);
		color:#fff;
		font-size:px(30);
	}
	.add_appointment{
		background-color: $blue;
		border-right: px(2) solid #fff;
	}
	.comfirm_appointment{
		background-color: #67c23a
	}
}
.appointment-enter-active{
	animation: slideInRight .6s  both 1;
}
.popup-enter-active{
	animation: slideInRight .6s  both 1;
}
.popup_container{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
}
</style>