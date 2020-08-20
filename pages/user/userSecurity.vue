<template>
	<!-- 账户安全页面 -->
	<view class="index_security">
		<list :listdata="list" @clicklist="httplist()"></list>
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
					{name:"切换账号",
					img: '/static/mens/19.png'
					},
					{name:"修改用户名",
					img: '/static/mens/31.png',
					http:"../../pages/index"
					},
					{name:"修改登录密码",
					img: '/static/mens/29.png',
					http:"../../pages/index"
					}
				]
			}
		},
		methods: {
			httplist(){
				uni.removeStorageSync('userlist');
				uni.removeStorageSync('WXuser');
				uni.removeStorageSync('openid');
				uni.removeStorageSync('WXopenid');
				this.utils.success("退出成功！",function(){
					uni.navigateBack({
						delta: 1
					});
				});
			}
		}
	}
</script>

<style>

</style>
