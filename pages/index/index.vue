<template>
	<view class="index_home flex_columns">
		<!-- <view class="status_height"></view> -->
		<Rotation :imgList="listimg"></Rotation>
		<view class="index_menu">
			<view class="menu_list flex_rows flex-center flex_wrap flex-around">
				<view class="menu_list_bk flex_columns flex-center " v-for="(item , index) in mens" :key="index" @click="menslist(item.tit)">
					<image :src="item.img" mode="widthFix"></image>
					<text>{{item.tit}}</text>
				</view>
			</view>
		</view>

		<view class="dynamic flex_columns" v-for="(item , index) in 3" :key="index">
			<ArticleCard title="夏日风光" author="user" @click="loginuser()"></ArticleCard>
			<ArticleCard title="美丽校园" author="编辑员" mode="triple" :imageList="imageList"></ArticleCard>
			<ArticleCard title="精彩校园" author="小风" mode="single" path="../../static/img/lunbo/1.png"></ArticleCard>
			<ArticleCard title="校园风光" author="编辑员" mode="large" path="../../static/img/lunbo/2.png"></ArticleCard>
		</view>
		<view class="edgeInsetBottom"></view>
	</view>
</template>

<script>
	import Rotation from "../../components/swiper-Rotation/swiper-Rotation.vue" //轮播
	// import navigation from "../../components/navigation.vue" //导航
	// import Calendar from '@/components/uni-calendar/uni-calendar.vue' //日历
	import ArticleCard from "@/components/article-card/article-card.vue" //动态
	export default {
		components: {
			// navigation,
			// Calendar,
			Rotation,
			ArticleCard
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.titiname
			});
		},
		data() {
			return {
				titiname: "遵义市科特士校园考勤",
				iStatusBarHeight: 0, //状态栏高度
				mens: [{
						tit: "校园公告",
						img: "../../static/icon/1.png",
					},
					{
						tit: "校园动态",
						img: "../../static/icon/2.png",
					},
					{
						tit: "健康防护",
						img: "../../static/icon/3.png",
					},
					{
						tit: "精彩阅读",
						img: "../../static/icon/4.png",
					},
					{
						tit: "最新知识",
						img: "../../static/icon/5.png",
					},
					{
						tit: "校友风采",
						img: "../../static/icon/6.png",
					},
					{
						tit: "学校食堂",
						img: "../../static/icon/7.png",
					},
					{
						tit: "学生活动",
						img: "../../static/icon/8.png",
					},
					{
						tit: "课外知识",
						img: "../../static/icon/9.png",
					},
					{
						tit: "精彩演讲",
						img: "../../static/icon/10.png",
					},
				],
				listimg: [{
						img: "../../static/img/lunbo/1.png"
					},
					{
						img: "../../static/img/lunbo/2.png"
					},
					{
						img: "../../static/img/lunbo/3.png"
					},
					{
						img: "../../static/img/lunbo/4.png"
					},
					{
						img: "../../static/img/lunbo/5.png"
					}
				],
				imageList: [{
						path: '../../static/img/lunbo/4.png'
					},
					{
						path: '../../static/img/lunbo/5.png'
					},
					{
						path: '../../static/img/lunbo/3.png'
					}
				]

			}
		},
		onLoad: function(options) {
			// this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44;
			// Userlist();
		},
		methods: {

			menslist(item) {
				console.log(item);
				this.doUrl("pages/index/indexMenslist", {
					name: item
				});
			},
			Userlist: function() {
				console.log("执行");
				this.http.getApi('/user/login', {
					name: 123
				}, 'get').then(res => {
					console.log(res)
					// this.datalist = res.data;
				}).catch(err => {
					console.log(err)
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index_home {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}

	// tabBar高度
	.edgeInsetBottom {
		width: 750rpx;
		height: var(--window-bottom);
		// background-color: #FFFFFF;
	}

	// 菜单
	.index_menu {
		max-width: 100%;
		padding: 15px;

		.menu_list {
			width: 100%;
			min-height: 100px;
			padding-bottom: 15px;
			background-color: #FFFFFF;
			border-radius: 15px;

			// border: #007AFF 1px solid;
			.menu_list_bk {
				width: 15%;
				// height: 50px;
				padding: 5px;
				margin-top: 15px;
				border-radius: 15px;
				background-color: #F8F8F8;

				// border: #DD524D 1px solid;
				text {

					color: #333333;
					font-size: 12px;
				}

				image {
					width: 40px;
				}
			}

			// .menu_list_bk:first-child {}
		}
	}

	// 动态
	.dynamic {
		width: 100%;
		// margin-bottom: 15px;
		// border-radius: 15px;
	}
</style>
