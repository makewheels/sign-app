mui.plusReady(function() {
	var startHour;
	var startMinute;
	var endHour;
	var endMinute;
	var isStartSelected = false;
	var isEndSelected = false;
	document.getElementById("btn_startTime").addEventListener('tap', function() {
		new mui.DtPicker({
			type: 'time'
		}).show(function(selectItems) {
			startHour = selectItems.h.value;
			startMinute = selectItems.i.value;
			document.getElementById("span_startTime").innerText = startHour + ":" + startMinute;
			isStartSelected = true;
		});
	});
	document.getElementById("btn_endTime").addEventListener('tap', function() {
		new mui.DtPicker({
			type: 'time'
		}).show(function(selectItems) {
			endHour = selectItems.h.value;
			endMinute = selectItems.i.value;
			document.getElementById("span_endTime").innerText = endHour + ":" + endMinute;
			isEndSelected = true;
		});
	});
	document.getElementById("btn_saveMission").addEventListener('tap', function() {
		var missionName = document.getElementById("input_missionName").value;
		if (missionName == "") {
			mui.alert('请输入任务名');
			return;
		}
		if (isStartSelected == false) {
			mui.alert('请选择签到开始时间');
			return;
		}
		if (isEndSelected == false) {
			mui.alert('请选择签到结束时间');
			return;
		}
		if (endHour < startHour || endHour == startHour && endMinute <= startMinute) {
			mui.alert('跨日签到？');
			return;
		}
		//新建，保存第一个任务
		mui.post(baseurl + '/mission?method=new', {
			missionName: missionName,
			startHour: startHour,
			startMinute: startMinute,
			endHour: endHour,
			endMinute: endMinute
		}, function(data) {
			if (data.state = "ok") {
				mui.toast(missionName + " 保存成功！");
				plus.webview.getWebviewById('main').show();
				plus.webview.getWebviewById('main').reload();
				plus.webview.currentWebview().close();
				plus.webview.getWebviewById('noMission').close();
			}
		}, 'json');
	});
})
