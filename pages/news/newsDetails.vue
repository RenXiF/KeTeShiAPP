<template>
	<!-- 消息详情页面 -->
	<view class="index_details flex_columns" v-if="userlist">
		<view v-if="userRole==1">
			<userParent :tit='tit' :icon='img' :list='newslist'></userParent>
		</view>
		<view v-if="userRole==2">
			<userTeacher :tit='tit' :icon='img' :list='newslist'></userTeacher>
		</view>
		<view v-if="userRole==3">
			<userPrincipal :tit='tit' :icon='img' :list='newslist'></userPrincipal>
		</view>

	</view>
</template>

<script>
	import userParent from '../../components/newsDetails/userParent.vue' //家长模板
	import userPrincipal from '../../components/newsDetails/userPrincipal.vue' //校方模板
	import userTeacher from '../../components/newsDetails/userTeacher.vue' //老师模板
	export default {
		components: {
			userParent,
			userPrincipal,
			userTeacher
		},
		data() {
			return {
				tit: null,
				img: null,
				userRole: 1,
				userlist: {
					userRole: 3
				},
				datal:'2020-03-15',
				newslist: '' //消息
			};
		},
		onLoad(e) {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			// this.newslist = uni.getStorageSync('newslist'); //加载用户缓存
			// if(this.newslist == ''){
			// 	this.teacher();
			// }
			console.log(this.userlist);
			console.log(this.newslist);
			this.tit = e.tit;
			this.img = e.img;
			console.log(e);
		},
		onShow() {
			this.option();
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.tit
			});
		},
		methods: {
			option(){
				if(this.userRole ==1){
					this.parent();
				}
				if(this.userRole ==2){
					this.teacher();
				}
				if(this.userRole ==3){
					this.listdate();
				}
			},
			//家长
			parent(){
				this.http.getApi('/discern/getDate', {
					schoolId: this.userlist.schoolId,
					// classId: this.userlist.classId,
					childId: this.userlist.childId,
					// selectDay: 4,
					pageNum: 1,
					pageSize: 10
				}, 'post').then(res => {
					console.log("res");
					console.log(res);
					this.newslist = res.data;
					uni.setStorageSync('newslist', res.data);
				
				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			},
			//老师请求
			teacher() {
				this.http.getApi('/discern/ClassDate', {
					schoolId: this.userlist.schoolId,
					classId: this.userlist.classId,
					selectDay: 4,
					pageNum: 1,
					pageSize: 1
				}, 'post').then(res => {
					console.log("res");
					console.log(res);
					this.newslist = res.data;
					uni.setStorageSync('newslist', res.data);

				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			},
			// 校长
			listdate() {
				this.http.getApi('/discern/SchoolDate', {
					schoolid: this.userlist.schoolId,
					selectDay:4
				}, 'get').then(res => {
					console.log("res");
					console.log(res);
					// uni.setStorageSync('systemNews', res.data);
					// let i = this.utils.getDate();
					this.newslist = [res.data];
					uni.setStorageSync('newslist', this.newslist);
					console.log(this.newslist);
				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			}
		}
	}
</script>

<style lang="scss">
	.index_details {

		// max-width: 100%;
		// min-height: 750px;
		// padding: 15px;
		// background-color: #F8F8F8;
		.tit_date {
			min-height: 100px;
			width: 100%;
		}
	}
</style>
