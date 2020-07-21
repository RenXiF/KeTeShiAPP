<template>
	<!-- 家长消息详情 -->
	<view class="index_details flex_columns">
		<view class="news_details flex-center flex_columns" v-for="(item,index) in list.list" v-if="list">
			<text style="color: #C0C0C0;" v-if="item.createdTime">{{item.createdTime.substring(0,16)}}</text>
			<view class="details_bk flex_columns">
				<view class="tit_bk flex-between flex-center">
					<view class="tit_name flex-center">
						<image :src="icon" mode="widthFix"></image>
						<text>{{tit}}</text>
					</view>
					<image style="width: 30px;" src="../../static/icon/more.png" mode="widthFix"></image>
				</view>
				<view class="list_block flex_columns">
					<view class="itemImg flex_columns" @click="yulanr(item.imgbase64)">
						<text>监控画面</text>
						<!-- <image v-for="(item2 ,index) in item.imglist" :src="item2" mode="widthFix" v-show="index==0"></image> -->
						<image :src="item.imgbase64" mode="aspectFill"></image>
						<text>点击图片查看更多</text>
					</view>
					<view class="one_name flex-between" v-if="item.reserveFour">
						<text>名字：</text>
						<text class="wendu2">{{item.reserveFour}}</text>
					</view>
					<view class="one_name flex-between" v-if="item.reserveTwo">
						<text>进出类型：</text>
						<text class="wendu2" v-if="item.reserveTwo==1">进校</text>
						<text class="wendu2" v-if="item.reserveTwo==2">出校</text>
					</view>
					<view class="one_name flex-between" v-if="item.temperaturestate">
						<text>体温状态：</text>
						<text class="wendu2" v-if="item.temperaturestate==1">正常</text>
						<text class="wendu" v-if="item.temperaturestate==2">异常</text>
					</view>
					<view class="one_name flex-between" v-if="item.temperature">
						<text>体温情况：</text>
						<text :class="[item.temperature > item.standard ? 'wendu' : 'wendu2']">{{item.temperature}}°</text>
					</view>
				</view>
			</view>
		</view>
		<view class="null" v-if="!list">
			<text>暂无记录</text>
		</view>
		<cusPreviewImg ref="cusPreviewImg" :list="ImgList" />
	</view>
</template>

<script>
	import cusPreviewImg from '@/components/cus-previewImg/cus-previewImg.vue';
	export default {
		components:{
			cusPreviewImg
		},
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
				type: Array,
				default () {
					return []
				}
			}
		},
		data() {
			return {
				ImgList: [],//图片预览
			}
		},
		methods: {
			yulanr(item2) {
				this.ImgList = [item2];
				this.$refs.cusPreviewImg.open(this.ImgList);
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
