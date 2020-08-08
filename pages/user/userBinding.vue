<template>
	<!-- 绑定页面 -->
	<view class="index_binding flex_columns">
		<!-- <navigation title="账号绑定" color="#ffffff" backgroundColor="#7DDBFD" leftIcon="../../static/icon/left.png" fixed="true"></navigation> -->
		<view class="flex-center flex_jufy_center">
		</view>
		<view class="binding_ck flex_columns ">
			<view class="binding_form flex_columns ">
				<view class="one_ck  flex-center flex_rows">
					<image src="../../static/icon/jiaose.png" mode="widthFix">
						<view class="radio_item flex_rows" @click="radioClick(3)">
							<view :class="[listuser.userRole == 3 ? 'active' : '', 'radio_icon']">√</view>
							<text>学校</text>
						</view>
						<view class="radio_item flex_rows" @click="radioClick(2)">
							<view :class="[listuser.userRole == 2 ? 'active' : '', 'radio_icon']">√</view>
							<text>老师</text>
						</view>
						<view class="radio_item flex_rows" @click="radioClick(1)">
							<view :class="[listuser.userRole == 1 ? 'active' : '', 'radio_icon']">√</view>
							<text>家长</text>
						</view>
				</view>
				<view class="one_ck  flex-center">
					<image src="../../static/icon/user.png" mode="widthFix"></image><input type="text" v-model="listuser.userName"
					 placeholder="请输入用户名" />
				</view>
				<view class="one_ck  flex-center">
					<image src="../../static/icon/xuexiao.png" mode="widthFix"></image>
					<view class="" v-if="arraylist.length>=1">
						<picker @change="bindPickerChange" :value="index" mode="selector" :range="array">
							<view class="uni-input">{{array[index]}}</view>
						</picker>
					</view>
					<text style="margin-left: 15px; color: #333333;" v-if="arraylist.length<1">请先选择角色</text>
						
				</view>
				<view class="one_ck  flex-center"  v-if="listuser.userRole!=3">
					<image src="../../static/icon/banji.png" mode="widthFix"></image>
					<view class=""  v-if="arraylist.length>1">
						<picker @change="bindPickerChange2" :value="index2" mode="selector" :range="array2">
							<view class="uni-input">{{array2[index2]}}</view>
						</picker>
					</view>
					<text style="margin-left: 15px; color: #333333;" v-if="arraylist.length<1">请先选择学校</text>
				</view>
				<view class="one_ck  flex-center" v-if="listuser.userRole==1">
					<image src="../../static/icon/haizi.png" mode="widthFix"></image><input type="text" v-model="listuser.childId"
					 placeholder="请输入学生ID" />
				</view>
				<view class="one_ck  flex-center">
					<image src="../../static/icon/dianhua.png" mode="widthFix"></image><input type="number" maxlength="11" v-model="listuser.userPhone"
					 placeholder="请输入电话号码" />
				</view>
				<view class="one_ck  flex-center" v-if="listuser.userRole==3">
					<image src="../../static/icon/mima.png" mode="widthFix"></image><input type="text" :password="pass" v-model="xuexiao"
					 placeholder="请输入学校密码" />
					<image src="../../static/icon/yincang.png" @click="yanpass = !yanpass" mode="widthFix" v-if="yanpass"></image>
					<image src="../../static/icon/xianshi.png" @click="yanpass = !yanpass" mode="widthFix" v-if="!yanpass"></image>
				</view>
				<view class="one_ck  flex-center" v-if="listuser.userRole==2">
					<image src="../../static/icon/mima.png" mode="widthFix"></image><input type="text" :password="pass" v-model="laoshi"
					 placeholder="请输入班级老师密码" />
					<image src="../../static/icon/yincang.png" @click="yanpass = !yanpass" mode="widthFix" v-if="yanpass"></image>
					<image src="../../static/icon/xianshi.png" @click="yanpass = !yanpass" mode="widthFix" v-if="!yanpass"></image>
				</view>
				<view class="one_ck  flex-center">
					<image src="../../static/icon/mima.png" mode="widthFix"></image><input type="text" :password="pass" v-model="listuser.password"
					 placeholder="请输入密码" />
					<image src="../../static/icon/yincang.png" @click="pass = !pass" mode="widthFix" v-if="pass"></image>
					<image src="../../static/icon/xianshi.png" @click="pass = !pass" mode="widthFix" v-if="!pass"></image>
				</view>
			</view>
			<button style="color: #FFFFFF; margin-top: 20px;" class="logout" type="default" @click="Submission()">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		onReady() {
			
		},
		data() {
			return {
				user: '',
				array: ['请选择学校'],//学校
				arraylist:[],
				array2: ['请选择班级'],//班级
				arraylist2:[],
				index: 0,
				index2: 0,
				yanSchool:'ktsadmini123',
				yanClass:'ktsadmini456',
				xuexiao:'',
				laoshi:'',
				listuser: {
					"userRole": 0, //角色
					"userWxid": '', //opengID
					"userName": '', //
					"childId": '', //孩子ID
					"schoolId": '', //学校ID
					"classId": '', //班级ID
					"userPhone": '', //电话
					"password": '', //
				},
				pass: true,
				yanpass: true
			};
		},
		onLoad() {
			let openid = uni.getStorageSync('openid'); //加载用户缓存
			console.log(this.user);
			if(openid){
				this.listuser.userWxid = openid;
			}
			
			
		},
		onShow() {
			this.user = uni.getStorageSync('userlist');
			if(this.user.userName){
				this.utils.error("该用户已绑定",()=>{
					this.utils.navback();
				})
			}else{
				this.userschoolId();
			}
		},
		methods: {

			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index = e.target.value;
				this.listuser.schoolId= this.arraylist[this.index].schoolId;
				this.userclassId();
			},
			bindPickerChange2: function(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.index2 = e.target.value;
				this.listuser.classId= this.arraylist2[this.index2].id;
			},
			//角色选择
			radioClick(index) {
				this.listuser.userRole = index;
			},
			userschoolId() {
				this.http.getApi('/school/getall',{} ,'get').then(res => {
					console.log("res");
					console.log(res);
					this.arraylist = res.data;
					for (let i = 0; i < res.data.length; i++) {
						this.array[i] = res.data[i].schoolName;
						// console.log(this.array);
					}
					this.listuser.schoolId= this.arraylist[this.index].schoolId;
					this.userclassId();
					
				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			},
			userclassId() {
				this.http.getApi('/class/getAllClass',{SchoolId:this.arraylist[this.index].schoolId}, 'get').then(res => {
					console.log("res");
					console.log(res);
					this.arraylist2 = res.data;
					console.log(this.arraylist2);
					for (let i = 0; i < res.data.length; i++) {
						this.array2[i] = res.data[i].className;
						// console.log(this.array);
					}
					this.listuser.classId= this.arraylist2[this.index2].id;
					
				}).catch(err => {
					console.log("err");
					console.log(err);
				});
			},
			Submission() {
				if(this.listuser.userRole==0){
					this.utils.error('请选择角色！');return;
				}
				// this.xuexiao = this.listuser.userRole!=3  ? this.yanSchool :this.xuexiao;
				// this.laoshi = this.listuser.userRole!=2 ? this.yanClass :this.laoshi;
				if(this.listuser.userName==''){
					this.utils.error('请填写用户名！');return;
				}
				if(this.listuser.schoolId==''){
					this.utils.error('请选择学校！');return;
				}
				if(this.listuser.classId=='' && this.listuser.userRole!=3){
					this.utils.error('请选择班级！');return;
				}
				if(this.listuser.childId=='' && this.listuser.userRole==1){
					this.utils.error('请输入学生ID！');return;
				}
				if(this.listuser.userPhone=='' || this.utils.checkMobile(this.listuser.userPhone)==false){
					this.utils.error('请填写正确手机号！');return;
				}
				if( this.listuser.userRole==3 && this.xuexiao != this.yanSchool ){
					this.utils.error('请输入正确学校密码！');return;
				}
				if( this.listuser.userRole==2 && this.laoshi != this.yanClass ){
					this.utils.error('请输入正确班级密码！');return;
				}
				if(this.listuser.password==''|| this.listuser.password.length < 6){
					this.utils.error('请输入长度不少6位密码！');return;
				}
				if(this.listuser.userWxid ==''){
					this.listuser.userWxid = this.listuser.userPhone;
				}
				
				let storelist= this.listuser;
				var _this = this;
				this.http.getApi('/user/register',storelist, 'post').then(res => {
					console.log("res");
					console.log(res);
					_this.utils.success('注册成功！',()=>{
						_this.utils.navback();
					})
				}).catch(err => {
					console.log("err");
					console.log(err);
					if(err.status==33){
						uni.showModal({
						    title: '该用户已存在',
						    content: '点击确定返回用户界面',
						    success: function (res) {
						        if (res.confirm) {
									_this.utils.navback();
						        } else if (res.cancel) {
						        }
						    }
						});
						
					}else{
						this.utils.error(err.msg);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.index_binding {
		width: 100%;
		height: 100%;
		background-color: #F8F8F8;
	}
	.logout {
		width: 80%;
		height: 50px;
		box-shadow: 1px 2px 6px #DAC1E7;
		background: linear-gradient(45deg, rgba(254, 172, 94, 0.5), rgba(199, 121, 208, 0.5), rgba(75, 192, 200, 0.5));
		border: none;
		font-size: 19px;
		font-weight: 700;
	}

	.binding_ck {
		max-width: 100%;
		min-height: 670px;
		padding: 0 15px;
		margin-top: 10px;

		.binding_form {
			max-width: 100%;
			padding: 15px;
			background-color: #FFFFFF;
			border-radius: 15px;
			.uni-input{
				border-radius: 7px;
				background-color: #FFFFFF;
				margin-left: 15px;
				padding: 5px 15px;
			}
			.one_ck {
				width: 100%;
				min-height: 40px;
				background-color: #F8F8F8;
				border-radius: 7px;
				justify-content: flex-start;
				padding: 5px 3px;
				margin: 10px 0;

				.radio_item {
					justify-content: flex-start;
					align-items: center;
					margin-left: 15px;
					padding: 0 5px;
					color: #333333;

					// border: #007AFF 1px solid;
					.radio_icon {
						width: 26px;
						height: 26px;
						border-radius: 13px;
						font-size: 18px;
						color: #ffffff;
						margin-right: 5px;
						box-shadow: 1px 2px 6px #C8C7CC;
						// border: #808080 1px solid;
						background-color: #FFFFFF;
						// line-height: 27upx;
						text-align: center;

						&.active {
							background-color: #FF6974;
						}
					}
				}

				// border: #007AFF 1px solid;

				// border-bottom: #C0C0C0 1px solid;
				text {
					font-size: 18px;
					// border: #4CD964 1px solid;
				}

				image {
					width: 30px;
				}

				input {
					padding: 10px 15px;
					margin: 0 15px;
					// border: #4CD964 1px solid;
					background-color: #FFFFFF;
					border-radius: 7px;
					// border: #4CD964 1px solid;
				}
			}

		}
	}
</style>
