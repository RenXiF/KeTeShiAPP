<template>
	<!-- 意见反馈页面 -->
	<view class="index_feedbk">
		<navigation @clickLeft="navback()" @clickRight="Submit()" fixed="true" title="反馈" backgroundColor="#ffffff" leftIcon="../../static/icon/left.png" rightText="提交"></navigation>
		<view class="noe_feedbk flex_columns">
			<view class="feedbk_tittextare centerlay">
				<textarea value="" maxlength="300" @confirm="Submit()" placeholder="您的意见对我们很重要" />
			</view>
				<input type="text" value="" placeholder="您可以留下您的联系方式"/>
		</view>
	</view>
</template>

<script>
	import navigation from "../../components/navigation.vue"
	export default {
		components:{
			navigation
		},
		data() {
			return {
				
			};
		},
		methods:{
			navback(){
				this.utils.navback();
			},
			Submit(){
				this.utils.success('提交成功！',()=>{
					this.utils.navback();
				});
			}
		}
	}
</script>

<style>
.index_feedbk{
	width: 100%;
	min-height: 750px;
	background-color: #F8F8F8;
}
.noe_feedbk{
	width: 100%;
	padding-top: 60px;
	background-color: #F8F8F8;
}
.feedbk_tittextare{
	width: 100%;
	background-color: #FFFFFF;
	margin: 25px 0;
/* 	border-top: #C8C7CC 1px solid;
	border-bottom: #C8C7CC 1px solid; */
}
.feedbk_tittextare textarea{
	width: 90%;
	height: 200px;
	/* padding: 15px; */
	/* padding-left: 15px; */
	padding-top: 15px;
	
	/* background-color: #FFFFFF; */
	
}
.noe_feedbk input{
	/* width: 100%; */
	/* height: 40px; */
	padding: 15px;
	
	background-color: #FFFFFF;
	/* border-top: #C8C7CC 1px solid;
	border-bottom: #C8C7CC 1px solid; */
}
</style>
