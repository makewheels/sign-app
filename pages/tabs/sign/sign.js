mui.plusReady(function() {
	var mySignedStateBoolean;
	mui.get(baseurl + '/sign?method=getCurrentSignState', {}, function(data) {
		document.getElementById("currentMissionName").innerText = data.currentMissionName;
		document.getElementById("timeRange").innerText = data.timeRange;
		document.getElementById("signedCount").innerText = data.signedCount;
		document.getElementById("mySignedStateString").innerText = data.mySignedStateString;
		mySignedStateBoolean = data.mySignedStateBoolean;
		document.getElementById("btn_doSign").addEventListener('tap', function() {
			if (mySignedStateBoolean) {
				mui.alert("你已经签过了哦");
				return;
			}
			plus.webview.open('doSign.html');
		});
	}, 'json');
});
