<template>
	<!-- 老师消息详情 -->
	<view class="teacher flex_columns">
		<view class="choice flex-around flex-center">
				<text>今天日期：2020-7-6</text>
				<text>选择查看天数:{{array[selectDay]}}</text>
				<picker @change="bindPickerChange" :value="selectDay" :range="array"><text class="logout">选择</text></picker>
				
			</view>
		<view class="tea_one flex_columns">
			<view class="tit_bk flex-center">
				<text class="tit_m">序号</text>
				<text class="tit_m">姓名</text>
				<text class="tit_xl">图片</text>
				<!-- <text class="tit_xxl">班级</text> -->
				<text class="tit_l">体温值</text>
				<text class="tit_m">状态</text>
				<text class="tit_m">进出</text>
			</view>
			<view class="tit_list flex-center" v-for="(item ,index) in newslist.userDate.list" :key='index'>
				<text class="tit_m">{{index+1}}</text>
				<text class="tit_m">{{item.reserveFour}}</text>
				<image :src="item.imgbase64" mode="aspectFit"></image>
				<!-- <text class="tit_xxl">{{item.reserveThree}}</text> -->
				<text class="tit_l">{{item.temperature}}</text>
				<text class="tit_m" v-if="item.temperaturestate=='1'">正常</text>
				<text class="tit_m" v-if="item.temperaturestate=='2'">异常</text>
				<text class="tit_m" v-if="item.reserveTwo=='1'">进入</text>
				<text class="tit_m" v-if="item.reserveTwo=='2'">出入</text>
			</view>
				<view class="tit_page flex-center">
					<view class="pages_number flex-center flex-around">
						<paging :pageSize="pageSize" :total="total" activecolor="#FFFFFF" activebackground="#DD524D" :footer="true" :current="1" @changes="add"></paging>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import paging from '../../../components/yang-paging/fy.vue';
	export default {
		components:{
			paging
		},
		data() {
			return {
				newslist:'',
				image:[],
				userlist:'',
				selectDay: 0, //天数
				array: ['今天','一天前', '二天前', '三天前', '四天前', '五天前', '六天前'],
				list:{
					"id": 4,//表id
					"createdTime": "2020-07-16T07:49:07.000+00:00",//
					"updatedTime": "2020-07-16T14:21:55.000+00:00",//
					"devicekey": "safasf",//设备序列号
					"personid": "1453646",//人员ID
					"time": "156165",//时间戳
					"type": "23456",//识别模式
					"path": "asdasd",//访问URL
					"data": null,//认证模式
					"ip": "asd",//设备局域网ip
					"searchscore": "searchScore",//识别比分
					"livenessscore": "livenessScore",//活体比分
					"temperature": "temperature",//人员温度值
					"standard": "standard",//设置的异常温度值
					"temperaturestate": "2",//体温状态：1正常，2异常
					"reserveOne": "1",//学校ID
					"reserveTwo": "2",//进出类型：1进，2出
					"reserveThree": "1",//班级ID
					"reserveFour": "严",//姓名
					"reserveFive": null,//
					"imgbase64": "231"//识别图片
				},
				pageNum:1,//第几页
				pages:0,//总页数
				pageSize:0,//每页数
				total:0,//数据总条数
				navigatepageNums:0
			}
		},
		onLoad() {
			this.userlist = uni.getStorageSync('userlist'); //加载用户缓存
			this.newslist = uni.getStorageSync('newslist'); //加载用户缓存
			// this.clsslist = list;
			console.log(this.userlist);
			console.log(this.newslist);
		},
		methods: {
			
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.selectDay = e.target.value;
			},
			maximg(){
				// console.log('yizhixin');
				// this.image = item;
				// this.openImg(this.image);
			},
			//页码渲染
			add(index) {
				// console.log(index);
				this.pageNum = index;
				this.teacher(this.pageNum);
			},
			//老师请求
			teacher(){
				this.http.getApi('/discern/ClassDate', {
					schoolId: this.userlist.schoolId,
					classId: this.userlist.classId,
					selectDay: this.selectDay,
					pageNum:this.pageNum,
					pageSize:2
				}, 'post').then(res => {
					console.log("res");
					console.log(res);
					if (res.data.userDate.list.length==0) {
						this.newslist = null;
					} else{
						// console.log(this.mensname.id);
						this.newslist = res.data.userDate.list;
						this.pageNum = res.data.userDate.pageNum;
						this.navigatepageNums = res.data.userDate.navigatepageNums;
						this.total = res.data.userDate.total;
						this.pageSize = res.data.userDate.pageSize;
					}
					// uni.setStorageSync('newslist', res.data);
					  
				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			},
		}
	}
</script>

<style lang="scss">
	//通用
	.logout {
		padding: 5px 10px;
		margin-right: 20px;
		color: #FFFFFF;
		/* box-shadow: 1px 2px 6px #F55866; */
		box-shadow: 1px 2px 6px #DAC1E7;
		/* background: linear-gradient(45deg,#c779d0,#4bc0c8); */
		background: linear-gradient(45deg, rgba(254, 172, 94, 0.5), rgba(199, 121, 208, 0.5), rgba(75, 192, 200, 0.5));
		border-radius: 10px;
		font-size: 15px;
		font-weight: 700;
	}
	//表格尺寸宽度
	.tit_s{width: 20px;}
	.tit_m{width: 30px;}
	.tit_l{width: 40px;}
	.tit_xl{width: 50px;}
	.tit_xxl{width: 60px;}
	.choice{
		padding: 10px 0;
		text{
			font-size: 13px;
			margin: 0 10px;
		}
	}
	
	.teacher{
		max-width: 100%;
		min-height: 750px;
		padding: 0 15px;
		background-color: #f8f8f8;
	}
	.tea_one{
		width: 100%;
		// margin-top: 30px;
		border-radius: 10px;
		background-color: #FFFFFF;
		//标题
		.tit_bk,
		.tit_list,
		.tit_page{
			width: 100%;
			// min-height: 50px;
			
			// border: #f8f8f8 1px solid;
			text{
				// height: 100%;
				min-width: 20px;
				color: #333333;
				font-size: 11px;
				padding: 3px 3px;
				// border: #DAC1E7 1px solid;
			}
		}
		.tit_bk{
			// width: 100%;
			// height: 100%;
			background-color: #DD524D;
			border-radius: 10px 10px 0 0;
			color: #FFFFFF;
			text{
				padding-top: 5px;
				padding-bottom: 5px;
				color: #FFFFFF;
				border-right: #FFFFFF 1px solid;
			}
			// text:first-child{
			// 	background-color: #DAC1E7;
			// 	border-radius: 15px 0 0 0;
			// }
			
		}
		.tit_list{
			border-bottom: #C8C7CC 1px solid;
			text{
				border-right: #C8C7CC 1px solid;
			}
			image{
				padding: 3px;
				width: 50px;
				height: 50px;
				border-radius: 5px;
			}
		}
		//页码
		.tit_page{
			justify-content: center;
			.pages_tit{
				padding: 0 5px;
				font-size: 12px;
				border-radius: 5px;
				border: #999999 1px solid;
				justify-content: center;
			}
			.pages_number{
				padding: 5px 10px;
				// min-width: 100%;
				text{
					border: #999999 1px solid;
					padding: 5px 15px;
					font-size: 12px;
					margin-right: 10px;
					border-radius: 5px;
				}
				text:hover{
					background-color: #DD524D;
					color: #FFFFFF;
				}
			}
			.pages_tit:hover{
				background-color: #DD524D;
				color: #FFFFFF;
			}
		}
	}
</style>
