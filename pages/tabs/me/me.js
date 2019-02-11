mui.plusReady(function() {
	plus.runtime.getProperty(plus.runtime.appid, function(widgetInfo) {
		document.getElementById("version").innerText = "当前版本：" + widgetInfo.version;
	});
	mui.post(baseurl + '/user?method=getUserInfo', {}, function(data) {
		document.getElementById("avatar").src = data.avatarUrl;
		document.getElementById("nickname").innerText = data.nickname;
		document.getElementById("registTime").innerText = "注册时间：" + data.registTime;
	}, 'json');
});

//退出登录
function logout() {
	mui.plusReady(function() {
		plus.storage.removeItem('loginToken');
		var auths = {};
		plus.oauth.getServices(function(services) {
			for (var i in services) {
				var service = services[i];
				auths[service.id] = service;
			}
		});
		var auth = auths['qq'];
		auth.logout(function() {
			mui.toast("注销 " + auth.description + " 成功");
			plus.webview.open('/pages/login/login.html', 'login');
			plus.webview.getWebviewById('main').close();
		});
	});
}
