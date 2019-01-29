mui.plusReady(function() {
	var loginToken = plus.storage.getItem("loginToken");
	//上报打开应用日志
	mui.post(baseurl + '/app?method=report&type=appOpen', {
		deviceJson: deviceJson,
		loginToken: loginToken
	}, function(data) {}, 'json');
	//验证登录状态
	//如果没有loginToken
	if (loginToken == null || loginToken == "") {
		//跳转到登录页面
		plus.webview.open("pages/login/login.html");
		//关闭首页
		plus.webview.currentWebview().close();
	} else {
		//存在loginToken，执行自动登录
		mui.ajax(baseurl + '/user?method=login&type=loginToken', {
			data: {
				loginToken: loginToken,
				deviceJson: deviceJson
			},
			dataType: 'json',
			type: 'post',
			success: function(data) {
				plus.storage.setItem("loginToken", data.loginToken);
				plus.webview.open('/pages/tabs/main/main.html', 'main');
				plus.webview.currentWebview().close();
			},
			error: function(xhr, type, errorThrown) {
				if (xhr.status == 401) {
					plus.webview.open("/pages/login/login.html");
					plus.webview.currentWebview().close();
				}
			}
		});
	}
})
