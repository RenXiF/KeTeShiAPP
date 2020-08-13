<template>
	<!-- 支付页面 -->
	<view class="flex_columns page">
		<view class="page_name flex_columns flex-center">
			<text>支付金额</text>
			<text style="font-size: 70rpx; color: #F04E4C; font-weight: 800;">10000.00元</text>
		</view>
		<view class="payment_tit flex_columns">
			<view class="tit">支付方式</view>
			<view class="tit_type flex_rows flex-center" v-for="(item, index) in fromlist" :key="index">
				<image :src="item.img" mode="widthFix"></image>
				<text>{{item.tit}}</text>
			</view>
		</view>
		<view class="flex-center flex_jufy_center">
			<button class="logout" style="color: #FFFFFF;" type="default">立即支付</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromlist:[
					{img:'../../../static/icon/weixing.png',tit:'微信'},
					{img:'../../../static/icon/yinhangka.png',tit:'银行卡'}
				]
			};
		}
	}
</script>

<style lang="scss">
	.logout {
		padding: 5rpx 60rpx;
		color: #FFFFFF;
		margin-top: 120rpx;
		/* box-shadow: 1px 2px 6px #F55866; */
		box-shadow: 1rpx 2rpx 6rpx #DAC1E7;
		background: linear-gradient(45deg,#0E64C7,#01A5FC);
		border-radius: 20rpx;
		font-size: 38rpx;
		font-weight: 700;
	}
.page{
	max-width: 100%;
	padding: 30rpx;
	color: #333333;
	text{
		color: #333333;
	}
	.page_name{
		width: 100%;
		text{
			font-size: 45rpx;
			margin-top: 30rpx;
		}
	}
	.payment_tit{
		width: 100%;
		.tit{
			padding: 20rpx 0;
			margin-top: 50rpx;
			font-size: 36rpx;
			font-weight: 800;
		}
		.tit_type{
			width: 100%;
			margin-left: 20rpx;
			margin-top: 60rpx;
			image{
				width: 50rpx;
				margin-right: 30rpx;
			}
		}
	}
}
</style>
