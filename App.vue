<script>
	export default {
		created() {
			// #ifdef APP-PLUS
			plus.navigator.closeSplashscreen(); 
			// #endif 
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
/* #ifdef H5 */
uni-page-head {
	display: none;
}
/* #endif */
.status_height {
	width: 100%;
	height: var(--status-bar-height);
	// border: #007AFF 1 solid;
}
/* // 字体 */
.fontA1 {
	color: #a1a1a1;
}
.priceFont {
	color: #fe2736;
	font-weight: bold;
}
.priceFontDiscount {
	color: #a1a1a1;
	text-decoration: line-through;
}
.noWrapF {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}
.centerlay{
	display: flex;
	justify-content: center;
	align-items: center;
}
/* //浮动 */
.rt {
	float: right;
}
.lt {
	float: left;
}
/* //主页样式 */

/* // 促销背景 */
.redBg {
	color: #ffffff;
	background: -webkit-linear-gradient(to right, #fc684d, #fe2736);
	background: -o-linear-gradient(to right, #fc684d, #fe2736);
	background: -moz-linear-gradient(to right, #fc684d, #fe2736);
	background: linear-gradient(to right, #fc684d, #fe2736);
}
.redBg2{
	box-shadow: 1px 2px 6px #DAC1E7;
	/* background: linear-gradient(45deg,#c779d0,#4bc0c8); */
	background: linear-gradient(45deg, rgba(254, 172, 94, 0.5), rgba(199, 121, 208, 0.5), rgba(75, 192, 200, 0.5));
}
.status_view {
	width: 750upx;
	height: 100%;
}
.static_view {
	padding: 30upx;
	height: 100%;
}
view {
	font-size: 30upx;
	/* -webkit-transition: all .3s;
	transition: all .3s; */
}

.status_start {
	padding: 20upx;
}
.boder {
	border: 1upx crimson solid;
}
.img image{
	width: 30px;
}
.index {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
/* 栅格布局 */
.flex {
	display: flex !important;
	/* // width: 750upx; */
}
.flex_rows {
	display: flex;
	flex-direction: row !important;
}
.flex_row_reverse {
	display: flex;
	flex-direction: row-reverse !important;
}
.flex_columns {
	display: flex;
	flex-direction: column !important;
}
.flex_wrap {
	display: flex;
	flex-wrap: wrap;
}
.flex_nowrap {
	display: flex;
	flex-wrap: nowrap !important;
}
.flex-between {
	display: flex;
	justify-content: space-between !important;
}
.flex-around {
	display: flex;
	justify-content: space-around !important;
}
.flex-center {
	display: flex;
	align-items: center;
	/* justify-content: space-between !important; */
}
.flex_jufy_center{
	display: flex;
	align-items: center;
	justify-content: center !important;
}
/* 文本溢出隐藏 */
.ellipsis {
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.imgWidth {
	width: 100%;
	overflow: hidden;
}
.null{
		width: 100%;
		padding: 30px 0;
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		
	}
/* @font-face {
	font-family: 'iconfont';
	src: url('~@/static/iconfont.ttf');
} */
</style>
