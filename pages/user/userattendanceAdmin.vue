<template>
	<view class="index_Attendanceadmin flex_columns">
		<!-- <navigation title="科特士校园考勤" backgroundColor="#ffffff" fixed="true" leftIcon="../../static/icon/shebei.png"
		 @clickRight="addlist()" rightIcon="../../static/icon/add.png"></navigation> -->
		<view class="Calendar">
			<Calendar :insert="true" :lunar="true" :start-date="'2020-3-2'" :end-date="'2020-7-20'" @change="change" :showMonth="false"
			 :selected="selectedlist"></Calendar>
		</view>
		<view class="index_list flex_columns">
			<view class="list_Sign flex_columns">
				<h3>打卡信息</h3>
				<text v-if="selelist.date">进入校园：{{selelist.date}}</text>
				<text v-if="!selelist.date">暂无打卡信息</text>
				<text v-if="selelist.info">状态：{{selelist.info}}</text>
				<text v-if="selelist.info==''">状态：未打卡</text>
				
			</view>
		</view>


	</view>
</template>

<script>
	import navigation from "../../components/navigation.vue"
	import Calendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			navigation,
			Calendar
		},
		data() {
			return {
				iStatusBarHeight: 0, //状态栏高度
				selectedlist: [{
					// 打点日期
					"date": "2020-07-2",
					// 打点描述
					"info": "已打卡",
					// 额外信息
					"data": {
						"custom": "自定义信息",
						"name": "自定义消息头"
					}
				}],
				 selelist:{
					// 打点日期
					"date": '',
					// 打点描述
					"info": '',
					// 额外信息
					"data": {
						"custom": "自定义信息",
						"name": "自定义消息头"
					}
				}
			}
		},
		onPullDownRefresh() {
			console.log('refresh');
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onLoad: function(options) {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight + 44;
			setTimeout(function() {
				console.log('start pulldown');
			}, 1000);
			uni.startPullDownRefresh();
		},
		methods: {
			change(e) {
				console.log(e);
				
				if (e.extraInfo) {
					this.selelist = e.extraInfo;
					console.log("已执行")
				}else{
					this.selelist.date = '';
					this.selelist.info = '';
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.index_Attendanceadmin {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}

	.Calendar {
		width: 100%;
		/* padding: 5px 0; */
		position: relative;
		// margin-top:  64px;
		background-color: #FFFFFF;
	}
	.index_list{
		max-width: 100%;
		// margin-top: 50px;
		padding: 20px;
		.list_Sign{
			max-width: 100%;
			// min-height: 100px;
			
			border-radius: 15px;
			background-color: #FFFFFF;
			padding: 15px;
		}
	}
</style>
