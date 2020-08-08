<template>
	<!-- 知识题库页面 -->
	<view class="index_g flex_columns">
		<view class="header flex-between flex-center">
			<view class="tit_ck ">
				<picker @change="bindGrade" :value="gradeindex" :range="grade">
					<view class="uni-input ">年级：{{grade[gradeindex]}}</view>
				</picker>
			</view>
			<!-- <text>点击文本选择</text> -->
			<view class="tit_ck ">
				<picker @change="bindSubject" :value="subjectindex" :range="subject">
					<view class="uni-input ">科目：{{subject[subjectindex]}}</view>
				</picker>
			</view>
		</view>
		<view class="foot flex_columns">
			<view class="foot_card flex_columns" v-for="(item ,index) in datalist" :key="index" v-if="datalist">
				<view class="foot_tit flex_wrap">
					标题：{{item.reserveOne}}
				</view>
				<view class="foot_content flex_wrap">
					内容：{{item.reserveTwo}}
				</view>
				<view class="foot_img  flex_rows flex_wrap justify-center" v-if="item.imageOne" @click="opengimg1(item)">
					<image :src="item.imageOne" mode="widthFix" v-if="item.imageOne"></image>
					<image :src="item.imageTwo" mode="widthFix" v-if="item.imageTwo"></image>
					<image :src="item.imageThree" mode="widthFix" v-if="item.imageThree"></image>
				</view>
			</view>
			<view class="null flex_columns flex-center" v-if="!datalist">
				<image src="../../../static/icon/nullgogao.png" mode="widthFix"></image>
				<text style="color: #e1e1e1;">暂无题库</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from '../../../components/image-tools/index.js';
	export default {
		data() {
			return {
				grade: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
				subject: ['语文', '数学', '英语'],
				opengimglist: ['../../../static/icon/nullgogao.png'],
				gradeindex: 0,
				subjectindex: 0,
				datalist: null,
				pageNum: 1,
				pageSize: 6
			};
		},
		onLoad() {
			this.foollist(1);
		},
		//下拉刷新
		onPullDownRefresh() {
			console.log('下拉刷新');
			this.foollist(1);
			// uni.stopPullDownRefresh();
			this.utils.success('刷新成功！', () => {
				uni.stopPullDownRefresh();
			});
		},
		methods: {
			opengimg1(item) {
				if(item.imageOne != null){this.opengimglist[0] = item.imageOne;}
				if(item.imageTwo != null){this.opengimglist[1] = item.imageTwo;}
				if(item.imageThree != null){this.opengimglist[2] = item.imageThree;}
				console.log(this.opengimglist);
				this.openImg(this.opengimglist);
			},
			img64zhuanlist(item) {
				if (item.imageOne != null) {
					this.img64zhuan(item.imageOne, (res) => {
						item.imageOne = res;
					})
				}
				if (item.imageTwo != null) {
					this.img64zhuan(item.imageTwo, (res) => {
						item.imageTwo = res;
					})
				}
				if (item.imageThree != null) {
					this.img64zhuan(item.imageThree, (res) => {
						item.imageThree = res;
					})
				}
			},
			img64zhuan(base64, callback) {
				base64ToPath(base64).then(res => {
					console.log("转换成功！")
					callback(res)
				}).catch(error => {
					console.log("转换失败！")
					console.error(error)
				})
			},
			//触底加载更多
			onReachBottom() {
				if (this.datalist == null) {
					return;
				} else {
					console.log('触底刷新');
					this.foollist(1);
				}
			},
			//base64转图片
			forlist(list) {
				for (let i = 0; i < list.length; i++) {
					this.img64zhuanlist(list[i]);
					console.log("已执行转换");
				}
			},
			foollist(pageNum) {
				this.utils.showloading();
				let list = {
					roleId: this.gradeindex,
					subjectId: this.subjectindex,
					pageNum: pageNum,
					pageSize: this.pageSize
				};
				this.http.getApi('Question/getQuestion', list, 'get').then(res => {
					console.log("res");
					console.log(res);
					let baselist = res.data.list;
					if (baselist.length != 0) {
						this.forlist(baselist);
						if (baselist.length == 0) {
							if (this.pageNum == 1) {
								this.datalist = null;
								uni.hideLoading();
							} else {
								this.utils.error('暂无题库')
								console.log('------暂无题库------');
								uni.hideLoading();
							}
						} else {
							this.datalist = this.pageNum > 1 ? this.datalist.concat(baselist) : baselist;
							this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum + 1 : this.pageNum;
							uni.hideLoading();
						}
					}else{
						if (this.pageNum == 1) {
							this.datalist = null;
							this.utils.error('暂无题库')
							uni.hideLoading();
						} else {
							this.utils.error('暂无题库')
							console.log('------暂无题库------');
							uni.hideLoading();
						}
					}
					// uni.hideLoading();
					console.log("打印baselist");
					console.log(baselist);


				}).catch(err => {
					console.log("err");
					console.log(err);
					this.datalist = null;
					uni.hideLoading();
					this.utils.error(err.msg);
				});
			},
			bindGrade: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.gradeindex = e.target.value;
				this.pageNum = 1;
				this.foollist(1);
			},
			bindSubject: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.subjectindex = e.target.value;
				this.pageNum = 1;
				this.foollist(1);
			},
		}
	}
</script>

<style lang="scss">
	.index_g {
		width: 100%;
		height: 100%;
	}

	.header {
		max-width: 100%;
		// min-height: 70px;
		// margin-bottom: 30px;
		background-color: #F8F8F8;
		padding: 0 15px;

		.tit_ck {
			height: 100%;
			padding: 5px 10px;
			border-bottom: #07D188 3px solid;
			font-size: 12px;
		}
	}

	.foot {
		width: 100%;
		min-height: 700px;
		margin-top: 20px;

		// background-color: #F8F8F8;
		.foot_card {
			max-width: 100%;
			color: #333333;
			background-color: #FFFFFF;
			margin-bottom: 30px;

			.foot_tit,
			.foot_content,
			.foot_img {
				padding: 10px;
				border-bottom: #EEEEEE 1px solid;
			}

			.foot_tit {
				z-index: 999;
			}

			.foot_content {
				z-index: 999;
			}

			.foot_img {
				image {
					border: #07D188 1px solid;
					max-width: 150px;
				}
			}
		}
	}
</style>
