<template>
	<!-- 订单描述页面 -->
	<view class="flex_columns order_tit flex_columns">
		<view class="block_tit flex_columns flex-center">
			<view class="name_tit flex-between flex-center">
				服务说明
			</view>
			<view class="name_ck flex_columns" v-for="(item ,index) in list" :key="index">
				<text>{{index+1}},{{item.name}}</text>
				<text style="color: #535353;">{{item.tit}}</text>
			</view>
			
		</view>
		<view class="button_ck flex-center flex_jufy_center" @click="doUrl('/pages/user/payment/orderDete')">
			<text class="flex_jufy_center">立即开通</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight:0,
				list:[
					{
						name:'进出校园图文提醒',
						tit:'当学生进出校园时，家长通过手机可以实时收到孩子每日进出校园的检测数据,及时关注孩子生活与健康状况。'
					},
					{
						name:'学生健康状态',
						tit:'家长，老师可通过APP，实时查看学生在校的身体状态，及体温信息'
					},
					{
						name:'班级课表',
						tit:'家长可通过手机APP，实时查看当前学生的班级课表情况，时刻关注学生的课程情况'
					},
					{
						name:'知识题库',
						tit:'APP包含类各年级的相关知识，可通过APP查询相关的知识题库'
					}
				]
			}
		},
		onLoad() {
			
		},
		onReady() {
			uni.getSystemInfo({
			    success: function (res) {
					console.log(res);
			        console.log(res.model);
			        console.log(res.pixelRatio);
			        console.log(res.windowWidth);
			        console.log(res.windowHeight);
			        console.log(res.language);
			        console.log(res.version);
			        console.log(res.platform);
					this.screenHeight = res.screenHeight;
			    }
			});
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.logoutb {
		width: 100%;
		padding: 5rpx 60rpx;
		background: none;
		// margin-top: 0rpx;
		/* box-shadow: 1px 2px 6px #F55866; */
		// box-shadow: 1rpx 2rpx 6rpx #DAC1E7;
		// background: linear-gradient(45deg, #0E64C7, #01A5FC);
		// border-radius: 20rpx;
		font-size: 38rpx;
		font-weight: 700;
	}
	
.order_tit{
	max-width: 100%;
	// padding: 30rpx;
	min-height: 1200rpx;
	background-color: #F8F8F8;
	.button_ck{
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 99;
		background: linear-gradient(45deg, #00d099, #00c28b);
		text{
			width: 100%;
			padding: 30rpx 0;
			color: #FFFFFF;
			font-size: 48rpx;
			font-weight: 700;
		}
	}
	.block_tit{
		max-width: 100%;
		min-height: 300rpx;
		margin: 30rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		.name_tit{
			width: 100%;
			padding: 20rpx 0;
			font-size: 35rpx;
			color: #333333;
		}
		.name_ck{
			width: 100%;
			min-height: 150rpx;
			text{
				padding: 10rpx 0;
			}
		}
	}
}
</style>
