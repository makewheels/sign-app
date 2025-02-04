mui.plusReady(function() {
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

		var loginToken = plus.storage.getItem("loginToken");

		//上报打开应用日志
		plus.runtime.getProperty(plus.runtime.appid, function(info) {
			plus.geolocation.getCurrentPosition(function(position) {
				mui.post(baseurl + '/app?method=report&type=appOpen', {
					deviceJson: deviceJson,
					loginToken: loginToken,
					position: JSON.stringify(position)
				}, function(data) {}, 'json');
			}, function(e) {
				mui.toast(e.code + " " + e.message);
			});
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
			plus.webview.open("/pages/login/login.html");
			//关闭首页
			plus.webview.currentWebview().hide();
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
					plus.webview.currentWebview().hide();
				},
				error: function(xhr, type, errorThrown) {
					if (xhr.status == 401) {
						plus.webview.open("/pages/login/login.html");
						plus.webview.currentWebview().hide();
					}
				}
			});
		}
	});
});
