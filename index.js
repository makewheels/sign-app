mui.plusReady(function() {
	var device = {
		imei: plus.device.imei,
		imsi: plus.device.imsi,
		model: plus.device.model,
		vendor: plus.device.vendor,
		uuid: plus.device.uuid,
		volume: plus.device.getVolume(),
		screen: {
			resolutionHeight: plus.screen.resolutionHeight,
			resolutionWidth: plus.screen.resolutionWidth,
			scale: plus.screen.scale,
			dpiX: plus.screen.dpiX,
			dpiY: plus.screen.dpiY,
			brightness: plus.screen.getBrightness()
		},
		display: {
			resolutionHeight: plus.display.resolutionHeight,
			resolutionWidth: plus.display.resolutionWidth
		},
		networkinfo: plus.networkinfo.getCurrentType(),
		os: {
			language: plus.os.language,
			version: plus.os.version,
			name: plus.os.name,
			vendor: plus.os.vendor
		}
	};

	//上报打开应用日志

	//验证登录状态
	var loginToken = plus.storage.getItem("loginToken");
	//如果没登录过，跳转至登录页面
	if (loginToken == null) {
		plus.webview.open("pages/login/login.html");
	} else {
		//之前登陆过，执行自动登录
	}
	//关闭首页
	plus.webview.currentWebview().close();
})
