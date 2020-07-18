export const ApiServer = 'http://120.24.28.135:8080/';

/**
 * 接口调用-同步
 * @param {Object} url
 * @param {Object} param	
 * @param {Object} callback
 * @param {Object} errback
 */
export function getApi(uri, param, method, debug) {
	return new Promise((resolt, retject) => {
		var url = ApiServer + '' + uri;
		if (param == undefined || param == '' || typeof param != 'object') {
			param = new Object();
		}
		// 请求地址
		var apiurl = uri.indexOf('http')>=0 ? uri : url;
		// 打印加密数据
		if (debug === true) {
			console.log(apiurl);
			console.log(JSON.stringify(param));
		}
		let userinfo = uni.getStorageSync('openid');
		let methods = method && method != null ? method : "post";
		// console.log(methods);
		// 发起请求
		uni.request({
			url: apiurl,
			data: param,
			method: methods,
			header: {
				// 'content-type': methods.toString().toLocaleUpperCase() == 'POST' ? 'application/json' : 'application/x-www-form-urlencoded', // 默认值
				'login': userinfo ? userinfo : ''
			},
			dataType: "json",
			success: function(res) {
				
				
				if(uri.indexOf('http')>=0){
					if(res.statusCode==200){
						resolt(res.data);
						// console.log("打印接口");
					}else{
						retject(res.data);
					}
					return;
				}
				// console.log("打印接口");
				// console.log(res);
				// console.log(JSON.parse(res.data));
				// console.log(JSON.stringify(res))
				if (res.statusCode == 200 && res.data.status == 0) {
					resolt(res.data);
					return;
				}
				if (res.statusCode == 200 && res.data.status != 0) {
					retject(res.data);
				}
				uni.hideLoading();
				console.log(res)
				uni.showToast({
					title: res.data.msg,
					icon: 'none'
				});
			},
			fail: function(err) {
				//console.log(err)
				retject(err)
				uni.hideLoading();
				uni.showToast({
					title: "网络连接失败，请检查网络连接！",
					icon: "none",
					duration: 3000
				})
			}
		})
	})
}