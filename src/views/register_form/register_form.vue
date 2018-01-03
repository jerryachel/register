<template>
	<div class="register_container">
		<nav-top title="填写预约信息"></nav-top>
		<div ref="register_form" class="register_form">
			<p v-cloak class="register_info">
				所选时间：{{$route.query.date}}（周{{$route.query.week}}）&nbsp;&nbsp;{{$route.query.time=='morning'?'早班':'晚班'}}<br>
				为 {{this.appointment.length}} 人进行了预约操作<br>
				预约费用为：{{totalPrice}} 元（成功支付后挂号费用不予退还）
			</p>
			<transition-group name="appointment">
				<div class="appointment" v-for="(item , index) in appointment" :key="index">
					<p class="appointment_title">请填写预约人信息或者
						<mt-button @click="showCommonAppointment(index)" type="primary" size="small">使用常用预约人</mt-button>
					</p>
					<mt-field label="您的名字" @focus.native="scrollToView" placeholder="请输入您的名字" v-model="item.contactName"></mt-field>
					<mt-field ref="input1" label="您的电话" placeholder="请输入您的电话" v-model="item.contactMobile"></mt-field>
					<mt-field label="您的地址" placeholder="请输入您的地址" v-model="item.contactAddress"></mt-field>
					<div class="appointment_sex">
						<span class="">您的性别</span>
						<div class="sex">
							<label :for="'man'+index" :class="item.sex==0? 'sex_active':''">男
								<input :id="'man'+index" type="radio" value=0 v-model="item.sex">
							</label>
							<label :for="'woman'+index" :class="item.sex==1? 'sex_active':''">女
								<input :id="'woman'+index" type="radio" value=1 v-model="item.sex">
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
					<p v-cloak v-if="info.length == 0" class="no_content">-- 暂无常用联系人 --</p>
					<ul v-else>
						<li  v-for="(item, index) in info"  class="popup_list">
							<div class="list_info">
								<p>
									<span>{{item.contactName}}（{{item.sex?'女':'男'}})</span>
									<span>{{item.contactMobile}}</span>
								</p>
								<p class="address">{{item.contactAddress}}</p>
							</div>
							<div @click="uesCommonAppointment(index,item.contactId)" class="list_btn">使&nbsp;&nbsp;用</div>
						</li>
					</ul>
				</div>
			</div>
		</transition>
	</div>
</template>
<script>
import axios from '../../service/axios.js'
import navTop from '../../components/nav.vue'
import wx from 'weixin-js-sdk'
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
  			contactId:'',
  			contactName:'',
  			contactMobile:'',
  			contactAddress:'',
  			sex:0
  		}],
  		popupVisible:false,
  		currentAppointment:0,
  		price:0,
  		info:[]
  	}
  },
  computed:{
  	totalPrice:function(){
  		return this.appointment.length * parseFloat(this.price)
  	}
  },
  created(){
  	//获取挂号费
	axios.get('clinic/numberPrice.do').then(({data})=>{
		let res = data.model
		this.price = res
	})
	//获取常用联系人
	axios.get('clinic/queryAllContact.do').then(({data})=>{
		let res = data.model
		this.info = res
	})
  },
  mounted(){
  	let form = document.querySelector(".register_form")
  	form.addEventListener('click',function(ev){
  		var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if(target.className == 'mint-field-core'){
        	
        	console.log(111)
        	setTimeout(function(){
        		target.scrollIntoView(false)
        		var scroll = document.querySelector('.register_form').scrollTop
        		document.querySelector('.register_form').scrollTo(0,scroll+document.querySelector('.comfirm_appointment').offsetHeight)
        	},0)
            /*let height  = target.getBoundingClientRect().top
            let scroll = document.querySelector('.register_form').scrollTop
            console.log(height,scroll)
            //target.scrollIntoView(false)
            document.querySelector('.register_form').scrollTo(0,scroll - height)*/
        }
  	})
  },
  methods:{
  	scrollToView(){
  		console.log(456456)
  	},
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
  			contactId:'',
  			contactName:'',
  			contactMobile:'',
  			contactAddress:'',
  			sex:0
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
  	uesCommonAppointment(i,id){
  		console.log(i,id)
  		this.$set(this.appointment, this.currentAppointment, JSON.parse(JSON.stringify(this.info[i])))
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
  					if (this.appointment[i][key] === '' && key != "contactId") {
  						MessageBox.alert('请完整填写预约人信息后再提交')
  						return false
  					}
				}
				let reg = /^1[3|4|5|7|8][0-9]{9}$/; //验证手机规则
				if (!reg.test(this.appointment[i].contactMobile)) {
					MessageBox.alert('请输入正确的手机号码')
					return false
				}
  			}
  			//判断名额是否充足
  			this.enoughPopup()
  		}
  	},
  	enoughPopup(){
  		let wxConfig
  		let _this = this
  		axios.get('clinic/numberLeft.do',{
  			params:{
				dateTime:this.$route.query.date,
				configClass:this.$route.query.time == 'morning' ? 0 : 1
			}
  		}).then(({data})=>{
  			let res = data.model
  			if (res < this.appointment.length) {
  				this.notEnoughPopup(res)
  			}else{
  				axios.get('/pay/preparePay.do',{
  					params:{
  						total_fee:this.totalPrice
  					}
  				}).then(({data})=>{
  					wxConfig = data.model
  					//onBridgeReady()
  					if (typeof WeixinJSBridge == "undefined"){
					   if( document.addEventListener ){
					       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
					   }else if (document.attachEvent){
					       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
					       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
					   }
					}else{
					   onBridgeReady();
					} 
  				})
  			}
  		})

		//调起微信支付
		
		function onBridgeReady(){
		    WeixinJSBridge.invoke(
		       'getBrandWCPayRequest', {
		           "appId":wxConfig.appId,     //公众号名称，由商户传入     
		           "timeStamp":wxConfig.timeStamp,         //时间戳，自1970年以来的秒数     
		           "nonceStr":wxConfig.nonceStr, //随机串     
		           "package":wxConfig.prepayId,     
		           "signType":wxConfig.signType,         //微信签名方式：     
		           "paySign":wxConfig.paySign //微信签名 
		        },
		        function(res){    
		       		//alert(res.err_msg) 
		            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
		           		_this.confirmOrder(wxConfig.wxOrderId)
		            }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
		        }
		    ); 
		}

  	},
  	notEnoughPopup(num){
  		MessageBox({
		  title: '提示',
		  message: `当前剩余名额不足(余${num}人)<br>无法进行预约`,
		  //showCancelButton: true
		});
  	},
  	confirmOrder(orderId){
  		axios.post('clinic/order.do',{
  			wxOrderId:orderId,
  			dateTime:this.$route.query.date,
  			configClass:this.$route.query.time == 'morning'? 0 : 1,
  			contactInfoDTOs:this.appointment
  		}).then(({data})=>{
  			if (data.success) {
	  			let res = data.model
	  			res = res.join(',')
	  			this.$router.push({
	  				path: '/register_result',
	  				query:{
	  					registerId:res,
	  					date:this.$route.query.date,
	  					week:this.$route.query.week,
  						time:this.$route.query.time
	  				}
	  			})
  			}else{
  				MessageBox.alert(data.errorMsg)
  			}
  		})
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
	.no_content{
		text-align: center;
		margin-top: px(50);
		font-size: px(30)
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