<template>
	<!-- 家长消息详情 -->
	<view class="index_details flex_columns">
		<view class="news_details flex-center flex_columns" v-for="(item,index) in list" v-if="list">
			<text style="color: #C0C0C0;">{{item.contit}}</text>
			<view class="details_bk flex_columns">
				<view class="tit_bk flex-between flex-center">
					<view class="tit_name flex-center">
						<image :src="icon" mode="widthFix"></image>
						<text>{{tit}}</text>
					</view>
					<image style="width: 30px;" src="../../static/icon/more.png" mode="widthFix"></image>
				</view>
				<view class="list_block flex_columns">
					<view class="itemImg flex_columns" @click="yulanr(item.imglist)">
						<text>监控画面</text>
						<image v-for="(item2 ,index) in item.imglist" :src="item2" mode="widthFix" v-show="index==0"></image>
						<text>点击图片查看更多</text>
					</view>

					<view class="one_name flex-between">
						<text>进校时间：</text>
						<text class="wendu2">{{item.contit}}</text>
					</view>
					<view class="one_name flex-between">
						<text>出校时间：</text>
						<text class="wendu2">{{item.contit2}}</text>
					</view>
					<view class="one_name flex-between">
						<text>体温情况：</text>
						<text :class="[item.contit3 >= du ? 'wendu' : 'wendu2']">{{item.contit3}}°</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tit: {
				type: String,
				default: '系统消息'
			},
			icon: {
				type: String,
				default: '../../static/img/icon1.png'
			},
			selected: {
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				du: 38,
				list: [{
						contit: "2020年7月1号 12:30",
						contit2: "2020年7月1号 17:30",
						contit3: 37.6,
						imglist: ["../../static/img/jiankong2.jpg",
							"../../static/img/jiankong3.jpg"
						]
					},
					{
						contit: "2020年7月2号 12:30",
						contit2: "2020年7月2号 17:30",
						contit3: 37.3,
						imglist: ["../../static/img/jiankong4.jpg",
							"../../static/img/jiankong5.jpg"
						]
					},
					{
						contit: "2020年7月3号 12:30",
						contit2: "2020年7月3号 17:30",
						contit3: 42.4,
						imglist: ["../../static/img/jiankong6.jpg",
							"../../static/img/jiankong2.jpg"
						]
					}
				]
			}
		},
		methods: {
			yulanr(item2){
				this.openImg(item2);
			}
		}
	}
</script>

<style lang="scss">
	.index_details {
		max-width: 100%;
		min-height: 750px;
		padding: 15px;
		background-color: #F8F8F8;
	}

	.news_details {
		width: 100%;
		margin-top: 10px;

		.details_bk {
			width: 100%;
			// min-height: 200px;
			border-radius: 10px;
			border: #F1F1F1 1px solid;
			margin-top: 10px;
			// padding: 15px;
			background-color: #FFFFFF;

			.tit_bk {
				padding: 10px;
				border-bottom: #F1F1F1 1px solid;

				.tit_name {
					min-width: 20%;

					// padding: 10px 0;
					image {
						width: 30px;
						margin: 0 5px 0 0;
					}
				}
			}

			.list_block {
				max-width: 100%;
				padding: 10px;

				.itemImg {
					image {
						width: 100%;
						border-radius: 10px;
					}

					text:first-child {
						// text-align: right;
						margin: 7px 0;
						font-size: 15px;
						color: #333333;
					}

					text:last-child {
						text-align: right;
						margin-top: 7px;
						font-size: 13px;
						color: #C0C0C0;
					}
				}

				.one_name {
					padding-top: 10px;

					// border: #007AFF 1px solid;
					text:first-child {
						font-weight: 700;
						color: #333333;
					}

					// text:last-child {
					// 	color: #C0C0C0;
					// }
				}

				.wendu {
					color: #F9221D;
				}

				.wendu2 {
					color: #C0C0C0;
				}
			}
		}
	}
</style>
