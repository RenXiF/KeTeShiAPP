<template>
	<!-- 我的订单页面 -->
	<view class="flex_columns" style="max-width: 100%;">
		<view class="paging flex_rows flex-center flex-around">
			<view v-for="(menuTab,index) in menuTabs" :key="index" class="">
				<text class="tab-nav-item" @click="swichMenu(index)" :class="[currentTab==index ? 'tab-active' : '']">
					{{menuTab.name}}
				</text>
			</view>
		</view>
		<view class=" flex-center flex_jufy_center" style="width: 100%; height: 80rpx;">
			<!-- <image style="width: 150rpx;height:150rpx;" src="../../static/images/42k58PICxyu8jGAKhD4Zb.gif" mode=""></image> -->
		</view>
		<load-refresh ref="loadRefresh" :isRefresh="true" :refreshTime="800" :heightReduce="10" :backgroundCover="'#FFFFFF'"
		 :pageNo="pageNum" :totalPageNo="totalPage" @loadMore="loadMore" @refresh="refresh">
			<view slot="content-list">
				<!-- 数据列表 -->
				<view class="orderlist flex_columns">
					<view class="notice_ck flex_columns" v-for="(item ,index) in menuLists" :key="index" v-if="menuLists!=null">
						<view class="tit_list flex_wrap flex-center flex_rows">
							<image src="../../static/icon/dingdan.png" mode="widthFix"></image>
							<text v-if="item.status == 0">未支付</text>
							<text v-if="item.status == 1">已支付</text>
							<text v-if="item.status == 2">异常订单</text>
						</view>
						<view class="tit_ck flex-between">
							<text>订单号:</text>
							<text>{{item.orderNo}}</text>
						</view>
						<view class="tit_ck flex-between">
							<text>金额:</text>
							<text class="tit_b">{{item.amount}}元</text>
						</view>
						<view class="tit_ck flex-between">
							<text>描述:</text>
							<text>{{item.body}}</text>
						</view>
						<view class="tit_ck flex-between">
							<text>是否需要安装班牌:</text>
							<text v-if="item.type == 1">是</text>
							<text v-if="item.type == 2">否</text>
						</view>
						<view class="tit_ck flex-between">
							<text>发布时间:</text>
							<text>{{item.createdTime.substring(0,16)}}</text>
						</view>
						<view class="bt_ck flex-center flex_wrap flex_row_reverse">
							<view v-if="item.status == 0"><button type="default" class="buttA" @click="doUrl('/pages/user/payment/payment',item)">去支付</button></view>
							<view v-if="item.status == 0"><button type="default" class="buttB" @click="exitOrder(item.orderNo)">取消订单</button></view>
							<view v-if="item.status == 1"><button type="default" :disabled="true" class="buttA">已完成</button></view>
						</view>
					</view>
					<view class="null flex_columns flex-center" :style="{height:screenHeight+'px'}"  v-if="menuLists == null">
						<image src="../../static/icon/nullgogao.png" mode="widthFix"></image>
						<text style="color: #868686;">暂无订单</text>
					</view>
				</view>


			</view>
		</load-refresh>

	</view>
</template>

<script>
	import loadRefresh from '@/components/load-refresh/load-refresh.vue';
	export default {
		components: {
			loadRefresh
		},
		data() {
			return {
				screenHeight:0,
				list: [], // 数据集
				currPage: 1, // 当前页码
				totalPage: 1, // 总页数
				pageNum: 1,
				currentTab: 0,
				menuTabs: [
					{
						name: '未支付'
					},
					{
						name: '已支付'
					},
					{
						name: '异常订单'
					},
					{
						name: '全部订单'
					},
				],
				exit:false,
				menuLists:null, //加载订单
				userlist: '' //用户缓存
			};
		},
		onReady() {
			const res = uni.getSystemInfoSync();
			console.log(res);
			this.screenHeight = res.windowHeight;
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			this.judgeOrder(this.currentTab);
		},
		methods: {
			// 上划加载更多
			loadMore() {
				console.log('loadMore')
				// 请求新数据完成后调用 组件内loadOver()方法
				// 注意更新当前页码 currPage
				this.judgeOrder(this.currentTab);
				this.$refs.loadRefresh.loadOver();
			},
			// 下拉刷新数据列表
			refresh() {
				console.log('refresh')
				this.pageNum = 1;
				this.judgeOrder(this.currentTab);
				this.utils.success('刷新成功！');
				this.$refs.loadRefresh.runRefresh()
			},
			swichMenu: async function(current) { //点击其中一个选项
			console.log(current)
				if (this.currentTab == current) {
					return false;
				} else {
					this.currentTab = current;
					this.pageNum = 1;
					this.judgeOrder(this.currentTab);
					// console.log(this.menuLists);
				}
			},
			// 获取全部进订单
			judgeOrder(status) {
				if(status == 3){
					status = -1;
				}
				console.log("fhskjhfksj"+status);
				this.utils.showloading();
				this.http.getApi('order/getMyOrder', {
						UsrId: this.userlist.userId,
						status:status,
						pageNum: this.pageNum,
						pageSize: 6
					}, 'get').then(res => {
						uni.hideLoading();
						// this.menuLists = res.data.list;
						console.log(res);
						if (res.data.list.length == 0 ) {
							// this.menuLists = null;
							if (this.pageNum == 1) {
								this.menuLists = null;
							} else {
								this.utils.error('暂无更多')
								console.log('------暂无更多------');
							}
						} else {
							this.menuLists = this.pageNum > 1 ? this.menuLists.concat(res.data.list) : res.data.list;
							this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum + 1 : this.pageNum;
							this.totalPage = res.data.pages;
						}
					}).catch(err => {
						uni.hideLoading();
						console.log(err);
					});
			},
			exitOrder(order){
				if(this.exit == true){
					return;
				}
				this.exit = true;
				this.utils.showloading();
				console.log(order);
				this.http.getApi('order/exitOrder', {OrderNo: order}, 'get').then(res => {
						uni.hideLoading();
						console.log(res);
						this.utils.success('取消成功！',()=>{
							this.pageNum = 1;
							this.judgeOrder(this.currentTab);
							this.exit = false;
						});
					})
					.catch(err => {
						this.exit = false;
						uni.hideLoading();
						console.log(err);
					});
			}

		}
	};
</script>

<style lang="scss">
	.paging {
		background: #FFFFFF;
		width: 100%;
		min-height: 80rpx;
		position: fixed;
		z-index: 99999;
		top: 0;
		text {
			width: 20%;
			text-align: center;
		}

		.tab-nav-item {
			height: 80rpx;
			padding: 10rpx 20rpx;
			color: #585858;
			font-size: 0.8rem;
		}

		.tab-active {
			border-bottom: #E54D42 4rpx solid;
		}
	}

	//订单列表
	.orderlist {
		max-width: 100%;
		min-height: 1500rpx;
		// padding-top: 100rpx;
		padding: 30rpx;
		background-color: #F8F8F8;

		/* 内容 */
		.notice_ck {
			max-width: 100%;
			min-height: 300rpx;
			margin-bottom: 40rpx;
			padding: 10rpx;
			color: #333333;
			border-radius: 10rpx;
			// box-shadow: 1px 2px 6px #185044;
			box-shadow: 1px 2px 6px #787878;
			background-color: #FFFFFF;

			.tit_list {
				padding: 10rpx 0;
				border-bottom: #F1F1F1 1px solid;

				text {
					margin-left: 20rpx;
					// border: #24BD9F 2rpx solid;
				}

				image {
					// border: #24BD9F 2rpx solid;
					width: 80rpx;
				}
			}

			.tit_ck {
				padding: 10rpx;

				.tit_b {
					font-size: 40rpx;
					color: #E54D42;
				}
			}

			// 按钮
			.bt_ck {
				width: 100%;
				padding: 10rpx 0;

				button {
					font-size: 30rpx;
					margin-left: 20rpx;
				}

				.buttA {
					background-color: #1BCAA7;
					color: #FFFFFF;
				}

				.buttB {
					background-color: #ffaa7f;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
