
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/user/user","pages/news/news","pages/user/feedback","pages/login/login","pages/login/forget","pages/login/register","pages/user/LanEquipment","pages/user/aboutApp","pages/user/general/generalTools","pages/index/videoDetails","pages/user/userShare","pages/user/userAlbum","pages/user/userVideoPlayback","pages/user/userAttendance","pages/user/userattendanceAdmin","pages/user/userSecurity","pages/news/newsDetails","pages/index/indexMenslist","pages/user/userBinding","pages/news/newsDetails/userPrincipal","pages/news/newsDetails/userTeacher","pages/news/newsDetails/userParent","pages/user/appSetlist","pages/user/setRotation","pages/user/feedbackList","pages/user/feedbackRecord","pages/index/notice/noticeList","pages/index/Timetable/Timetable","pages/index/notice/noticeAdd","pages/index/notice/noticeDelete","pages/index/Question/Question","pages/index/Timetable/TimetableAdd","pages/user/payment/payment","pages/user/payment/orderDete","pages/user/payment/orderTit","pages/order/order","pages/user/aboutApp/privacyPolicy"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"智悦校园安防","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#999999","selectedColor":"#333333","height":"60px","fontSize":"12px","borderStyle":"black","blurEffect":"extralight","list":[{"pagePath":"pages/index/index","iconPath":"static/icon/home.png","selectedIconPath":"static/icon/homes.png","text":"首页"},{"pagePath":"pages/news/news","iconPath":"static/icon/chat.png","selectedIconPath":"static/icon/chat_1.png","text":"消息"},{"pagePath":"pages/user/user","iconPath":"static/icon/personal_1.png","selectedIconPath":"static/icon/personal.png","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"智悦校园安防","compilerVersion":"2.8.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","navigationBarTextStyle":"white","backgroundColorTop":"#F8F8F8","navigationBarTitleText":"首页","enablePullDownRefresh":true,"scrollIndicator":"none","pullToRefresh":{"support":true,"color":"#1FC189","style":"default","contentdown":{"caption":"下拉可刷新"},"contentover":{"caption":"释放可刷新"},"contentrefresh":{"caption":"正在刷新"}}}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的"}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":true,"pullToRefresh":{"support":true,"color":"#1FC189","style":"default","contentdown":{"caption":"下拉可刷新"},"contentover":{"caption":"释放可刷新"},"contentrefresh":{"caption":"正在刷新"}}}},{"path":"/pages/user/feedback","meta":{},"window":{"titleNView":false}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"登陆页面"}},{"path":"/pages/login/forget","meta":{},"window":{"navigationBarTitleText":"找回密码"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"注册页面"}},{"path":"/pages/user/LanEquipment","meta":{},"window":{"titleNView":false}},{"path":"/pages/user/aboutApp","meta":{},"window":{"navigationBarTitleText":"关于","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/general/generalTools","meta":{},"window":{"navigationBarTitleText":"通用工具"}},{"path":"/pages/index/videoDetails","meta":{},"window":{"navigationBarTitleText":"视频详情"}},{"path":"/pages/user/userShare","meta":{},"window":{"navigationBarTitleText":"我的分享"}},{"path":"/pages/user/userAlbum","meta":{},"window":{"navigationBarTitleText":"相册"}},{"path":"/pages/user/userVideoPlayback","meta":{},"window":{"navigationBarTitleText":"视频回放"}},{"path":"/pages/user/userAttendance","meta":{},"window":{"navigationBarTitleText":"校园考勤"}},{"path":"/pages/user/userattendanceAdmin","meta":{},"window":{"navigationBarTitleText":"考勤管理","enablePullDownRefresh":true}},{"path":"/pages/user/userSecurity","meta":{},"window":{"navigationBarTitleText":"账户与安全"}},{"path":"/pages/news/newsDetails","meta":{},"window":{"navigationBarTitleText":"消息详情","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/indexMenslist","meta":{},"window":{}},{"path":"/pages/user/userBinding","meta":{},"window":{"navigationBarTitleText":"账号绑定"}},{"path":"/pages/news/newsDetails/userPrincipal","meta":{},"window":{}},{"path":"/pages/news/newsDetails/userTeacher","meta":{},"window":{"navigationBarTitleText":"班级管理","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/news/newsDetails/userParent","meta":{},"window":{}},{"path":"/pages/user/appSetlist","meta":{},"window":{"navigationBarTitleText":"APP管理"}},{"path":"/pages/user/setRotation","meta":{},"window":{"navigationBarTitleText":"轮播图设置"}},{"path":"/pages/user/feedbackList","meta":{},"window":{"navigationBarTitleText":"反馈"}},{"path":"/pages/user/feedbackRecord","meta":{},"window":{"navigationBarTitleText":"反馈记录"}},{"path":"/pages/index/notice/noticeList","meta":{},"window":{"titleNView":false}},{"path":"/pages/index/Timetable/Timetable","meta":{},"window":{"navigationBarTitleText":"课表精灵"}},{"path":"/pages/index/notice/noticeAdd","meta":{},"window":{"titleNView":false}},{"path":"/pages/index/notice/noticeDelete","meta":{},"window":{"navigationBarTitleText":"编辑公告"}},{"path":"/pages/index/Question/Question","meta":{},"window":{"navigationBarTitleText":"知识题库","enablePullDownRefresh":true,"pullToRefresh":{"support":true,"color":"#1FC189","style":"default","contentdown":{"caption":"下拉可刷新"},"contentover":{"caption":"释放可刷新"},"contentrefresh":{"caption":"正在刷新"}}}},{"path":"/pages/index/Timetable/TimetableAdd","meta":{},"window":{"titleNView":false}},{"path":"/pages/user/payment/payment","meta":{},"window":{"navigationBarTitleText":"支付确定","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/user/payment/orderDete","meta":{},"window":{"navigationBarTitleText":"服务开通"}},{"path":"/pages/user/payment/orderTit","meta":{},"window":{"navigationBarTitleText":"服务说明"}},{"path":"/pages/order/order","meta":{},"window":{"navigationBarTitleText":"我的订单","navigationBarBackgroundColor":"#FFFFFF","scrollIndicator":"none"}},{"path":"/pages/user/aboutApp/privacyPolicy","meta":{},"window":{"navigationBarTitleText":"隐私政策及服务条款"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
