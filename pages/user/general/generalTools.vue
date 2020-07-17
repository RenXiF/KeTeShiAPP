<template>
	<view class="index_tools">
		<list :listdata="listdata"></list>
	</view>
</template>

<script>
	import list from "../../../components/list/list.vue"
	
	export default {
		components:{
			list
		},
		data() {
			return {
				listdata:[
					{
						name: '清理无用缓存',
						sutit:'2.4MB',
						img: '/static/icon/qinglihuancun.png',
						http: '/pages/user/LanEquipment'
					},
					{
						name: '设备解绑',
						img: '/static/icon/jiebang.png',
						http: '/pages/index/userlist'
					},
					{
						name: '重置设备密码',
						img: '/static/icon/zhongzhimima.png',
						http: '/pages/login/forget'
					},
					{
						name: '软解锁',
						sutit:'关闭',
						img: '/static/icon/mobile.png',
						http: '/pages/index/reviewOrder'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
