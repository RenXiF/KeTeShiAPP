<template>
	<!-- 课表页面 -->
	<view class=" flex-center flex_columns">
		<text style="padding: 20px 0; color: #333333;" v-if="list.createdTime">创建时间：{{list.createdTime.substring(0,16)}}</text>
		<image style="width: 100%;" :src="list.imageOne" mode="widthFix" v-if="list.imageOne"></image>
		<image style="width: 100%;" :src="list.imageTwo" mode="widthFix" v-if="list.imageTwo"></image>
		<image style="width: 100%;" :src="list.imageThree" mode="widthFix" v-if="list.imageThree"></image>
		<view class="null flex_columns flex-center" v-if="!list.imageOne">
			<image src="../../../static/icon/nullgogao.png" mode="widthFix"></image>
			<text style="">暂无课表</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userlist: '',
				list: ''
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			if (this.userlist != '') {
				this.timetableData();
			} else {
				this.utils.error('您的账号未登录！请登录账号再试', () => {
					this.navback();
				});
			}
			console.log(this.userlist);
		},
		methods: {
			timetableData() {
				let list = {
					SchoolId: this.userlist.schoolId,
					ClassId: this.userlist.classId,
				};
				this.utils.showloading();
				this.http.getApi('Table/GetTable', list, 'get').then(res => {
					console.log("res");
					console.log(res);
					this.utils.success('查询成功！', () => {
						this.list = res.data;
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

<style>

</style>
