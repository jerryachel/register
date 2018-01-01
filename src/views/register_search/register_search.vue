<template>
	<div class="search_container">
		<nav-top title="挂号查询"></nav-top>
		
		<ul v-cloak class="register_list_wrap">
			<li :key="index" v-for="(item,index) in register_list" class="register_list">
				<p class="list_title">
					<span>{{item.recordTime}}</span>
					<span>号码：{{item.registerNumber}}</span>	
				</p>
				<p class="list_name">
					<span>姓名：{{item.contactName}}</span>
					<span>性别：{{item.sex?'女':'男'}}</span>
				</p>
				<p>电话：{{item.contactMobile}}</p>
				<p>地址：{{item.contactAddress}}</p>
			</li>
		</ul>
		<p v-cloak v-if="register_list.length == 0 " class="no_content">-- 暂无挂号单 --</p>
	</div>
</template>
<script>
import navTop from '../../components/nav.vue'
import axios from '../../service/axios.js'
export default {
	components: {
		navTop:navTop
	},
	data(){
		return {
			register_list:[],
		}
	},
	created(){
		this.loadList()
	},
	methods:{
		loadList(){
			let week = new Array("日", "一", "二", "三", "四", "五", "六")
			axios.get('clinic/orderQuery.do').then(({data})=>{
				let res = data.model
				for(let i in res){
					let fullDay = res[i].recordTime
					res[i].recordTime = res[i].recordTime.replace(new RegExp("-","gm"),"/")
					let day = week[new Date(res[i].recordTime).getDay()]
					fullDay = `${fullDay}（周${day}）${res[i].recordClass == 100?'上午':'下午'}`
					console.log(fullDay)
					res[i].recordTime = fullDay
				}
				this.register_list = res
			})	
		}
	}
}	
</script>
<style lang="scss">
@import '../../assets/css/index.scss';
.search_container{
	color: #6bb7f2;
	padding-top: px(80);
	.register_list_wrap{
	
	}
	.no_content{
		text-align: center;
		margin-top: px(50);
	}
	.register_list{
		width: 90%;
		margin: px(50) auto;
		//border: px(2) solid #ccc;
		border-radius:px(8);
		padding: px(15) px(25);
		font-size: px(30);
		box-shadow: px(0) px(10) px(60) px(0) rgba(107,183,242,.3);
		p{
			margin: px(20) auto;
			padding: 0 px(50) ;
		}
		.list_title{
			@extend %flex_justify;
			line-height: 2;
			border-bottom: px(1) solid #6bb7f2;
			padding:0 0 px(10) 0;
			margin-top: 0;
		}
		.list_name{
			@extend %flex_justify;
		}
	}
}	
</style>