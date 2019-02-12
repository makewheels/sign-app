mui.plusReady(function() {
	mui.post(baseurl + '/sign?method=getSignDetail', {
		signLogUuid: plus.webview.currentWebview().signLogUuid
	}, function(data) {
		
	}, 'json');
});
