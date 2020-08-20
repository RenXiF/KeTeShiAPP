<template>
	<!-- 支付页面 -->
	<view class="flex_columns page">
		<view class="page_name flex_columns flex-center">
			<text>支付金额</text>
			<text style="font-size: 70rpx; color: #F04E4C; font-weight: 800;">{{iputlist.num}}元</text>
			<!-- <input type="number" value=""  v-model="iputlist.orderNo" placeholder="请输入金额"/>
			<input type="number" value=""  v-model="iputlist.num" placeholder="请输入金额"/> -->
		</view>
		<view class="payment_tit flex_columns">
			<view class="tit">选择支付方式</view>
			<view class="tit_type flex_rows flex-center" v-for="(item, index) in fromlist" :key="index" @click="wxpay">
				<image :src="item.img" mode="widthFix"></image>
				<text>{{item.tit}}</text>
			</view>
		</view>
		<!-- <view class="flex-center flex_jufy_center">
			<button class="logout" style="color: #FFFFFF;" type="default" @click="huoqu">确定</button>
			<button class="logout" style="color: #FFFFFF;" type="default" @click="payment">立即支付</button>
		</view> -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userlist: '',
				fromlist: [{
					img: '../../../static/icon/weixing.png',
					tit: '微信'
				}],
				iputlist: {
					num: 0,
					orderNo: 0,
					type: 1,
				},
				orderlist: '',
				paylist: {
					orderNo: '',
					amount: 60,
					body: "服务开通"
				}
			};
		},
		onLoad(e) {
			console.log(e);
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			if (e.orderno) {
				this.iputlist.num = e.amount;
				this.paylist.amount = e.amount;
				this.paylist.orderNo = e.orderno;
			} else {
				e.selected != '' ? this.iputlist.num = e.selected : this.iputlist.num = 0; //赋值金额
				e.type == 0 ? this.iputlist.type = 1 : this.iputlist.type = 2; //赋值制作班牌
				console.log(this.iputlist.type);
				this.huoqu();
			}
		},
		methods: {
			huoqu() {
				this.utils.showloading();
				let list = {
					name: this.userlist.userName,
					usrId: this.userlist.userId,
					studentId: this.userlist.childId,
					schoolId: this.userlist.schoolId,
					classId: this.userlist.classId,
					type: this.iputlist.type, //，1安装班牌，2未安装
					status: 0, //，支付状态，0未支付，1已经支付，2异常
					quantity: this.iputlist.num < 100 ? 1 : 2, //，1半学年，2一年
					payType: '1', //，1微信，2支付宝
					amount: this.iputlist.num, //金额
					body: '服务开通'
				};
				console.log(list);
				this.http.getApi('order/found', list, 'post').then(res => {
					console.log("res");
					console.log(res);
					this.orderlist = res.data;
					this.paylist.orderNo = res.data.orderNo;
					this.paylist.amount = res.data.amount;
					this.paylist.body = res.data.body;
					uni.hideLoading();
				}).catch(err => {
					console.log("err");
					console.log(err);
					uni.hideLoading();
					this.utils.error(err.msg);
				});
				uni.hideLoading();
			},
			wxpay() {
				if (this.paylist.orderNo == '' || this.paylist.amount == 0) {
					this.utils.error('请求订单错误！');
					return;
				}
				this.utils.showloading();
				console.log(this.paylist);
				this.http.getApi('wxPay/unifiedOrder', this.paylist, 'get').then(res => {
					console.log("res");
					console.log(res);
					this.orderlist = res.data;
					this.payment();
				}).catch(err => {
					console.log("err");
					console.log(err);
					uni.hideLoading();
					this.utils.error(err.msg);
				});
			},
			payment() {
				console.log(this.orderlist);
				if (this.orderlist == '' || this.orderlist.amount == 0) {
					this.utils.error('订单生成错误！');
					return;
				}
				var _this = this;
				uni.requestPayment({
					provider: 'wxpay',
					orderInfo: _this.orderlist, //微信、支付宝订单数据
					success: function(res) {
						console.log(res);
						_this.utils.success('支付成功！', () => {
							_this.utils.showloading('正在返回首页');
							if (_this.userlist.userWxid.length>11) {
								_this.loginphone(_this.userlist.userPhone,_this.userlist.password);
								uni.switchTab({url: '/pages/index/index'});
								
							} else{
								_this.loginWeiXin(_this.userlist.userWxid);
								uni.switchTab({url: '/pages/index/index'});
							}
						});
					},
					fail: function(err) {
						_this.utils.error('您已取消支付！');
						uni.hideLoading();
					}
				});
				uni.hideLoading();
			},
			//手机号登录
			loginphone(user,pass) {
				this.http.getApi('/user/loginPhone',{userPhone:user, password:pass}, 'post').then(res => {
					console.log("成功");
					console.log(res);
					uni.setStorageSync('openid', res.data.userPhone);
					uni.setStorageSync('userlist', res.data);
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					_this.utils.error('返回失败！');
				});
				
			},
			//微信验证登录
			loginWeiXin(openid) {
				console.log(openid);
				this.http.getApi('/user/login',{storeOpendid:openid}, 'post').then(res => {
					console.log("成功");
					console.log(res);
					uni.setStorageSync('openid', res.data.userWxid);
					uni.setStorageSync('userlist', res.data);
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					_this.utils.error('返回失败！');
				});
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

	.page {
		max-width: 100%;
		padding: 30rpx;
		color: #333333;

		text {
			color: #333333;
		}

		.page_name {
			width: 100%;

			text {
				font-size: 45rpx;
				margin-top: 30rpx;
			}

			input {
				padding: 15rpx 30rpx;
				margin-bottom: 30rpx;
				border-radius: 20rpx;
				box-shadow: 1rpx 2rpx 6rpx #DAC1E7;
			}

		}

		.payment_tit {
			width: 100%;

			.tit {
				padding: 20rpx 0;
				margin-top: 50rpx;
				font-size: 36rpx;
				font-weight: 800;
			}

			.tit_type {
				width: 100%;
				margin-left: 20rpx;
				margin-top: 60rpx;

				image {
					width: 50rpx;
					margin-right: 30rpx;
				}
			}
		}
	}
</style>
