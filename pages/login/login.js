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

//本地登录完成
function loginFinish(auth) {
	//如果登录失败
	if (auth.authResult == null) {
		mui.toast("登录失败");
	} else {
		//调用服务器
		mui.post(baseurl + '/user?method=login&type=qq', {
			auth: JSON.stringify(auth),
			deviceJson: deviceJson
		}, function(data) {
			console.log('login success');
			plus.storage.setItem("loginToken", data.loginToken);
			//前往主页
			plus.webview.open('pages/tabs/main/main.html', 'main');
			plus.webview.currentWebview().close();
		}, 'json');
	}
}

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
		mui.toast("注销\"" + auth.description + "\"成功");
	}, function(e) {
		mui.alert("注销\"" + auth.description + "\"失败：" + e.message);
	});
}
