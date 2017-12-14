<template>
	<div class="search_container">
		<nav-top title="挂号查询"></nav-top>
		<p v-if="register_list.length == 0 " class="no_content">-- 暂无常用联系人 --</p>
		<ul v-infinite-scroll="loadMore"  class="register_list_wrap">
			<li :key="index" v-for="(item,index) in register_list" class="register_list">
				<p class="list_title">
					<span>{{item.time}}</span>
					<span>号码：{{item.num}}</span>	
				</p>
				<p class="list_name">
					<span>姓名：{{item.name}}</span>
					<span>性别：{{item.sex}}</span>
				</p>
				<p>电话：{{item.phone}}</p>
				<p>地址：{{item.address}}</p>
			</li>
		</ul>
	</div>
</template>
<script>
import navTop from '../../components/nav.vue'
export default {
	components: {
		navTop:navTop
	},
	data(){
		return {
			register_list:[{
				time:'2017月09月20日(周四)下午',
				num:12,
				name:'小陈',
				sex:'男',
				phone:'13555555555',
				address:'澄海区XXXXXXXXXXXXXXXX'
			},{
				time:'2017月09月20日(周四)下午',
				num:12,
				name:'小陈',
				sex:'男',
				phone:'13555555555',
				address:'澄海区XXXXXXXXXXXXXXXX'
			},{
				time:'2017月09月20日(周四)下午',
				num:12,
				name:'小陈',
				sex:'男',
				phone:'13555555555',
				address:'澄海区XXXXXXXXXXXXXXXX'
			},{
				time:'2017月09月20日(周四)下午',
				num:12,
				name:'小陈',
				sex:'男',
				phone:'13555555555',
				address:'澄海区XXXXXXXXXXXXXXXX'
			}],
			loading:false
		}
	},
	methods:{
		loadMore(){
			this.loading = true
			console.log(1111111)
			this.register_list.push({
				time:'2017月09月20日(周四)下午',
				num:12,
				name:'小陈ghahahahahahah',
				sex:'男',
				phone:'13555555555',
				address:'澄海区XXXXXXXXXXXXXXXX'
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