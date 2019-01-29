mui.plusReady(function() {
	document.getElementById("btn_newMission").addEventListener('tap', function() {
		plus.webview.open('newMission.html');
	});
	document.getElementById("btn_joinMission").addEventListener('tap', function() {
		mui.prompt('', '任务id', '请粘贴任务id', null, function(e) {
			if (e.index == 1) {
				var missionUuid = e.value;
				if (missionUuid == "") {
					mui.toast("请输入任务id");
					return;
				}
				mui.get(baseurl + '/mission?method=join', {
					missionUuid: missionUuid
				}, function(data) {
					if (data.state == "ok") {
						mui.toast("成功加入：" + data.missionName + "！");
						plus.webview.getWebviewById('main').show();
						plus.webview.getWebviewById('main').reload();
						plus.webview.currentWebview().close();
					} else {
						mui.alert("请检查任务id：" + missionUuid, "找不到该任务");
					}
				}, 'json');
			}
		}, 'div');
	});
});
