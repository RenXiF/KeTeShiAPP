<template>
	<!-- 菜单详情页面 -->
	<view class="index_video flex_columns">
		<view class="flex-center flex_jufy_center">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: null
			}
		},
		onLoad(e) {
			console.log(e);
			this.name = e.name;
			// tit();

		},
		onReady() {
			uni.setNavigationBarTitle({
				title: this.name
			});
		},
		methods: {


		}
	}
</script>

<style lang="scss">

</style>
