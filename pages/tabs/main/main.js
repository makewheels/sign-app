mui.plusReady(function() {
	//当前打开的webview id
	var currentWebviewId;
	//判断需要先打开哪个页面
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
});

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
