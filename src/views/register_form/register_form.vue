<template>
	<div class="register_container">
		<nav-top title="填写预约信息"></nav-top>
		<div ref="register_form" class="register_form">
			<p class="register_info">
				所选时间：{{$route.query.date}}（周{{$route.query.week}}）&nbsp;&nbsp;{{$route.query.time=='morning'?'早班':'晚班'}}<br>
				为 {{this.appointment.length}} 人进行了预约操作<br>
				预约费用为：3 元（成功支付后挂号费用不予退还）
			</p>
			<transition-group name="appointment">
				<div class="appointment" v-for="(item , index) in appointment" :key="index">
					<p class="appointment_title">请填写预约人信息或者
						<mt-button @click="showCommonAppointment(index)" type="primary" size="small">使用常用预约人</mt-button>
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
			<div @click="comfirmValidate" class="register_btn comfirm_appointment">确&nbsp;&nbsp;定</div>
		</div>
		<div v-show="popupVisible" @click="popupVisible = false" class="mask"></div>
		<transition name="popup">
			<div v-show="popupVisible" class="popup_container">
				<p class="popup_title"><span @click="popupVisible = false">取消</span>使用预约人</p>
				<div class="popup_content">
					<ul>
						<li v-for="(item, index) in info" class="popup_list">
							<div class="list_info">
								<p>
									<span>小陈（男)</span>
									<span>13555555555</span>
								</p>
								<p class="address">澄海区XXXXXXXXXXXXXXXX澄海区XXXXXXXXXXXXXXXX</p>
							</div>
							<div @click="uesCommonAppointment(index)" class="list_btn">使&nbsp;&nbsp;用</div>
						</li>
					</ul>
				</div>
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
  		popupVisible:false,
  		currentAppointment:0,
  		info:[{
  			name:'小陈（男)',
  			phone:'13555555555',
  			address:'澄海区XXXXXXXXXXXXXXXX澄海区XXXXXXXXXXXXXXXX',
  			sex:'woman'
  		},{
  			name:'小陈（男)',
  			phone:'13555555555',
  			address:'澄海区XXXXXXXXXXXXXXXX澄海区XXXXXXXXXXXXXXXX',
  			sex:'woman'
  		},{
  			name:'小陈（男)',
  			phone:'13555555555',
  			address:'澄海区XXXXXXXXXXXXXXXX澄海区XXXXXXXXXXXXXXXX',
  			sex:'woman'
  		}]
  	}
  },
  mounted(){
  	
  },
  methods:{
  	//删除预约人
  	deleteAppointment(i){
  		console.log(i)
		MessageBox.confirm('确定删除该预约人信息吗?').then(action => {
			this.appointment.splice(i,1)
		},()=>{
			console.log('cancel')
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
		this.$nextTick(function () {
			this.$refs.register_form.scrollTop = this.$refs.register_form.scrollHeight
		})
  	},
  	//显示常用预约人弹层
  	showCommonAppointment(i){
  		this.popupVisible = true
  		this.currentAppointment = i
  	},
  	//选择常用预约人
  	uesCommonAppointment(i){
  		this.$set(this.appointment, this.currentAppointment, this.info[i])
  		this.popupVisible = false
  	},
  	//提交前验证
  	comfirmValidate(){
  		let len = this.appointment.length
  		if (len == 0) {
  			MessageBox.alert('请添加预约人')
  			return false
  		}else{
  			for(let i = 0 ; i < this.appointment.length; i++){
  				for(var key in this.appointment[i]){
  					if (this.appointment[i][key] == '') {
  						MessageBox.alert('请完整填写预约人信息后再提交')
  						return false
  					}
				}
  			}
  			//判断名额是否充足
  			this.enoughPopup()
  		}
  	},
  	enoughPopup(){
		//调起微信支付
		this.$router.push('/register_result')
  	},
  	notEnoughPopup(){
  		MessageBox({
		  title: '提示',
		  message: '当前剩余名额不足(余2人)<br>无法进行预约',
		  //showCancelButton: true
		});
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
	color: #333;
}
.register_form{
	width: 100%;
	height: 100%;
	background-color: #fff;
	padding: px(80) px(40);
	-webkit-overflow-scrolling: touch;
	position: relative;
	overflow: auto;
	.register_info{
		font-size:px(30);
		line-height: 2;
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
		border-right: px(1) solid #fff;
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
.popup-leave-active{
	animation: slideOutRight .4s  both 1;
}
.mask{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 998;
	background-color: rgba(0,0,0,.4)
}
.popup_container{
	width: 85%;
	height: 100%;
	position: fixed;
	top: 0;
	right: 0;
	z-index	:999;
	background-color: #fff;
	box-shadow: px(-2) 0 px(5) rgba(0,0,0,.3);
	.popup_title{
		width: 100%;
		height: px(80);
		background-color: $blue;
		color: #fff;
		text-align: center;
		position: relative;
		font-size: px(36);
		line-height: px(78);
		span{
			font-size: px(32);
			position: absolute;
			top: 50%;
			transform:translate(0,-50%);
			left: px(20);
			padding: px(10);
		}
	}
	.popup_content{
		width: 100%;
		height: 100%;
		-webkit-overflow-scrolling: touch;
		overflow: auto;
		padding:0 px(20) px(80);
	}
	.popup_list{
		width: 100%;
		height: px(220);
		border: px(2) solid $blue;
		display: flex;
		font-size: px(30);
		margin: px(32) 0;
		.list_info{
			width: 80%;
			height: 100%;
			display: flex;
			flex-direction:column;
			justify-content:space-around;
			padding: px(20) px(40);
			>p{
				display: flex;
				justify-content:space-between;
			}
			.address{
				overflow : hidden;
			    text-overflow: ellipsis;
			    display: -webkit-box;
			    -webkit-line-clamp: 3;
			    -webkit-box-orient: vertical;
			}
		}
		.list_btn{
			width: 20%;
			height: 100%;
			background-color: #67c23a;
			text-align: center;
			color: #fff;
			line-height: px(214);
			
		}
	}
}
</style>