mui.plusReady(function() {
	mui.get(baseurl + '/sign?method=getCurrentSignState', {}, function(data) {
		document.getElementById("currentMissionName").innerText = data.currentMissionName;
		document.getElementById("timeRange").innerText = data.timeRange;
		document.getElementById("signedCount").innerText = data.signedCount;
		document.getElementById("mySignedStateString").innerText = data.mySignedStateString;
		document.getElementById("btn_doSign").addEventListener('tap', function() {
			plus.webview.open('doSign.html');
		});
	}, 'json');
});
