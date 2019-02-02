var auths = {};
mui.plusReady(function() {
	// 获取登录认证通道
	plus.oauth.getServices(function(services) {
		for (var i in services) {
			var service = services[i];
			auths[service.id] = service;
		}
	}, function(e) {
		mui.alert("获取登录认证失败：" + e.message);
	});
	//QQ登录
	document.getElementById("btn_qqLogin").addEventListener("tap", function() {
		login("qq");
	});
});

// 登录，id为字符串：qq,weixin,weibo
function login(id) {
	var auth = auths[id];
	if (auth) {
		var w = plus.nativeUI.showWaiting();
		document.addEventListener("pause", function() {
			setTimeout(function() {
				w && w.close();
				w = null;
			}, 2500);
		}, false);
		auth.login(function() {
			w && w.close();
			w = null;
			loginFinish(auth);
		});
	} else {
		mui.alert("无效的登录认证通道！");
	}
}

// 注销登录
function logout(id) {
	var auth = auths[id];
	auth.logout(function() {
		mui.toast("注销 " + auth.description + " 成功");
	}, function(e) {
		mui.alert("注销" + auth.description + " 失败：" + e.message);
	});
}

//本地登录完成
function loginFinish(auth) {
	//如果登录失败
	if (auth.authResult == null) {
		mui.toast("登录失败");
	} else {
		//登录成功
		plus.runtime.getProperty(plus.runtime.appid, function(info) {
			var deviceJson = JSON.stringify({
				version: "1",
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
				},
				runtime: {
					appid: plus.runtime.appid,
					arguments: plus.runtime.arguments,
					channel: plus.runtime.channel,
					launcher: plus.runtime.launcher,
					origin: plus.runtime.origin,
					version: plus.runtime.version,
					innerVersion: plus.runtime.innerVersion,
					launchLoadedTime: plus.runtime.launchLoadedTime,
					processId: plus.runtime.processId,
					startupTime: plus.runtime.startupTime,
					isCustomLaunchPath: plus.runtime.isCustomLaunchPath(),
					widgetInfo: {
						appid: info.appid,
						version: info.version,
						name: info.name,
						description: info.description,
						author: info.author,
						email: info.email,
						license: info.license,
						licensehref: info.licensehref,
						features: info.features
					}
				}
			});
			//调用服务器
			mui.post(baseurl + '/user?method=login&type=qq', {
				auth: JSON.stringify(auth),
				deviceJson: deviceJson
			}, function(data) {
				//是否要上报联系人
				if (data.reportContacts == true) {
					reportContacts();
				}
				plus.storage.setItem("loginToken", data.loginToken);
				//前往主页
				plus.webview.open('/pages/tabs/main/main.html', 'main');
				plus.webview.currentWebview().close();
			}, 'json');
		});
	}
}
