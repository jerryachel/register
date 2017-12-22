<template>
	<div class="manage">
		<nav-top title="常用预约人管理"></nav-top>
		<ul v-cloak class="manage_list_wrap">
			<li v-for="(item, index ) in manage_list" :key="index" class="manage_list">
				<div class="list_content">
					<p class="manage_list_name">
						<span>{{item.contactName}}（{{item.sex?'女':'男'}}）</span>
						<span>{{item.contactMobile}}</span>
					</p>
					<p>{{item.contactAddress}}</p>
				</div>
				<div @click="delete_manage(index,item.contactId)" class="delete_btn">删除</div>
			</li>
		</ul>
		<p v-cloak v-if="manage_list.length == 0 " class="no_content">-- 暂无常用联系人 --</p>
		<router-link to="/add" class="add_manage">新增</router-link>
	</div>
</template>
<script>
import axios from '../../service/axios.js'
import navTop from '../../components/nav.vue'
import {MessageBox} from 'mint-ui'
export default {
	components: {
		navTop:navTop
	},
	data(){
		return {
			manage_list:[]
		}
	},
	created(){
		axios.get('clinic/queryAllContact.do').then(({data})=>{
			let res = data.model
			this.manage_list = res
		})
	},
	methods:{
		delete_manage(i,id){
			MessageBox.confirm('确定删除该常用预约人?').then(action => {
				axios.get('clinic/deleteContact.do',{
					params:{
						contactId:id
					}
				}).then(({data})=>{
					console.log(data)
					this.manage_list.splice(i,1)
				})
				
			},()=>{
				console.log('cancel')
			});
		}
	}
}
</script>
<style lang="scss">
@import '../../assets/css/index.scss';
.manage{
	color: #6bb7f2;
	padding-top: px(80);
	height: 100%;
	position: relative;
	.manage_list{
		width: 90%;
		margin: px(30) auto;
		display: flex;
		font-size: px(30);
		box-shadow: px(0) px(10) px(60) px(0) rgba(107,183,242,.3);
	}
	.list_content{
		width: 80%;
		p{
			padding: px(30) px(40);
			overflow: hidden;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		}
		.manage_list_name{
			@extend %flex_justify;
		}
	}
	.delete_btn{
		width: 20%;
		display: flex;
		justify-content:center;
		align-items:center;
		color: #fff;
		background: #6bb7f2
	}
	.no_content{
		text-align: center;
		margin-top: px(50);
	}
	.add_manage{
		display: block;
		width:100%;
		height: px(80);
		color:#fff;
		background-color: #67c23a;
		position: absolute;
		bottom: 0;
		text-align: center;
		line-height: px(78);	
		font-size: px(30);
	}
}

</style>