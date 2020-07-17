<template>
	<!-- 关于app -->
	<view class="index_app flex_columns">
		<view class="index_icon flex-center flex_columns flex_jufy_center">
			<image src="../../static/logo.png" mode="widthFix"></image>
			<text>V1.0.0</text>
		</view>
		<view class="index_titbk">
			<list :listdata="listtit"></list>
		</view>
		
		<view class="index_contact flex-center flex_columns">
			<view class="contact_one flex-center">
				<text>服务条款</text>
				<view class="boder_xia"></view>
				<text>官网</text>
				<view class="boder_xia"></view>
				<text @click="callPhone(phone)">客服热线：{{phone}}</text>
			</view>
			<text class="contact_twe">版权所有：科特士科技有限公司</text>
		</view>
	</view>
</template>

<script>
	import list from "../../components/list/list.vue"//导入列表组件
	export default {
		components:{
			list
		},
		data() {
			return {
				listtit:[
					{name:"推荐给好友",
					http:"../../pages/index"
					},
					{name:"协议",
					http:"../../pages/index"
					}
				]
			}
		},
		methods: {
		}
	}
</script>

<style>
	.boder_xia{
		width: 1px;
		height: 80%;
		margin: 0 1em;
		background-color: #007AFF;
	}
	.index_app{
		background-color: #F8F8F8;
	}
.index_icon{
	width: 100%;
	min-height: 280px;
	
}
.index_icon image{
	width: 100px;
	/* height: ; */
	border-radius: 15px;
}
.index_icon text{
	font-size: 20px;
	color: #999999;
}


.index_titbk{
	min-height: 355px;
}


.contact_one{
	height: 20px;
	font-size: 15px;
	color: #007AFF;
}
.contact_twe{
	font-size: 12px;
	color: #C8C7CC;
}
</style>
