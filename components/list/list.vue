<template>
	<!-- 列表组件 -->
	<view class="index_user flex_columns" :style="{backgroundColor : backgroundColor}">
		<view class="tit_list centerlay" v-for="(item,index) in listdata" :key="index">
			<view class="list_block centerlay flex-between" @click="listdoUrl(item)">
				<view class="tit_name flex-center flex_rows">
					<image v-if="item.img" :src="item.img" mode="widthFix"></image>
					<text class="name_tit">{{item.name}}</text>
				</view>
				<view class="tit_name flex-center flex_row_reverse">
					<image src="../../static/icon/right.png" mode="widthFix"></image>
					<text class="sutit" v-if="item.sutit">{{item.sutit}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ""
			},
			listdata: [Array],
			color: {
				type: String,
				default: "#000000"
			},
			backgroundColor: {
				type: String,
				default: "#FFFFFF"
			},
			statusBar: {
				type: [Boolean, String],
				default: false
			},
			shadow: {
				type: [String, Boolean],
				default: false
			},
			border: {
				type: [String, Boolean],
				default: true
			}
		},
		onLoad() {

		},
		methods: {
			// onClickLeft() {
				
			// },
			listdoUrl(item){
				
				if (item.http) {
					this.doUrl(item.http);
				} else{
					this.$emit("clicklist");
				}
			}
		}
	}
</script>

<style lang="less">
	.index_user {
		width: 100%;
		// min-height: 630px;
		background-color: #F1F3F4;
	}
	.bglist{
		width: 100%;
		height: 30px;
		background-color: #F1F3F4;
	}
	.tit_list {
		width: 100%;
		background-color: #FFFFFF;
		border-bottom: #F1F3F4 1px solid;
	}
	.list_block {
		width: 95%;
		margin: 7px 0;
		/* border: #007AFF 1px solid; */
	}

	.list_block,
	.tit_name{
		height: 100%;
		image{
			width: 30px;
		}
		text{
			padding: 0 10px;
			// border: #007AFF 1px solid;
		}
		
	}
	.tit_name{
		min-width: 15%;
	}
	.name_tit{
		font-size: 15px;
		color: #333333;
	}
	.sutit{
		font-size: 15px;
		color: #C8C7CC;
	}
</style>
