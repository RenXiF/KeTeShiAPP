<template>
	<!-- 消息详情页面 -->
	<view class="index_details flex_columns" v-if="userlist">
		<view v-if="userRole==1">
			<userParent :tit='tit' :icon='img'></userParent>
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
				userRole: 2,
				userlist: {
					userRole: 3
				},
				datal:'2020-03-15',
				newslist: '' //消息
			};
		},
		onLoad(e) {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			this.newslist = uni.getStorageSync('newslist'); //加载用户缓存
			if(this.newslist == ''){
				this.teacher();
			}
			console.log(this.userlist);
			console.log(this.newslist);
			console.log(this.userlist.userRole);
			this.tit = e.tit;
			this.img = e.img;
			console.log(e);
			
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.tit
			});
		},
		methods: {
			//老师请求
			teacher() {
				this.http.getApi('/discern/ClassDate', {
					schoolId: this.userlist.schoolId,
					classId: this.userlist.classId,
					selectDay: 0,
					pageNum: 1,
					pageSize: 10
				}, 'post').then(res => {
					console.log("res");
					console.log(res);
					// uni.setStorageSync('newslist', res.data.userDate);
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
