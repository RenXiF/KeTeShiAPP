<template>
	<!-- 意见反馈页面 -->
	<view class="index flex_columns">
		<view style="margin-top: 20px;" v-if="Feedbacklist">
			<view class="index_Feedback redBg4 flex_columns" v-for="(item,index) in Feedbacklist">
				<view class="text_b text_a flex-between flex-center" v-if="item.createdTime">
					<text>时间：</text>
					<text>{{item.createdTime.substring(0,16)}}</text>
				</view>
				<view class="text_a flex-between flex-center" v-if="item.ticklingText">
					<text>内容：</text>
					<textarea value="" v-model="item.ticklingText" disabled="true" auto-height="true" />
					</view>
				<view class="text_a flex-between flex-center" v-if="item.reserveTwo">
					<text>电话：</text>
					<textarea value="" v-model="item.reserveTwo" disabled="true"  auto-height="true"/>
				</view>
				<view class="text_a flex-between flex-center" v-if="item.imageOne">
					<text style="width: 50px;">图片:</text>
					<view class="flex_wrap flex-around flex-center" style="width: 100%; padding: 5px 0;">
						<image :src="item.imageOne" v-if="item.imageOne" mode="aspectFit"></image>
						<image :src="item.imageTwo" v-if="item.imageTwo" mode="aspectFit"></image>
						<image :src="item.imageThree" v-if="item.imageThree" mode="aspectFit"></image>
					</view>
				</view>
				<view class="text_b flex-between flex-center" v-if="item.reserveOne">
					<text>状态：</text>
					<text>{{item.reserveOne}}</text>
				</view>
			</view>
		</view>
		<view style="height: 100%; width: 100%; text-align: center; font-size: 30px;" v-else>
			<h3>暂无信息！</h3>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				userlist:'',
				Feedbacklist:[]
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			console.log(this.userlist);
			if (this.userlist) {
				this.Feedback();
			} else{
				this.utils.error('您的账号未登录！请登录账号再试',()=>{
					this.utils.navback();
				});
			}
		},
		methods: {
			Feedback(){
				// 提交申请
				this.utils.showloading();
				this.http.getApi('Tickling/getTickling',{UserId:this.userlist.userId}, 'get').then(res => {
						// uni.setStorageSync('userlist', res.data);
						this.Feedbacklist = res.data;
						console.log(res)
						console.log(this.Feedbacklist)
						uni.hideLoading();
						this.utils.success('查询成功!',()=>{
							// this.utils.navback();
						});
					}).catch(err => {
						console.log(err);
						this.utils.error('请填写正确反馈信息!');
					});
			},
			
		}
	}
</script>

<style lang="scss">
	.index {
		width: 100%;
		margin: 0;
		background-color: #f8f8f8;
		.index_Feedback{
			max-width: 100%;
			padding: 10px;
			margin-bottom: 20px;
			border-radius: 15px;
			textarea{
				max-width: 80%;
				padding: 10px;
			}
			text{
				font-weight: 900;
				color: #FFFFFF;
			}
			.text_a{
				border-bottom: #eee 1px solid;
				image{
					width: 70px;
					height: 70px;
					border-radius: 5px;
				}
				textarea{
					font-weight: 900;
				}
			}
			.text_b{
				padding: 10px 0;
			}
			.text_c {
				margin-top: 30px;
				padding: 10px 20px;
				// color: #FF5733;
				color: #FFFFFF;
				box-shadow: 1px 2px 6px #F55866;
				background: linear-gradient(0deg,rgba(246,62,100,1),rgba(244,106,103,1));
				border-radius: 15px;
				font-size: 25px;
				
			}
		}
	}

</style>
