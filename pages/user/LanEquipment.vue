<template>
	<!-- 局域网设备列表 -->
	<view class="index_equipment">
		<navigation @clickLeft="unavback()" fixed="true" border="true" title="设备列表" backgroundColor="#ffffff" leftIcon="../../static/icon/left.png"
		 rightIcon="../../static/icon/add.png" rightIcon2="../../static/icon/search.png"></navigation>
	</view>
</template>

<script>
	import navigation from "../../components/navigation.vue"
	export default {
		components: {
			navigation
		},
		data() {
			return {

			};
		},
		methods: {
			unavback() {
				this.utils.navback();
			}
		}
	}
</script>

<style>

</style>
