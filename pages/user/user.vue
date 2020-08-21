<template>
	<view class="index_user flex_columns">
		<view class="tit_list centerlay" v-for="(item,index) in mens" :key="index" v-if="mens">
			<view class="list_block centerlay flex-between">
				<view class="tit_name flex_rows " @click="mensclick(item)">
					<image :src="item.img" :class="lognum == 2 && index == 0 ? 'img_max': 'img_min'" mode="widthFix"  v-if="lognum == 2"></image>
					<image :src="item.img" :class="lognum == 1 && index == 0 ? 'img_maxs': 'img_min'" mode="widthFix" v-else></image>
					<text class="name_tit">{{item.name}}</text>
					<text class="sutit" v-if="item.sutit">{{item.sutit}}</text>
				</view>
				<view class=" flex-center flex_row_reverse" style="min-width: 30%;"@click="mensclick(item)">
					<image v-if="index != 0" class="img_min " src="../../static/icon/right.png" mode="widthFix"></image>
					<text class="logout" v-if="lognum == 2 && index == 0">退出登录</text>
					<text class="logout" v-if="lognum == 1 && index == 0">退出登录</text>
					<text class="logout" v-if="lognum == 0 && index == 0" >登录</text>
				</view>
			</view>
		</view>
		<view class="tit_list centerlay" v-if="userlist.userRole==3">
			<view class="list_block centerlay flex-between" @click="doUrl(admin.http)">
				<view class="tit_name flex_rows">
					<image :src="admin.img" class="img_min" mode="widthFix"></image>
					<text class="name_tit">{{admin.name}}</text>
				</view>
				<view class=" flex-center flex_row_reverse" style="min-width: 30%;">
					<image class="img_min" src="../../static/icon/right.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import men from "@/config/user_men.js"
	export default {
		components: {
			men
		},
		data() {
			return {
				mens: men,
				admin:{
					img:'/static/mens/34.png',
					name:'APP管理',
					http:'/pages/user/appSetlist'
				},
				lognum: 0, //判断是否登录
				userlist: '',
				WXuser:'',
				weixiniimg:'../../static/icon/weixing.png',
				Phoneimg:'../../static/mens/shouji.png'
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			this.WXuser = uni.getStorageSync('WXuser'); //加载用户缓存
			let openid = uni.getStorageSync('openid'); //加载openid
			let WXopenid = uni.getStorageSync('WXopenid'); //加载WXopenid
			// console.log(this.userlist);
			// console.log(this.WXuser);
			// console.log(openid);
			// console.log(WXopenid);
			if(openid != ''){
				this.mens[0].name = this.userlist.userName;
				this.mens[0].img = this.Phoneimg;
				this.lognum = 1;
			}
			if(WXopenid != ''){
				this.mens[0].name =  this.WXuser.nickName;
				this.mens[0].img =  this.WXuser.avatarUrl;
				this.lognum = 2;
				
			}
			if(this.lognum != 0){
				this.userlist.status == 1 || this.userlist.userRole != 1 ? this.mens[2].name='已开通服务':this.mens[2].name;
			}
			
			this.loginins();
		},
		methods: {
			// 检查是否切换账号
			loginins() {
				let userins = uni.getStorageSync('userlist'); //加载用户缓存
				if (!userins) {
					this.mens[0].name = "未登录";
					this.mens[0].img = "/static/mens/19.png";
					this.userlist = '';
					this.lognum = 0;
				}
				return;
			},
			mensclick(item) {
				if (item.http) {
					if (this.userlist=='' || this.lognum == 0) {
						this.utils.alert("请先登录授权");
					} else{
						this.doUrl(item.http);
					}
				} else {
					if (this.userlist != '') {
						if (this.lognum == 0) {
							this.utils.showloading("登录中");
							let openid = uni.getStorageSync('openid'); //加载openid
							let WXopenid = uni.getStorageSync('WXopenid'); //加载WXopenid
							if( openid != ''){
								this.mens[0].name = this.userlist.userName;
								this.mens[0].img = this.Phoneimg;
								this.lognum = 1;
							}
							if(WXopenid != ''){
								this.mens[0].name =  this.WXuser.nickName;
								this.mens[0].img =  this.WXuser.avatarUrl;
								this.lognum = 2;
							}
							this.userlist.status == 1 || this.userlist.userRole != 1 ? this.mens[2].name='已开通服务':this.mens[2].name;
							uni.hideLoading();
							this.utils.success("登录成功！");
						}else{
							this.logout(item);
						}
					} else {
						this.doUrl('pages/login/login');
					}
				}
			},
			// 选择菜单
			loginXZ(item) {
				var _this = this;
				uni.showActionSheet({
					itemList: ['微信登录','手机号登录'],
					success: function(res) {
						// console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
						if (res.tapIndex == 0) {
							_this.loginuser(item);
							_this.utils.showloading("登录中");
						}
						if (res.tapIndex == 1) {
							_this.doUrl('pages/login/login');
							// _this.utils.showloading("登录中");
						}
					},
					fail: function(res) {console.log(res.errMsg);}
				});
			},
			// 退出登录
			logout(item) {
				item.name = "未登录";
				item.img = "/static/mens/19.png";
				// uni.removeStorageSync('user');
				// this.userlist = '';
				this.lognum = 0;
				this.mens[2].name='服务开通';
				this.utils.success("退出成功！");
			}
		}
	}
</script>

<style>
	.index_user {
		width: 100%;
		min-height: 100%;
		background-color: #F1F3F4;
	}

	.bglist {
		width: 100%;
		height: 30px;
		background-color: #F1F3F4;
	}

	.tit_list {
		width: 100%;
		/* padding: 0 60px; */
		background-color: #FFFFFF;
		border-bottom: #F1F3F4 1px solid;
	}

	.tit_list:nth-child(1),
	.tit_list:nth-child(2) {
		width: 100%;
		min-height: 65px;
		/* padding: 0 60px; */
		background-color: #FFFFFF;
		border-bottom: #F1F3F4 1px solid;
		margin-bottom: 30px;
	}

	.list_block {
		width: 95%;
		margin: 7px 0;
		/* border: #007AFF 1px solid; */
	}

	.img_min {
		width: 30px;
		margin-right: 10px;
		/* border-radius: 5px; */
	}

	.img_max {
		width: 60px;
		margin-right: 10px;
		border-radius: 30px;
		box-shadow: 1px 2px 6px #C0C0C0;
	}
	.img_maxs {
		width: 30px;
		margin-right: 10px;
	}
	

	.logout {
		padding: 5px 10px;
		margin-right: 20px;
		color: #FFFFFF;
		/* box-shadow: 1px 2px 6px #F55866; */
		box-shadow: 1px 2px 6px #DAC1E7;
		/* background: linear-gradient(45deg,#c779d0,#4bc0c8); */
		background: linear-gradient(45deg, rgba(254, 172, 94, 0.5), rgba(199, 121, 208, 0.5), rgba(75, 192, 200, 0.5));
		border-radius: 10px;
		font-size: 15px;
		font-weight: 700;
	}

	.tit_name {
		min-width: 65%;
		justify-content: flex-start;
		align-items: center;
	}

	.name_tit {
		font-size: 15px;
		color: #333333;
	}

	.sutit {
		font-size: 13px;
		color: #C8C7CC;
	}
</style>
