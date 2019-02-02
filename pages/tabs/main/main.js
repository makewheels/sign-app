//当前打开的webview id
var currentWebviewId;
//初始化判断，只调用一次
mui.plusReady(function() {
	reportOpenAppLog();
	//判断首页需要先打开哪个页面
	mui.get(baseurl + '/mission?method=getCurrent', {}, function(data) {
		var currentMissionId = data.currentMissionId;
		//如果该用户没有当前任务
		if (currentMissionId == null || currentMissionId == undefined) {
			//跳转至新建任务页面
			plus.webview.open('/pages/mission/noMission.html', 'noMission');
			//隐藏main页面
			plus.webview.currentWebview().hide();
		} else {
			//如果有当前任务，正常加载main页面
			loadMainPage();
		}
	}, 'json');
});

//应用打开日志
function reportOpenAppLog() {
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
		plus.geolocation.getCurrentPosition(function(position) {
			mui.post(baseurl + '/app?method=report&type=appOpen', {
				deviceJson: deviceJson,
				loginToken: loginToken,
				position: JSON.stringify(position)
			}, function(data) {}, 'json');
		}, function(e) {
			mui.alert(e.code + " " + e.message);
		});
	});
}

//加载main页面
function loadMainPage() {
	//如果已经有当前任务
	//跳转至签到页面
	currentWebviewId = "sign";
	//打开首页
	openWebviewById(currentWebviewId);
	//切换tab监听
	mui('.mui-bar').on('tap', '.mui-tab-item', function(e) {
		//拿到id
		var id = this.dataset.id;
		//如果点的就是当前页面，则返回
		if (id == currentWebviewId) {
			return;
		}
		//新页面
		var targetWebview = plus.webview.getWebviewById(id);
		//如果目标页面还没创建，则先创建
		if (targetWebview == null) {
			openWebviewById(id);
		} else {
			//如果已经创建了，就直接显示
			targetWebview.show();
		}
		//隐藏老页面
		plus.webview.getWebviewById(currentWebviewId).hide();
		//重设当前页id
		currentWebviewId = id;
	});
}

function openWebviewById(id) {
	var url;
	if (id == "sign") {
		url = "../sign/sign.html";
	} else if (id == "history") {
		url = "../history/history.html";
	} else if (id == "bill") {
		url = "../bill/bill.html";
	} else if (id == "me") {
		url = "../me/me.html";
	}
	var openWebview = plus.webview.create(url, id, {
		bottom: '50px',
		top: '0px'
	});
	openWebview.show();
	plus.webview.currentWebview().append(openWebview);
}
