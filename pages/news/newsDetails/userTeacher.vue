<template>
	<!-- 老师消息详情 -->
	<view class="teacher flex_columns">
		<view class="tea_one flex_columns boder">
			<view class="tit_bk boder">
				
			</view>
			<view class="tit_list boder">
				
			</view>
			<view class="tit_page boder">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newslist:''
			}
		},
		onLoad() {
			this.newslist = uni.getStorageSync('newslist'); //加载用户缓存
			// this.clsslist = list;
			console.log(this.newslist);
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.teacher{
		max-width: 100%;
		min-height: 750px;
		padding: 0 15px;
		background-color: #f8f8f8;
	}
	.tea_one{
		width: 100%;
		margin-top: 30px;
		border-radius: 15px;
		background-color: #FFFFFF;
		//标题
		.tit_bk,
		.tit_list,
		.tit_page{
			width: 100%;
			min-height: 50px;
			border: #DAC1E7 1px solid;
		}
		.tit_list{
			
		}
	}
</style>
