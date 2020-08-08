<template>
	<view class="index_news flex_columns">
		<view class="news_block flex_columns" v-show="list">
			<view class="one_bk flex-between flex-center" v-for="(item , index) in list" :key="index" @click="doUrl(item.http,{tit:item.tit,img:item.img})">
				<view class="dian"></view>
				<view class="one_img flex-center flex_jufy_center">
					<image :src="item.img" mode="widthFix"></image>
				</view>
				<view class="news_tit  flex_columns">
					<view class="tit flex-between flex-center">
						<text class="tit_z">{{item.tit}}</text>
						<text class="tit_f">{{item.data}}</text>
					</view>
					<view class="subtit  ellipsis">
						<text>{{item.titf}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="null flex_columns" v-show="!list">
			<image src="/static/icon/news_1.png" mode="widthFix"></image>
			<text class="title">{{title}}</text>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '暂无消息',
				userlist: '',
				img: "../../static/img/lunbo/1.png",
				list: [{
						tit: "系统消息",
						titf: "进校记录！",
						http: "/pages/news/newsDetails",
						img: "../../static/img/icon1.png",
						data: "2020-7-1 8:00"
					},
					// {
					// 	tit: "其他消息",
					// 	titf: "副标题您的孩子已平安进入校园！",
					// 	http: "/pages/news/newsDetails",
					// 	img: "../../static/img/icon4.png",
					// 	data: "2020-7-1 8:00"
					// }
				],
				data: [],
				leng: 0,
				openid:''
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
		},
		onShow() {
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('下拉刷新');
			// this.utils.showloading();
			// this.indexlist();
			// this.schoolNotice(1);
			// this.classNotice(1);
			// this.companyNotice();
			// uni.stopPullDownRefresh();
			this.utils.success('刷新成功！', () => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			newslist() {
				console.log('已执行');
				this.teacher();
				// if(this.userlist.userRole == 2){
				// 	this.teacher();
				// }
			},
			
			//老师请求
			teacher() {
				this.http.getApi('/discern/ClassDate', {
					schoolId: this.userlist.schoolId,
					classId: this.userlist.classId,
					selectDay: 4,
					pageNum:1,
					pageSize:10
				}, 'post').then(res => {
					console.log("res");
					console.log(res);
					uni.setStorageSync('newslist', res.data);
				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			},
			// 校长
			listdate() {
				this.http.getApi('discern/SchoolDate', {
					schoolid: this.userlist.schoolId
				}, 'get').then(res => {
					console.log("res");
					console.log(res);
					uni.setStorageSync('systemNews', res.data);
					let i = this.utils.getDate();
					this.data = [res.data];
					uni.setStorageSync('newslist', this.data);
					console.log(this.data);
				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			}
		}
	}
</script>

<style lang="scss">
	.index_news {
		background-color: #F8F8F8;
	}

	/* null */
	.null {
		image {
			width: 100px;
		}

		text {
			font-size: 20px;
			color: #8f8f94;
		}
	}

	// 消息主样式
	.dian {
		width: 10px;
		height: 10px;
		z-index: 9;
		position: relative;
		left: 70px;
		top: -27px;
		border-radius: 5px;
		background-color: #ff5500;
	}

	.news_block {
		max-width: 100%;
		padding: 0 15px;
		background-color: #FFFFFF;

		.one_bk {
			width: 100%;
			padding: 10px 0;
			border-top: #F8F8F8 2px solid;

			.one_img {
				min-width: 20%;
				min-height: 50px;

				// border-radius: 15px;
				// border: #4CD964 1px solid;
				image {
					width: 80%;
					border-radius: 15px;
					// border: #000000 1px solid;
				}
			}

			.news_tit {
				width: 78%;

				.tit {
					width: 100%;
					margin-bottom: 7px;

					.tit_z {
						font-size: 18px;
						font-weight: 700;
						color: #333333;
					}

					.tit_f {
						font-size: 15px;
						color: #8f8f94;
					}
				}

				.subtit {
					width: 90%;

					text {
						font-size: 12px;
						color: #8f8f94;
					}
				}
			}
		}
	}
</style>
