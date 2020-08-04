<template>
	<!-- 意见反馈页面 -->
	<view class="index_feedbk">
		<navigation @clickLeft="navback()" @clickRight="Submit()" fixed="true" title="反馈" backgroundColor="#ffffff" leftIcon="../../static/icon/left.png"
		 rightText="提交"></navigation>
		<view class="noe_feedbk flex_columns">
			<view class="feedbk_tittextare centerlay">
				<textarea value="" v-model="fromlist.ticklingText" maxlength="300" @confirm="Submit()" placeholder="您的意见对我们很重要" />
				</view>
			<view class=" imgtit flex_columns">
				<view class=" flex_rows flex-between">
					<text>添加图片</text>
					<text style="font-size: 13px; color: #626365;">(注意：最多上传三张图片)</text>
				</view>
				
				<view class=" flex_wrap flex-around">
					<view class="imglist" v-if="fromlist.imageOne!=''">
						<image :src="fromlist.imageOne" mode="aspectFit"></image>
						<image class="eliminate" @click="fromlist.imageOne=''" src="../../static/icon/error1.png" mode="widthFix"></image>
					</view>
					<view class="imglist" v-if="fromlist.imageTwo!=''">
						<image :src="fromlist.imageTwo" mode="aspectFit"></image>
						<image class="eliminate" @click="fromlist.imageTwo=''" src="../../static/icon/error1.png" mode="widthFix"></image>
					</view>
					<view class="imglist" v-if="fromlist.imageThree!=''">
						<image :src="fromlist.imageThree" mode="aspectFit"></image>
						<image class="eliminate" @click="fromlist.imageThree=''" src="../../static/icon/error1.png" mode="widthFix"></image>
					</view>
					<view class="imglist" v-if="fromlist.imageThree==''" @click="urlimg">
						<image src="../../static/icon/add.png" mode="widthFix"></image>
					</view>
					
				</view>
			</view>
			<input type="text" value="" v-model="fromlist.reserveTwo" placeholder="您也可以留下您的联系方式"/>
		</view>
		
	</view>
</template>

<script>
	import navigation from "../../components/navigation.vue"
	import {
		pathToBase64,
		base64ToPath
	} from '../../components/image-tools/index.js'
	export default {
		components:{
			navigation
		},
		data() {
			return {
				userlist:'',
				fromlist:{
					 createdBy:'',
					 ticklingText:'',
					 schoolId:'',
					 classId:'',
					 imageOne:'',
					 imageTwo:'',
					 imageThree:'',
					 reserveOne:'待处理',//电话号码
					 reserveTwo:''//电话号码
				}
			};
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			if(this.userlist != ''){
				this.fromlist.schoolId = this.userlist.schoolId;
				this.fromlist.classId = this.userlist.classId;
				this.fromlist.createdBy = this.userlist.userId;
			}else{
				this.utils.error('您的账号未登录！请登录账号再试',()=>{
					this.navback();
				});
			}
			
			console.log(this.userlist);
		},
		methods:{
			navback(){
				this.utils.navback();
			},
			urlimg() {
				var _this = this;
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(res);
						if (res.tempFilePaths.length > 0) {
							for (let i = 0; i < res.tempFilePaths.length; i++) {
								let img = res.tempFilePaths[i];
								pathToBase64(img).then(base64 => {
									if(i == 0){_this.fromlist.imageOne = base64;}
									if(i == 1){_this.fromlist.imageTwo = base64;}
									if(i == 2){_this.fromlist.imageThree = base64;}
								}).catch(error => {
									console.error(error + '失败');
								});
							}
							console.log(_this.fromlist);
						}
					}
				});
			},
			Submit() {
				if (this.fromlist.ticklingText== '') {
					this.utils.error('请填写内容！');
					return;
				}
				console.log(this.fromlist)
				this.utils.showloading();
				this.http.getApi('Tickling/Add', this.fromlist, 'post').then(res => {
					console.log("res");
					console.log(res);
					if(res.status == 0){
						this.utils.success('提交成功！',()=>{
						this.utils.navback();
						uni.hideLoading();
					});
					}else{
						this.utils.error(err.msg);
					}
					
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
.index_feedbk{
	width: 100%;
	min-height: 750px;
	background-color: #F8F8F8;
}
.noe_feedbk{
	width: 100%;
	padding-top: 60px;
	background-color: #F8F8F8;
	input{
		padding: 15px;
		background-color: #FFFFFF;
	}
}
.feedbk_tittextare{
	width: 100%;
	background-color: #FFFFFF;
	margin: 25px 0;
	textarea{
		width: 90%;
		height: 200px;
		padding-top: 15px;
	}
}
.imgtit{
	padding: 0 15px;
	margin-bottom: 15px;
	background-color: #FFFFFF;
	text{
		padding: 10px 0;
		color: #333333;
	}
}
.imglist{
	width: 30%;
	min-height: 50px;
	image{
		width: 110px;
		height: 110px;
		// margin: 10px;
		border-radius: 5px;
		border: #eee 1px solid;
	}
	.eliminate{
		width: 20px;
		border: none;
		position: relative;
		z-index: 999;
		top: -130px;
		right: -100px;
	}
}
</style>
