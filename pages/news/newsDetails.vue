<template>
	<!-- 消息详情页面 -->
	<view class="index_details flex_columns" v-if="userlist">
		 <load-refresh
		      ref="loadRefresh"
		      :isRefresh="true"
		      :refreshTime="800"
		      :heightReduce="10"
		      :backgroundCover="'#FFFFFF'"
		      :pageNo="pageNum"
		      :totalPageNo="totalPage" 
		      @loadMore="loadMore" 
		      @refresh="refresh">
		      <view slot="content-list">
		        <!-- 数据列表 -->
				<view v-if="userRole==1">
					<userParent :tit='tit' :icon='img' :list='newslist'></userParent>
				</view>
				<view v-if="userRole==2">
					<userTeacher :tit='tit' :icon='img' :list='Teacherlist'></userTeacher>
				</view>
				<view v-if="userRole==3">
					<userPrincipal :tit='tit' :icon='img' :list='newslist'></userPrincipal>
				</view>
				<view v-if="userRole==0" class="null">
					<text>未登录</text>
				</view>
				
		      </view>
		    </load-refresh>
		

	</view>
</template>

<script>
	import userParent from '../../components/newsDetails/userParent.vue' //家长模板
	import userTeacher from '../../components/newsDetails/userTeacher.vue' //老师模板
	import userPrincipal from '../../components/newsDetails/userPrincipal.vue' //校方模板
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	
	export default {
		components: {
			userParent,
			userPrincipal,
			userTeacher,
			loadRefresh
		},
		data() {
			return {
				tit: null,
				img: null,
				userRole: 0,
				userlist: '',
				newslist:[],//消息
				Teacherlist:{},
				pageNum: 1,
				pageSize: 10,
				totalPage: 1, // 总页数
				hasNextPage:true,
			};
		},
		onLoad(e) {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			this.userRole = this.userlist.userRole;
			if(this.userlist==''){
				this.utils.error('该用户未登录，请先登录！',()=>{this.utils.navback();});
			}
			if(this.userRole !=0){
				this.option();
			}
			console.log(this.userlist);
			this.tit = e.tit;
			this.img = e.img;
			console.log(e);
		},
		onShow() {
			
			
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.tit
			});
		},
		
		methods: {
			// 上划加载更多
			      loadMore() {
			        console.log('loadMore')
			        // 请求新数据完成后调用 组件内loadOver()方法
			        // 注意更新当前页码 currPage
					this.option();
			        this.$refs.loadRefresh.loadOver()
			      },
			      // 下拉刷新数据列表
			      refresh() {
					  this.pageNum = 1;
					  this.hasNextPage=true;
					  // this.newslist = [];
					  this.option();
					  // this.utils.success('刷新成功！');
			        console.log('refresh')
			      },
			option(){
				console.log(this.userRole)
				if(this.userRole ==1){
					this.parent(this.pageNum);
				}
				if(this.userRole ==2){
					this.teacher(this.pageNum);
				}
				if(this.userRole ==3){
					this.listdate();
				}
			},
			//家长
			parent(pageNum){
				if(this.hasNextPage==false){return;
				}
				this.utils.showloading();
				this.http.getApi('/discern/getDate', {
					schoolId: this.userlist.schoolId,
					childId: this.userlist.childId,
					pageNum: pageNum,
					pageSize: this.pageSize
				}, 'post').then(res => {
					console.log("res");
					console.log(res);
					// this.newslist = res.data;
					this.hasNextPage = res.data.hasNextPage;
					this.newslist = this.pageNum > 1 ? this.newslist.concat(res.data.list) : res.data.list;
					this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum + 1 : this.pageNum;
					this.totalPage = res.data.pages;
					uni.hideLoading();
					this.utils.success('加载成功！');
					// uni.setStorageSync('newslist', res.data);
				
				}).catch(err => {
					console.log("err");
					console.log(err);
					uni.hideLoading();
					this.utils.error(err.msg);
				});
			},
			//老师请求
			teacher(pageNum) {
				this.utils.showloading();
				this.http.getApi('/discern/ClassDate', {
					schoolId: this.userlist.schoolId,
					classId: this.userlist.classId,
					selectDay: 0,
					pageNum: pageNum,
					pageSize: this.pageSize
				}, 'post').then(res => {
					console.log("res");
					console.log(res);
					this.Teacherlist = res.data;
					// this.newslist = this.pageNum > 1 ? this.newslist.concat(res.data) : res.data;
					// this.pageNum = res.data.pageNum == this.pageNum ? this.pageNum + 1 : this.pageNum;
					// this.totalPage = res.data.pages;
					uni.hideLoading();
					this.utils.success('加载成功！');
					uni.setStorageSync('newslist', res.data.userDate);

				}).catch(err => {
					console.log("err");
					console.log(err);
					uni.hideLoading();
					this.utils.error(err.msg);
					
				});
			},
			// 校长
			listdate() {
				this.utils.showloading();
				this.http.getApi('/discern/SchoolDate', {
					schoolid: this.userlist.schoolId,
					selectDay:0
				}, 'get').then(res => {
					console.log("res");
					console.log(res);
					this.newslist = [res.data];
					uni.hideLoading();
					this.utils.success('加载成功！');
					// uni.setStorageSync('newslist', this.newslist);
					console.log(this.newslist);
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
