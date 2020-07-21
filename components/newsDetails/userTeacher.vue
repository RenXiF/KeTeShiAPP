<template>
	<!-- 老师消息详情 -->
	<view class="index_details flex_columns">
		<view class="news_details flex-center flex_columns" v-if="list">
			<text style="color: #C0C0C0;">{{data}}</text>
			<view class="details_bk flex_columns">
				<view class="tit_bk flex-between flex-center">
					<view class="tit_name flex-center">
						<image :src="icon" mode="widthFix"></image>
						<text>{{tit}}</text>
					</view>
					<image style="width: 30px;" @click="doUrl('pages/news/newsDetails/userTeacher')" src="../../static/icon/more.png" mode="widthFix"></image>
				</view>
				<view class="list_block flex_columns">
					<view class="itemImg flex_columns" @click="yulanr(imglist)">
						<!-- <text>监控画面</text> -->
						<image v-for="(item2 ,index) in imglist" :src="item2" mode="widthFix" v-show="index==0"></image>
						<!-- <text>点击图片查看更多</text> -->
					</view>
					<view class="one_name flex-between">
						<text>班级总人数：</text>
						<text class="wendu2">{{list.userSum}}人</text>
					</view>
					<view class="one_name flex-between">
						<text>当前打卡总人数：</text>
						<text class="wendu2">{{list.dateSum}}人</text>
					</view>
					<!-- <view class="one_name flex-between">
						<text>今日已打卡人员记录：</text>
						<text class="wendu2">{{list.userDate}}人</text>
					</view> -->
					<view class="one_name flex-between">
						<text>进入打卡记录总人数：</text>
						<text class="wendu2">{{list.jinType}}人</text>
					</view>
					<view class="one_name flex-between">
						<text>出门打卡总人数：</text>
						<text class="wendu2">{{list.chutype}}人</text>
					</view>
					<view class="one_name flex-between">
						<text>进入温度异常人数：</text>
						<text :class="[list.jinerror >= du ? 'wendu' : 'wendu2']">{{list.jinerror}}人</text>
					</view>
					<view class="one_name flex-between">
						<text>出门温度异常人数：</text>
						<text :class="[list.chuerror >= du ? 'wendu' : 'wendu2']">{{list.chuerror}}人</text>
					</view>
				</view>
			</view>
		</view>
		<view class="null flex_columns" v-if="!list" @click="doUrl('pages/news/newsDetails/userTeacher',{status:0})">
			<text>暂无记录</text>
			<text style="font-size: 12px;">点击这里查看历史记录</text>
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
			list: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {
				du: 1,
				data: this.utils.getDate(),
				imglist: ["../../static/img/lunbo/1.png",
					"../../static/img/lunbo/2.png"
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
