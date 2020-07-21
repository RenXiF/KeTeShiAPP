<template>
	<!-- 设置轮播图 -->
	<view class="index_rotation">
		<view class="flex_columns">
			<view class="tit flex_jufy_center">
				<button type="default" class="logout" style="color: #FFFFFF;" @click="urlimg()">点击选择图片</button>
			</view>
			<Rotation :imgList="yuimg"></Rotation>
			<view class="tit flex_jufy_center" v-if="yuimg.length>0">
				<button type="default" class="logout" style="color: #FFFFFF;" @click="Submit()">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	// import chooseImage from '@/components/cus-previewImg/cus-previewImg.vue';
	// import anUploadImg from '@/components/an-uploadImg/an-uploadImg.vue';
	import Rotation from "../../components/swiper-Rotation/swiper-Rotation.vue" //轮播
	import {
		pathToBase64,
		base64ToPath
	} from '../../components/image-tools/index.js'
	export default {
		components: {
			Rotation
		},
		data() {
			return {
				userlist: '',
				imglist: [{
						schoolId: '0',
						addSort: '0',
						imageUrl: '0'
					},
					{
						schoolId: '0',
						addSort: '0',
						imageUrl: '0'
					},
					{
						schoolId: '0',
						addSort: '0',
						imageUrl: '0'
					}
				],
				yuimg: []
			}
		},
		onLoad() {
			if (this.utils.isLogin() == false) {
				this.utils.error('未登录！请先登录账号', () => {
					this.utils.navback();
				})
			}
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
		},
		methods: {
			urlimg() {
				var _this = this;
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						// console.log(JSON.stringify(res.tempFilePaths));
						console.log(res);
						if (res.tempFilePaths.length > 0) {
							for (let i = 0; i < res.tempFilePaths.length; i++) {
								let img = res.tempFilePaths[i];
								pathToBase64(img).then(base64 => {
									_this.imglist[i].schoolId = _this.userlist.schoolId;
									_this.imglist[i].addSort = i;
									_this.imglist[i].imageUrl = base64;
									console.log(base64 + '成功');
								}).catch(error => {
									console.error(error + '失败');
								});
							}
							_this.yuimg = _this.imglist;
							console.log(_this.imglist);
						}
					}
				});
			},
			Submit() {
				if (this.yuimg[2].imageUrl == '0') {
					this.utils.error('请至少上传三张图片');
					return;
				}
				this.utils.showloading();
				this.http.getApi('/carouse/Add', this.yuimg, 'post').then(res => {
					console.log("res");
					console.log(res);
					this.utils.success('提交成功！',()=>{
						this.utils.navback();
						uni.hideLoading();
					});
				}).catch(err => {
					console.log("err");
					console.log(err);
					uni.hideLoading();
					this.utils.error(err.msg);
				});
			}

		}
	}
</script>

<style lang="scss">
	.logout {
		// padding: 5px 10px;
		// margin-right: 20px;
		color: #FFFFFF;
		/* box-shadow: 1px 2px 6px #F55866; */
		box-shadow: 1px 2px 6px #DAC1E7;
		/* background: linear-gradient(45deg,#c779d0,#4bc0c8); */
		background: linear-gradient(45deg, rgba(254, 172, 94, 0.5), rgba(199, 121, 208, 0.5), rgba(75, 192, 200, 0.5));
		border-radius: 10px;
		font-size: 17px;
		font-weight: 700;
	}

	.index_rotation {
		min-height: 700px;
		background-color: #F8F8F8;
	}

	.tit {
		max-width: 100%;
		padding: 10px;

		button {
			min-width: 60%;
		}
	}

	.imglist {
		width: 100%;
		margin-top: 20px;
	}
</style>
