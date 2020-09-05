<template>
	<!-- 公告列表页面 -->
	<view class="index_security" v-if="swList[0].key">
		<!-- <view class="anNiu  flex_columns flex_jufy_center flex-center" @click="anNiu= anNiu==0 ?1 :0">
			<image src="../../../static/icon/qiehuan1.png" mode="widthFix"></image>
			<text v-if="anNiu==0">作业</text>
			<text v-if="anNiu==1">公告</text>

		</view> -->
		<view class="" style="z-index: 9999999;">
		</view>
		<drag-button
		            :isDock="true"
		            :existTabBar="true"
		            @btnClick="anNiu= anNiu==0 ?1 :0"
		            @btnTouchstart="btnTouchstart"
		            @btnTouchend="btnTouchend"
					:text="anNiu==1?'切换公告':'切换作业'" />
		<jui-list @relist="relist" :dhList="swiperTabList" :listHeight="listHeight" @navChange="navChange" :swList="swList">
			<!-- 写法要注意 -->
			<view :id="'item'+i" :slot="'list'+i" v-for=" (x,i) in swList " :key="i">
				<!-- 这里写你的业务 -->
				<view class="bg-gradual-blue-sm" style="width: 750rpx;padding: 20px;min-height: 1500rpx;">

					<view class="notice_ck flex_columns" v-for="(item ,index) in x.key" :key="index" v-if="item.reserveTwo==anNiu">
						<view class="tit_list flex_wrap flex-center flex_rows">
							<image :src="anNiu==0?'../../../static/icon/gogao3.png':'../../../static/icon/zuoye2.png' " mode="widthFix"></image>
							<text>{{item.proclamationName}}</text>
						</view>
						<view class="titf_list flex_columns">
							<view class="flex_wrap flex_rows">
								<text>{{item.proclamationText}}</text>
							</view>
							<view class="flex-center justify-center" @click="img64zhuanyunlan(item)" v-if="item.imageOne">
								<image :src="item.imageOne" mode="aspectFill"></image>
							</view>
						</view>
						<view class=" flex-between">
							<text>发布时间:</text>
							<text>{{item.createdTime.substring(0,16)}}</text>
						</view>
					</view>
					<view class="null flex_columns flex-center" v-if="x.key.length==0">
						<image src="../../../static/icon/nullgogao.png" mode="widthFix"></image>
						<text style="color: #FFFFFF;">暂无公告</text>
					</view>

				</view>

				<!-- <view class="bg-gradual-blue-sm" v-if="i==1" style="width: 750rpx;padding: 20px; min-height: 1500rpx;">
						<view class="notice_ck flex_columns" v-for="(item ,index) in noticeClass" :key="index">
							<view class="tit_list flex_wrap flex-center flex_rows">
								<image src="../../../static/icon/gogao3.png" mode="widthFix"></image>
								<text>{{item.proclamationName}}</text>
							</view>
							<view class="titf_list flex_columns">
								<view class="flex_wrap flex_rows">
									<text>{{item.proclamationText}}</text>
								</view>
								<view class="flex-center justify-center"  @click="yulanr(item.imageOne)" v-if="item.imageOne">
									<image :src="item.imageOne" mode="aspectFill"></image>
								</view>
							</view>
							<view class=" flex-between">
								<text>发布时间:</text>
								<text>{{item.createdTime.substring(0,16)}}</text>
							</view>
						</view>
					</view>
					<view class="bg-gradual-blue-sm" v-if="i==2" style="width: 750rpx;padding: 20px; min-height: 1500rpx;">
						<view class="notice_ck flex_columns" v-for="(item ,index) in noticeCompany" :key="index">
							<view class="tit_list flex_wrap flex-center flex_rows">
								<image src="../../../static/icon/gogao3.png" mode="widthFix"></image>
								<text>{{item.proclamationName}}</text>
							</view>
							<view class="titf_list flex_columns">
								<view class="flex_wrap flex_rows">
									<text>{{item.proclamationText}}</text>
								</view>
								<view class="flex-center justify-center"  @click="yulanr(item.imageOne)" v-if="item.imageOne">
									<image :src="item.imageOne" mode="aspectFill"></image>
								</view>
							</view>
							<view class=" flex-between">
								<text>发布时间:</text>
								<text>{{item.createdTime.substring(0,16)}}</text>
							</view>
						</view>
					</view> -->

			</view>
		</jui-list>
	</view>
</template>

<script>
	// 判断页面是否触顶 ,0触顶,1没有触顶
	var top = 0
	import {
		pathToBase64,
		base64ToPath
	} from '../../../components/image-tools/index.js'
	import juiList from '@/components/navigation/jui-list/jui-list.vue';
	import dragButton from "@/components/drag-button/drag-button.vue";
	export default {
		components: {
			juiList,
			dragButton
		},
		onReady() {
			// 让swiper高度自适应
			// this.getSwiper(0);
			// this.mainHeight = uni.getSystemInfoSync().windowHeight;//获取屏幕的高度使得全屏左右滑动
			// console.log(this.mainHeight)

		},
		data() {
			return {
				anNiu: 0,
				// anNiuText:
				//juiList组件数据
				listHeight: 2300,
				swiperTabList: ['学校公告', '班级公告', '公司公告'], //导航列表
				// 俩个list 长度要一致
				swList: [{
						key: []
					},
					{
						key: []
					},
					{
						key: []
					}
				],

				imglist: [],

				noticetype: 0, //公告类型
				noticelist: [], //学校公告数据
				noticeClass: [], //学校班级数据
				noticeCompany: [], //学校公司数据
				userlist: '',
				more: true, //是否存在下一页
				pageNum: 1,
				pageSize: 4,
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			if (this.userlist) {
				this.panDuan(this.noticetype);
				this.getSwiper(0);
			} else {
				this.utils.error('您的账号未登录！请登录账号再试', () => {
					this.utils.navback();
				});
			}
		},
		methods: {
			btnClick(){
				
			},
			btnTouchstart(){
				
			},
			btnTouchend(){
				
			},
			// 触底事件
			onReachBottom() {
				this.panDuan2(this.noticetype);
			},
			// juilist组件数据
			// 改变nav时触发 e为当前nav的索引
			navChange(e) {
				console.log('eeee' + e)
				this.noticetype = e;
				this.pageNum = 1;
				this.panDuan(this.noticetype);
				this.getSwiper(e)
			},
			// 自适应swiper高度
			getSwiper(id) {
				setTimeout(() => {
					var query = uni.createSelectorQuery()
					query.select('#item' + id).boundingClientRect(data => {
						// console.log(data);
						this.listHeight = data.height
					}).exec();
				}, 500)
			},
			// 刷新
			relist() {

				// this.classNotice(1);
				this.pageNum = 1;
				this.panDuan(this.noticetype);
				// 这里写刷新业务
				// setTimeout(()=>{
				// 	// 收回下拉刷新
				// 	uni.$emit("reMsg",-1)
				// },2000)
			},

			// 图片预览
			img64zhuanyunlan(item) {
				let listimg = [];
				if (item.imageOne != null) {
					listimg[0] = item.imageOne
				}
				if (item.imageTwo != null) {
					listimg[1] = item.imageTwo
				}
				if (item.imageThree != null) {
					listimg[2] = item.imageThree
				}
				// console.log(listimg);
				this.openImg(listimg);
			},
			img64zhuanlist(item) {

				if (item.imageOne != null || item.imageOne != "") {
					this.img64zhuan(item.imageOne, (res) => {
						// console.log(res);
						item.imageOne = res;
						// this.imglist[0] = res;
					})
				}
				if (item.imageTwo != null || item.imageOne != "") {
					console.log(item);
					this.img64zhuan(item.imageTwo, (res) => {
						// console.log(res);
						item.imageTwo = res;
						// this.imglist[1] = res;
					})
				}
				if (item.imageThree != null || item.imageOne != "") {
					this.img64zhuan(item.imageThree, (res) => {
						// console.log(res);
						item.imageThree = res;
						// this.imglist[2] = res;
					})
				}

			},
			img64zhuan(base64, callback) {
				base64ToPath(base64).then(res => {
					// console.log("转换成功！")
					callback(res)
				}).catch(error => {
					// console.log("转换失败！")
					//  console.error(error)
				})
			},
			panDuan(e) {
				if (e == 0) {
					this.schoolNotice(this.pageNum)
				}
				if (e == 1) {
					this.classNotice(this.pageNum)
				}
				if (e == 2) {
					this.companyNotice()
				}
			},
			panDuan2(e) {
				if (e == 0) {
					this.schoolNotice(this.pageNum)
				}
				if (e == 1) {
					this.classNotice(this.pageNum)
				}
				if (e == 2) {
					this.companyNotice()
				}
			},
			// 获取学校公告
			schoolNotice(pageNum) {
				// if(this.more==false){ return ; }
				this.utils.showloading();
				let list = {
					schoolId: this.userlist.schoolId,
					pageNum: pageNum,
					pageSize: this.pageSize,
				};
				console.log(list)
				this.http.getApi('Mation/GetMation', list, 'post').then(res => {
					console.log(res)
					// this.noticelist = res.data;
					// this.swList[0].key = res.data.list;

					// this.more = res.data.hasNextPage;//是否存在下一页
					this.swList[0].key = this.pageNum > 1 ? this.swList[0].key.concat(res.data.list) : res.data.list;
					this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum + 1 : this.pageNum;
					// console.log(this.swList);
					if (this.swList[0].key.length != 0) {
						for (let i = 0; i < this.swList[0].key.length; i++) {
							this.img64zhuanlist(this.swList[0].key[i]);
							// console.log("已执行转换");
						}
					}

					uni.hideLoading();
					uni.$emit("reMsg", -1);
					this.utils.success('查询学校公告成功!', () => {
						this.getSwiper(0);
					});
				}).catch(err => {
					console.log("失败！！！");
					console.log(err);
					uni.hideLoading();
					uni.$emit("reMsg", -1);
					this.utils.error(err.msg);
				});
			},
			// 获取班级公告
			classNotice(pageNum) {
				this.utils.showloading();
				let list = {
					schoolId: this.userlist.schoolId,
					classId: this.userlist.classId,
					pageNum: pageNum,
					pageSize: this.pageSize,
				};
				console.log(list)
				this.http.getApi('Mation/GetMation', list, 'post').then(res => {
					// console.log("成功！！！");
					console.log(res)
					// this.noticeClass = res.data.list;
					this.swList[0].key = this.pageNum > 1 ? this.swList[0].key.concat(res.data.list) : res.data.list;
					this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum + 1 : this.pageNum;
					// console.log(this.swList[1].key);
					if (this.swList[1].key.length != 0) {
						for (let i = 0; i < this.swList[1].key.length; i++) {
							this.img64zhuanlist(this.swList[1].key[i]);
						}
					}
					uni.hideLoading();
					uni.$emit("reMsg", -1);
					this.utils.success('查询班级公告成功!', () => {
						this.getSwiper(1);
					});
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.$emit("reMsg", -1);
					this.utils.error(err.msg);
				});
			},
			// 获取公司公告
			companyNotice() {
				this.utils.showloading();
				this.http.getApi('Mation/GetGongsi', {}, 'get').then(res => {
					console.log(res)
					// this.noticeCompany = res.data;
					this.swList[2].key = res.data;
					if (this.swList[2].key.length != 0) {
						for (let i = 0; i < this.swList[2].key.length; i++) {
							this.img64zhuanlist(this.swList[2].key[i]);
						}
					}
					uni.hideLoading();
					uni.$emit("reMsg", -1);
					this.utils.success('查询公司公告成功!', () => {
						this.getSwiper(2);
					});
				}).catch(err => {
					console.log(err);
					uni.hideLoading();
					uni.$emit("reMsg", -1);
					this.utils.error(err.msg);
				});
			},

		}
	}
</script>

<style lang="scss">
	/* #ifndef  APP-PLUS-NVUE  */

	@import "../../../colorui/main.css";
	@import "../../../colorui/icon.css";
	/*  #endif  */
	@import "../../../static/css/index-app.css";
	.anNiu {
		//按钮
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		position: fixed;
		bottom: 120rpx;
		right: 100rpx;
		z-index: 9999;
		color: #808080;

		image {
			width: 80rpx;
		}

		// font-size: 20rpx;
		background-color: #FFFFFF;
	}

	/* 公告内容 */
	.notice_ck {
		width: 100%;
		min-height: 200rpx;
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

		.titf_list {
			width: 100%;
			padding: 20rpx 0;
			border-bottom: #F1F1F1 1px solid;

			text {
				padding: 10rpx 0;
			}

			image {
				border-radius: 10rpx;
				border: #EEEEEE 1px solid;
				width: 100%;
				max-height: 400rpx;
			}

		}
	}
</style>
