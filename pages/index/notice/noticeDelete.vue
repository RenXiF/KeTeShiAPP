<template>
	<!-- 编辑公告页面 -->
	<view class="index_dele flex_columns flex-center">
			<view style="margin-top: 20px;" v-if="Feedbacklist">
				<view class="index_Feedback  bg-gradual-index-row flex_columns" v-for="(item,index) in Feedbacklist">
					<image class="eliminate" @click="noticeDelete(item.proclamationId)" src="../../../static/icon/error1.png" mode="widthFix"></image>
					<view class="text_b text_a flex-between flex-center" v-if="item.createdTime">
						<text>时间：</text>
						<text>{{item.createdTime.substring(0,16)}}</text>
					</view>
					<view class="text_a flex-between flex-center" v-if="item.proclamationName">
						<text>标题：</text>
						<textarea value="" v-model="item.proclamationName" disabled="true" auto-height="true" />
					</view>
					<view class="text_a flex-between flex-center" v-if="item.proclamationText">
						<text>内容：</text>
						<textarea value="" v-model="item.proclamationText" disabled="true" auto-height="true" />
					</view>
					<view class="text_a flex-between flex-center" v-if="item.imageOne">
						<text style="width: 50px;">图片:</text>
						<view class="flex_wrap flex-around flex-center" style="width: 100%; padding: 5px 0;">
							<image :src="item.imageOne" v-if="item.imageOne" mode="aspectFit"></image>
							<image :src="item.imageTwo" v-if="item.imageTwo" mode="aspectFit"></image>
							<image :src="item.imageThree" v-if="item.imageThree" mode="aspectFit"></image>
						</view>
					</view>
					<!-- <view class="text_b flex-between flex-center" v-if="item.reserveOne">
						<text>状态：</text>
						<text>{{item.reserveOne}}</text>
					</view> -->
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
					Feedbacklist:[],
					pageNum:1,
					pageSize:10,
				}
			},
			onLoad() {
				this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
				console.log(this.userlist);
				if (this.userlist) {
					this.Feedback(1);
				} else{
					this.utils.error('您的账号未登录！请登录账号再试',()=>{
						this.utils.navback();
					});
				}
			},
			methods: {
				Feedback(pageNum){
					// 提交申请
					this.utils.showloading();
					let list ={
						schoolId:this.userlist.schoolId,
						classId:this.userlist.classId,
						pageNum:pageNum,
						pageSize:this.pageSize,
					};
					console.log(list)
					this.http.getApi('Mation/GetMation',list, 'post').then(res => {
							this.Feedbacklist = res.data.list;
							console.log(res)
							console.log(this.Feedbacklist)
							uni.hideLoading();
							this.utils.success('查询成功!',()=>{
								// this.utils.navback();
							});
						}).catch(err => {
							console.log(err);
							this.utils.error(err.msg);
						});
				},
				noticeDelete(id){
					// 提交申请
					this.utils.showloading();
					// console.log(list)
					this.http.getApi('Mation/delete',{Id:id}, 'get').then(res => {
							// this.Feedbacklist = res.data.list;
							console.log(res)
							// console.log(this.Feedbacklist)
							uni.hideLoading();
							this.utils.success('删除成功!',()=>{
								this.Feedback(1);
								// this.utils.navback();
							});
						}).catch(err => {
							console.log(err);
							uni.hideLoading();
							this.utils.error(err.msg);
						});
				},
				
			}
		}
	</script>
	
	<style lang="scss">
		// @import "../../../colorui/main.css";
		.index_dele {
			width: 100%;
			min-height: 800px;
			margin: 0;
			background-color: #f8f8f8;
			.index_Feedback{
				max-width: 100%;
				padding: 10px;
				margin-bottom: 20px;
				border-radius: 15px;
				box-shadow: 1px 2px 6px #9a9a9a;
				textarea{
					max-width: 80%;
					padding: 10px;
				}
				text{
					font-weight: 900;
					color: #FFFFFF;
				}
				.eliminate{
					width: 28px;
					border: none;
					position: relative;
					z-index: 999;
					top: -40rpx;
					right: -650rpx;
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
	