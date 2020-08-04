<template>
	<!-- 意见反馈页面 -->
	<view class="index_security">
		<list :listdata="list"></list>
	</view>
</template>

<script>
	import list from "../../components/list/list.vue"//导入列表组件
	export default {
		components:{
			list
		},
		data() {
			return {
				list:[
					{name:"添加反馈",
					img: '/static/mens/19.png',
					http:"/pages/user/feedback"
					},
					{name:"反馈记录",
					img: '/static/mens/31.png',
					http:"/pages/user/feedbackRecord"
					}
				]
			}
		},
		methods: {
			// httplist(){
			// 	uni.removeStorageSync('userlist');
			// 	uni.removeStorageSync('WXuser');
			// 	uni.removeStorageSync('openid');
			// 	this.utils.success("退出成功！",function(){
			// 		uni.navigateBack({
			// 			delta: 1
			// 		});
			// 	});
			// }
		}
	}
</script>

<style>

</style>
