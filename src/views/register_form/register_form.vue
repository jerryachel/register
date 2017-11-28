<template>
	<div class="register_container">
		<nav-top title="填写预约信息"></nav-top>
		<div class="register_form" v-for="(item , index) in appointment" :key="index">
			<p class="register_time">所选时间：{{$route.query.date}}（周{{$route.query.week}}）&nbsp;&nbsp;{{$route.query.time=='morning'?'早班':'晚班'}}</p>
			<div class="appointment">
				<p class="appointment_title">请填写预约人信息或者<mt-button type="primary" size="small">使用常用预约人</mt-button></p>
				<mt-field label="您的名字" placeholder="请输入您的名字" v-model="item.name"></mt-field>
				<mt-field label="您的电话" placeholder="请输入您的电话" v-model="item.phone"></mt-field>
				<mt-field label="您的地址" placeholder="请输入您的地址" v-model="item.address"></mt-field>
				<mt-radio title="您的性别" v-model="item.sex" :options="['男', '女']"></mt-radio>
			</div>
		</div>
	</div>
</template>
<script>
import navTop from '../../components/nav.vue'
import { Button,Field,Radio} from 'mint-ui'
export default {
  components: {
	navTop:navTop,
	mtButton:Button,
	mtField:Field,
	mtRadio:Radio
  },
  data(){
  	return {
  		appointment : [{
  			name:'',
  			phone:'',
  			address:'',
  			sex:''
  		}]
  	}
  },
  created(){

  }
}
</script>
<style lang="scss">
@import '../../assets/css/index.scss';
.register_container{
	width: 100%;
	height: 100%;	
}
.register_form{
	width: 100%;
	min-height: 100%;
	background-color: #fff;
	padding: px(80) px(40);
	.register_time{
		font-size:px(30);
		margin: px(30) 0;
	}
	.appointment{
		width: 100%;
		border: px(2) solid #6cb7f1;
		border-radius:px(10);
		padding: px(30) px(20);

	}
	.appointment_title{
		display: flex;
		font-size: px(30);
		align-items:center;
		justify-content:space-around;
		margin-bottom: px(30);
	}
	.mint-radiolist-title{
		
	}
}
</style>