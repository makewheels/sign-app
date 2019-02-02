mui.plusReady(function() {
	var loginToken = plus.storage.getItem("loginToken");
	//上报打开应用日志
	//地理位置
	plus.geolocation.getCurrentPosition(function(position) {
		mui.post(baseurl + '/app?method=report&type=appOpen', {
			deviceJson: deviceJson,
			loginToken: loginToken,
			position: JSON.stringify(position)
		}, function(data) {}, 'json');
	}, function(e) {
		mui.alert(e.code + " " + e.message);
	});
	//检查更新
	plus.runtime.getProperty(plus.runtime.appid, function(info) {
		mui.post(baseurl + '/app?method=checkUpdate', {
			version: info.version
		}, function(data) {
			//如果需要更新
			if (data.needUpdate) {
				//下载安装包
				plus.downloader.createDownload(data.url, {}, function(download, status) {
					//安装应用
					plus.runtime.install(download.filename, {}, function(wInfo) {
						//删除安装包
						plus.io.resolveLocalFileSystemURL(download.filename, function(entry) {
							entry.remove();
						});
					});
				});
			}
		}, 'json');
	});
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
