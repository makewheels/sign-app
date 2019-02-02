// var baseurl = "http://192.168.0.101/sign-app";
var baseurl = "https://qbserver.cn/sign-app";

var _mtac = {};
(function() {
	var mta = document.createElement("script");
	mta.src = "https://pingjs.qq.com/h5/stats.js?v2.0.4";
	mta.setAttribute("name", "MTAH5");
	mta.setAttribute("sid", "500669528");
	var s = document.getElementsByTagName("script")[0];
	s.parentNode.insertBefore(mta, s);
})();
