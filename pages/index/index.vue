<template>
	<view class="index_home flex_columns">
		<!-- <view class="status_height"></view> -->
		<Rotation :imgList="listimg2"></Rotation>
		<view class="index_menu">
			<view class="menu_list flex_rows flex-center flex_wrap flex-around">
				<view class="menu_list_bk flex_columns flex-center " v-for="(item , index) in mens" :key="index" @click="menslist(item)">
					<image :src="item.img" mode="widthFix"></image>
					<text>{{item.tit}}</text>
				</view>
			</view>
		</view>
		<view class="index_notice flex_columns">
			<view class="notice_ck flex_columns" @click="doUrl('/pages/index/notice/noticeList')">
				<view class="notice_tit flex-center flex-between">
					<view class="flex-center">
						<image src="../../static/icon/gogao3.png" style="width: 80rpx; margin-right: 10rpx;" mode="widthFix"></image>
						<text>通知</text>
					</view>
					<view class="img">
						<image src="../../static/icon/right.png" mode="widthFix"></image>
					</view>
				</view>
				<view class="notice_ftit flex-center flex-between" v-for="(item2 ,index2) in 3" :key="index2">
					<!-- <text>学校</text> -->
					<image src="../../static/icon/gogao.png" style="width: 30px;" mode="widthFix"></image>
					<view class="" style="width: 90%;height: 70upx;" v-if="noticelist && index2 == 0">
						<semp-notice-bar scrollable bgColor="#ffffff" color="#333" showType="scrollLeft" :arrayText="noticelist"></semp-notice-bar>
					</view>
					<view class="" style="width: 90%;height: 70upx;" v-if="noticeClass && index2 == 1">
						<semp-notice-bar scrollable bgColor="#ffffff" color="#333" showType="scrollLeft" :arrayText="noticeClass"></semp-notice-bar>
					</view>
					<view class="" style="width: 90%;height: 70upx;" v-if="noticeCompany && index2 == 2">
						<semp-notice-bar scrollable bgColor="#ffffff" color="#333" showType="scrollLeft" :arrayText="noticeCompany"></semp-notice-bar>
					</view>
					<!-- <view class="" style="font-size: 12px; color: #CBCBCD;">
						点击查看更多
					</view> -->
				</view>
			</view>
			
			<!-- <semp-notice-bar scrollable showType="scrollTop" :arrayText="textlist" :rows="true" round></semp-notice-bar> -->
		</view>

		<view class="dynamic flex_columns" v-for="(item , index) in 1" :key="index">
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
	import sempNoticeBar from "@/components/semp-notice-bar/semp-notice-bar.vue"
	export default {
		components: {
			// navigation,
			// Calendar,
			Rotation,
			ArticleCard,
			sempNoticeBar
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.titiname
			});
		},
		data() {
			return {
				titiname: "科特士校园安防",
				userlist: '',
				iStatusBarHeight: 0, //状态栏高度
				swList:[{
					key:['暂无通知']
				},
				{
					key:['暂无通知']
				},
				{
					key:['暂无通知']
				}
				],
				noticelist:['暂无通知'],//学校公告数据
				noticeClass:['暂无通知'],//学校班级数据
				noticeCompany:['暂无通知'],//学校公司数据
				pageNum:1,
				pageSize:3,
				
				// icon:'sound',
				textlist: [
					'新版震撼发部了！',
					'人气爆红，发布日流量超过十万',
					'36氪热文榜推荐、CSDN公号推荐分享文章'
				],
				mens: [{
						tit: "校园公告",
						http: 'pages/index/notice/noticeList',
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
						tit: "课表精灵",
						http: 'pages/index/Timetable/Timetable',
						img: "../../static/icon/4.png",
					},
					{
						tit: "知识题库",
						img: "../../static/icon/5.png",
						http: 'pages/index/Question/Question',
					},
					// {
					// 	tit: "校友风采",
					// 	img: "../../static/icon/6.png",
					// },
					// {
					// 	tit: "学校食堂",
					// 	img: "../../static/icon/7.png",
					// },
					// {
					// 	tit: "学生活动",
					// 	img: "../../static/icon/8.png",
					// },
					// {
					// 	tit: "课外知识",
					// 	img: "../../static/icon/9.png",
					// },
					// {
					// 	tit: "精彩演讲",
					// 	img: "../../static/icon/10.png",
					// },
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
				listimg2: [{
						img: "../../static/img/lunbo/6.jpg"
					},
					{
						img: "../../static/img/lunbo/3.jpg"
					},
					{
						img: "../../static/img/lunbo/4.jpg"
					},
					{
						img: "../../static/img/lunbo/5.jpg"
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
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
		},
		onShow() {
			if (this.userlist != '') {
				this.utils.showloading();
				this.indexlist();
				this.schoolNotice(1);
				this.classNotice(1);
				this.companyNotice();
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.utils.showloading();
			this.indexlist();
			this.schoolNotice(1);
			this.classNotice(1);
			this.companyNotice();
			// uni.stopPullDownRefresh();
			this.utils.success('刷新成功！', () => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			indexlist() {
				this.http.getApi('/school/getschool', {
					schoolid: this.userlist.schoolId
				}, 'get').then(res => {
					console.log("res");
					console.log(res);
					this.titiname = res.data.schoolName;
					uni.hideLoading();
				}).catch(err => {
					console.log("err");
					console.log(err);
					uni.hideLoading();
					this.utils.error(err.msg);
				});
			},
			menslist(item) {
				console.log(item);
				if (item.http) {
					this.doUrl(item.http);
				} else {
					this.doUrl("pages/index/indexMenslist",item);
				}

			},
			// 获取学校公告
			schoolNotice(pageNum){
				let list ={
					schoolId:this.userlist.schoolId,
					pageNum:pageNum,
					pageSize:this.pageSize,
				};
				console.log(list)
				this.http.getApi('Mation/GetMation',list, 'post').then(res => {
						console.log(res)
						this.noticelist = res.data.list.length==0 ?[0] : res.data.list;
						// this.swList[0].key = res.data.list;
						uni.hideLoading();
						// this.utils.success('查询学校公告成功!',()=>{
						// 	// this.noticelist = [0];
						// });
					}).catch(err => {
						console.log(err);
						uni.hideLoading();
						this.utils.error(err.msg);
					});
			},
			// 获取班级公告
			classNotice(pageNum){
				let list ={
					schoolId:this.userlist.schoolId,
					classId:this.userlist.classId,
					pageNum:pageNum,
					pageSize:this.pageSize,
				};
				console.log(list)
				this.http.getApi('Mation/GetMation',list, 'post').then(res => {
						console.log(res)
						this.noticeClass = res.data.list.length==0 ?[0] : res.data.list;
						uni.hideLoading();
						// this.utils.success('查询班级公告成功!',()=>{
						// });
					}).catch(err => {
						console.log(err);
						uni.hideLoading();
						this.utils.error(err.msg);
					});
			},
			// 获取公司公告
			companyNotice(){
				this.http.getApi('Mation/GetGongsi',{},'get').then(res => {
						console.log(res)
						this.noticeCompany = res.data.length==0 ?[0] : res.data.list;
						uni.hideLoading();
						// this.utils.success('查询公司公告成功!',()=>{
						// });
					}).catch(err => {
						console.log(err);
						uni.hideLoading();
						this.utils.error(err.msg);
					});
			},
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
	.index_menu,
	.index_notice {
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

	// 公告
	.index_notice {
		// background-color: #FFFFFF;
		.notice_ck{
			border-radius: 15px;
			padding: 0 15px;
			background-color: #FFFFFF;
			.notice_tit {
				padding-top: 5px;
				// border-bottom: #EEEEEE 1px solid;
			}

			.notice_ftit {
				width: 100%;
				padding: 5px 0;
				border-top: #EEEEEE 1px solid;
			}
		}
		
	}

	// 动态
	.dynamic {
		width: 100%;
		// margin-bottom: 15px;
		// border-radius: 15px;
	}
</style>
