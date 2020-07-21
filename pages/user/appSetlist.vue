<template>
	<!-- APP设置页面 -->
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
					{name:"更换首页轮播图",
					img: '/static/mens/19.png',
					http:"pages/user/setRotation"
					}
				]
			}
		},
		methods: {
			httplist(){
				uni.removeStorageSync('userlist');
				uni.removeStorageSync('WXuser');
				uni.removeStorageSync('openid');
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
