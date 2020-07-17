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
		computed: {
			formatPrice() {
				return function(val) {
					return val ? parseFloat(val).toFixed(2) : '';
				}
			},
			formatTime() { //格式化时间，并截取到天数
				return function(val) {
					return this.utils.formatdate(val / 1000).substring(0, 5) //substring（）截取时间
				}
			}
		},
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
					{
						tit: "其他消息",
						titf: "副标题您的孩子已平安进入校园！",
						http: "/pages/news/newsDetails",
						img: "../../static/img/icon4.png",
						data: "2020-7-1 8:00"
					}
				],
				data:[],
				leng:0
			}
		},
		onPullDownRefresh() {
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
			// this.utils.success("刷新成功！");
		},
		onLoad: function(options) {
			setTimeout(function() {

			}, 1000);
			uni.startPullDownRefresh();
		},
		onShow() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			// this.listdate();
			this.newslist();
		},
		methods: {
			newslist(){
				console.log('已执行');
				this.teacher();
				// if(this.userlist.userRole == 2){
				// 	this.teacher();
				// }
			},
			//老师请求
			teacher(){
				this.http.getApi('/discern/ClassDate', {
					schoolId: this.userlist.schoolId,
					classId: this.userlist.classId,
					selectDay: 0,
					pageNum:1,
					pageSize:10
				}, 'post').then(res => {
					console.log("res");
					console.log(res);
					uni.setStorageSync('newslist', res.data);
					// if (res.data.list.length==0) {
					// 	if (this.pageNum==1) {
					// 		this.menuLists = null;
					// 	} else{
					// 		this.utils.error('暂无更多')
					// 		console.log('------暂无更多------');
					// 	}
					// } else{
					// 	this.menuLists = this.pageNum>1 ? this.menuLists.concat(res.data.list) : res.data.list;
					// 	this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum+1 : this.pageNum;
					// }
					  
				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			},
			listdate() {
				// var _this = this;
				this.http.getApi('discern/SchoolDate', {
					schoolid: this.userlist.schoolId
				}, 'get').then(res => {
					console.log("res");
					console.log(res);
					// uni.setStorageSync('systemNews', res.data);
					// if (res.data.list.length==0) {
					// 	if (this.pageNum==1) {
					// 		this.menuLists = null;
					// 	} else{
					// 		this.utils.error('暂无更多')
					// 		console.log('------暂无更多------');
					// 	}
					// } else{
					// 	this.menuLists = this.pageNum>1 ? this.menuLists.concat(res.data.list) : res.data.list;
					// 	this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum+1 : this.pageNum;
					// }
					let i = this.utils.getDate();
					// this.$set(list,'dateli',i);
					// console.log(list);
					this.data = [res.data];
					uni.setStorageSync('newslist', this.data);
					console.log(this.data);
					// let li = res.data;
					
					// console.log(this.data.length);
					// this.leng = this.data.length;
					// Vue.set(this.data,this.leng,{dateli:i,typeOneSum:li.typeOneSum,typeTwoSum:li.typeTwoSum,studentSum:li.studentSum,typeOneErry:li.typeOneErry,});
					// console.log(this.data);
					
					  
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
	.dian{
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
