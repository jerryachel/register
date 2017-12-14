<template>
	<div class="manage_add">
		<nav-top title="新增常用预约人"></nav-top>
		<div class="manage_from">
			<mt-field label="您的名字" placeholder="请输入您的名字" v-model="info.name"></mt-field>
			<mt-field label="您的电话" placeholder="请输入您的电话" v-model="info.phone"></mt-field>
			<mt-field label="您的地址" placeholder="请输入您的地址" v-model="info.address"></mt-field>
			<div class="appointment_sex">
				<span class="">您的性别</span>
				<div class="sex">
					<label :for="'man'" :class="info.sex=='man'? 'sex_active':''">男
						<input :id="'man'" type="radio" value="man" v-model="info.sex">
					</label>
					<label :for="'woman'" :class="info.sex=='woman'? 'sex_active':''">女
						<input :id="'woman'" type="radio" value="woman" v-model="info.sex">
					</label>
				</div>
			</div>
		</div>
		<div @click="add_manage" class="add_manage">新增</div>
	</div>
</template>
<script>
import navTop from '../../components/nav.vue'
import {Field,MessageBox} from 'mint-ui'
export default {
	components: {
		navTop:navTop,
		mtField:Field
	},
	data(){
		return {
			info:{
	  			name:'',
	  			phone:'',
	  			address:'',
	  			sex:'man'
	  		}
		}
	},
	methods:{
		add_manage(){
			for(var key in this.info){
				if (this.info[key] == '') {
					MessageBox.alert('请完整填写预约人信息后再提交')
					return false
				}
			}
			console.log(this.info)
		}
	}
}
</script>
<style lang="scss">
@import '../../assets/css/index.scss';
.manage_add{
	padding-top: px(80);
	height: 100%;
	position: relative;
	color: #333;
	.mint-button-text{
		font-size: px(30);
	}
	.mint-cell-wrapper{
		font-size: px(30)
	}
	.manage_from{
		width: 90%;
		margin: px(50) auto;
		border: 1px solid #ccc;
		border-radius: px(10);
		padding: px(30) 0;
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