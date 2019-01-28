var baseurl = "http://192.168.0.101/sign-app";
// var baseurl = "https://qbserver.cn/sign-app";

function request(url, data, successFunction) {
	mui.ajax(baseurl + url, {
		data: data,
		dataType: 'json',
		type: 'post',
		success: function(data) {
			plus.storage.setItem("loginToken", data.loginToken);
		},
		error: function(xhr, type, errorThrown) {
			if (xhr.status == 401) {
				plus.webview.open("pages/login/login.html");
			}
		}
	});
}
