<template>
	<view class="index_nav flex_columns" :style="{backgroundColor : backgroundColor,color:color}" :class="{ 'navbar_fixed': fixed, 'navbar_shadow': shadow, 'navbar_border': border }">
		<view class="status_height"></view>
		<view class="navigation flex-center flex-between">
			<view class="icon_tit flex-center" @tap="onClickLeft">
				<image :src="leftIcon" mode="widthFix" v-if="leftIcon.length"></image>
				<text v-if="leftText.length && !leftIcon.length">{{leftText}}</text>
			</view>
			<view class="nav_tit flex-center flex_jufy_center" v-show="title">
				<text>{{title}}</text>
			</view>
			<view class="icon_tit_right flex_row_reverse flex-center" @tap="onClickRight">
				<image :src="rightIcon" mode="widthFix" v-if="rightIcon.length"></image>
				<image :src="rightIcon2" mode="widthFix" v-if="rightIcon2.length"></image>
				<text v-if="rightText.length && !rightIcon.length || !rightIcon2.length">{{rightText}}</text>
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
			leftText: {
				type: String,
				default: ""
			},
			rightText: {
				type: String,
				default: ""
			},
			leftIcon: {
				type: String,
				default: ""
			},
			rightIcon: {
				type: String,
				default: ""
			},
			rightIcon2: {
				type: String,
				default: ""
			},
			fixed: {
				type: [Boolean, String],
				default: false
			},
			color: {
				type: String,
				default: "#000000"
			},
			backgroundColor: {
				type: String,
				default: ""
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
				default: false
			}
		},
		methods: {
			onClickLeft() {
				this.$emit("clickLeft");
			},
			onClickRight() {
				this.$emit("clickRight");
			}
		}
	}
</script>

<style>
	.index_nav {
		width: 100%;
		/* height: 100%; */
		/* background-color: #F8F8F8; */
	}

	.navbar_fixed {
		position: fixed;
		top: 0;
		z-index: 998;
	}
	.navbar_shadow {
		box-shadow: 0 1px 6px #ccc;
	}
	.navbar_border{
		border-bottom-width: 1rpx;
		border-bottom-style: solid;
		border-bottom-color: #C8C7CC;
	}

	.navigation {
		/* width: 100%; */
		height: 44px;
		padding: 0 15px;
	}
	.icon_tit,
	.icon_tit_right{
		width: 20%;
		height: 100%;
	}
	.icon_tit image {
		width: 30px;
		/* border: #007AFF 1px solid; */
	}
	.icon_tit_right image{
		width: 30px;
		margin-left: 10px;
		/* border: #007AFF 1px solid; */
	}
	.nav_tit{
		min-width: 30%;
		height: 100%;
		/* border: #007AFF 1px solid; */
	}
	.nav_tit text,
	.icon_tit text,
	.icon_tit_right text{
		font-size: 17px;
	}
</style>
