mui.plusReady(function() {
	mui.post(baseurl + '/sign?method=getSignDetail', {
		signLogUuid: plus.webview.currentWebview().signLogUuid
	}, function(data) {
		document.getElementById("avatar").src = data.avatarUrl;
		document.getElementById("nickname").innerText = data.nickname;
		document.getElementById("missionName").innerText = "任务：" + data.missionName;
		var inTimeRange = data.inTimeRange;
		var label_inTimeRange = document.getElementById("inTimeRange");
		if (inTimeRange) {
			label_inTimeRange.innerText = "有效";
			label_inTimeRange.style.backgroundColor = "green";
		} else {
			label_inTimeRange.innerText = "无效";
			label_inTimeRange.style.backgroundColor = "red";
		}
		document.getElementById("timeRange").innerHTML =
			data.startHour + ":" + data.startMinute + "&nbsp;-&nbsp;" +
			data.endHour + ":" + data.endMinute;
		document.getElementById("signTime").innerText = data.signTime;
		document.getElementById("signPosition").innerText = data.position;
		//录音播放
		var player = plus.audio.createPlayer(data.recordUrl);
		var btn_play = document.getElementById("btn_play");
		var span_record = document.getElementById("span_record");
		span_record.innerText = "点击播放";
		//是否播放过
		var hasPlayed = false;
		//是否正在播放
		var isPlaying = false;
		btn_play.addEventListener('tap', function() {
			//如果没播放过
			if (hasPlayed == false) {
				//播放
				btn_play.innerText = "暂停";
				span_record.innerText = "播放中...";
				hasPlayed = true;
				isPlaying = true;
				player.play(function() {
					console.log("feef");
					btn_play.innerText = "播放";
					span_record.innerText = "播放完毕！";
					hasPlayed = false;
					isPlaying = false;
					player.stop();
					player = plus.audio.createPlayer(data.recordUrl);
				});
				//如果已经播过了
			} else {
				//如果正在播放
				if (isPlaying == true) {
					//暂停
					btn_play.innerText = "播放";
					span_record.innerText = "已暂停";
					isPlaying = false;
					player.pause();
					//如果已被暂停
				} else {
					//恢复播放
					btn_play.innerText = "暂停";
					span_record.innerText = "播放中...";
					isPlaying = true;
					player.resume();
				}
			}
		});
		document.getElementById("image").src = data.imageUrl;
	}, 'json');
});
