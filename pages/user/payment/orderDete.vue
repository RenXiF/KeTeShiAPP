<template>
	<!-- 订单提交 -->
	<view class="flex_columns index_order">

		<view class="order_tit flex_columns">
			<view class="tit">
				<text>是否制作班牌</text>
			</view>
			<view class="one_ck  flex-center flex_rows">
				<image src="../../../static/icon/banji.png" mode="widthFix">
					<view class="radio_item flex_rows" @click="radioClick(item,index)" v-for="(item ,index) in list" :key="index">
						<view :class="[radio1 == index ? 'active' : '', 'radio_icon']">√</view>
						<text>{{item.tit}}</text>
					</view>
			</view>
			<view class="tit">
				<text>学年选择</text>
			</view>
			<view class="one_ck  flex-center flex_rows">
				<image src="../../../static/icon/haizi.png" mode="widthFix">
					<view class="radio_item flex_rows" @click="radioClick2(item,index)" v-for="(item ,index) in list2" :key="index" v-if="radio1==0">
						<view :class="[radio2 == index ? 'active' : '', 'radio_icon']">√</view>
						<text>{{item.tit}}</text>
					</view>
					<view class="radio_item flex_rows" @click="radioClick2(item,index)" v-for="(item ,index) in list3" :key="index" v-if="radio1==1">
						<view :class="[radio2 == index ? 'active' : '', 'radio_icon']">√</view>
						<text>{{item.tit}}</text>
					</view>
			</view>
			<view class="explain flex_columns">
				<text> 服务说明：</text>
				<text>1，班牌说明，班牌用于班级展示学生的当前状态信息，如：学生考勤及课程信息等</text>
				<text>2，学年说明，用于学生进出校园身份检测及体温检测，检测学生在校的安全情况，</text>
			</view>
		</view>
		<view class="flex-center flex_jufy_center" @click="doUrl('/pages/user/payment/payment',{Selected:Selected,type:radio1})">
			<button class="logout" style="color: #FFFFFF;" type="default">立即支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				radio1: 0,
				radio2: 0,
				list: [{
						tit: '否',
						num:0
					},
					{
						tit: '是',
						num:1
					}
				],
				list2: [{
						tit: '60元/半学年',
						num:0.01
					},
					{
						tit: '120元/一学年',
						num:0.01
					}
				],
				list3: [{
						tit: '75元/半学年',
						num:0.01
					},
					{
						tit: '150元/一学年',
						num:0.01
					}
				],
				Selected:null
			}
		},
		onLoad() {
			this.radioClick2(this.list2[0],0);
		},
		methods: {
			//角色选择
			radioClick(item,index) {
				this.radio1 = index;
				if (index == 0) {
					this.radioClick2(this.list2[0],0);
				} else{
					this.radioClick2(this.list3[0],0);
				}
			},
			radioClick2(item,index) {
				console.log(item);
				this.radio2 = index;
				this.Selected = item.num;
			},
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
		background: linear-gradient(45deg, #0E64C7, #01A5FC);
		border-radius: 20rpx;
		font-size: 38rpx;
		font-weight: 700;
	}

	.index_order {
		max-width: 100%;
		padding: 20rpx 30rpx;

		.order_tit {
			width: 100%;

			.tit {
				font-size: 36rpx;
			}

			.explain {
				text{
					font-size: 20rpx;
					// color: #F8F8F8;
				}
			}

			.one_ck {
				width: 100%;
				min-height: 80rpx;
				// background-color: #F8F8F8;
				border-radius: 14rpx;
				justify-content: flex-start;
				padding: 10rpx 6rpx;
				margin: 20rpx 0;

				.radio_item {
					justify-content: flex-start;
					align-items: center;
					margin-left: 30rpx;
					padding: 10rpx;
					color: #333333;

					.radio_icon {
						width: 52rpx;
						height: 52rpx;
						border-radius: 50%;
						font-size: 30rpx;
						color: #ffffff;
						line-height: 52rpx;
						box-shadow: 2rpx 4rpx 12rpx #C8C7CC;
						background-color: #FFFFFF;
						text-align: center;

						&.active {
							// background-color: #FF6974;
							background: linear-gradient(45deg, #0E64C7, #01A5FC);
						}
					}
				}

				text {
					font-size: 30rpx;
				}

				image {
					width: 60rpx;
				}
			}

		}
	}
</style>
