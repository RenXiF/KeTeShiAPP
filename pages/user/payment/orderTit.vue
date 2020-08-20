<template>
	<!-- 订单描述页面 -->
	<view class="flex_columns order_tit flex_columns" >
		<view class="block_tit flex_columns flex-center">
			<view class="name_tit flex-between flex-center">
				服务说明
			</view>
			<view class="name_ck flex_columns" v-for="(item ,index) in list" :key="index">
				<text>{{index+1}},{{item.name}}</text>
				<text style="color: #535353;">{{item.tit}}</text>
				
			</view>
			<view class="flex-between" style="width: 100%;" v-if="userlist.status == 1">
				<text>到期时间</text>
				<text>{{userlist.endtime.substring(0,16)}}</text>
			</view>
			
		</view>
		<view class="button_ck flex-center flex_jufy_center" @click="judgeOrder()">
			<text class="flex_jufy_center">{{tit}}</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight:0,
				pageNum:1,
				userlist:'',
				tit:'立即开通',
				endtime:'',
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
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			this.userlist.status == 1? this.tit='续费服务':this.tit='立即开通';
			// this.judgeOrder();
		},
		onReady() {
			uni.getSystemInfo({
			    success: function (res) {
					console.log(res);
					this.screenHeight = res.screenHeight;
			    }
			});
		},
		methods: {
			// 获取全部进订单
			judgeOrder() {
				this.utils.showloading();
				this.http.getApi('order/getMyOrder', {
						UsrId: this.userlist.userId,
						status:0,
						pageNum: this.pageNum,
						pageSize: 6
					}, 'get').then(res => {
						uni.hideLoading();
						console.log(res);
						var _this = this;
						if(res.data.list.length!=0){
							uni.showModal({
							    title: '订单已存在',
							    content: '您已提交过订单，是否前往订单？',
							    success: function (res) {
							        if (res.confirm) {
							            console.log('用户点击确定');
										_this.doUrl('/pages/order/order');
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						}else{
							_this.doUrl('/pages/user/payment/orderDete');
						}
					}).catch(err => {
						uni.hideLoading();
						console.log(err);
					});
			},
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
	padding-bottom: 500rpx;
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
