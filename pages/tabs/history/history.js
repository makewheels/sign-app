mui.plusReady(function() {
	loadItem1();
	document.getElementById('slider').addEventListener('slide', function(e) {
		if (e.detail.slideNumber === 0) {
			loadItem1();
		} else if (e.detail.slideNumber === 1) {
			loadItem2();
		} else if (e.detail.slideNumber === 2) {
			loadItem3();
		}
	});
});

function loadItem1() {
	mui.post(baseurl + '/sign?method=find', {
		who: "all",
		valid: "all"
	}, function(data) {
		var html = "";
		for (var i = 0; i < data.length; i++) {
			var each = data[i];
			html +=
				'<ul class="mui-table-view"><li class="mui-table-view-cell mui-media"><a href="javascript:;"><img class="mui-media-object mui-pull-left" src="' +
				each.avatarUrl + '"><div class="mui-media-body">' + each.nickname +
				'<p class="mui-ellipsis">' + each.signTime + '</p></div></a></li></ul>';
		}
		document.getElementById("scroll1").innerHTML = html;
	}, 'json');
}

function loadItem2() {
	mui.post(baseurl + '/sign?method=find', {
		who: "my",
		valid: "all"
	}, function(data) {
		var html = "";
		for (var i = 0; i < data.length; i++) {
			var each = data[i];
			html +=
				'<ul class="mui-table-view"><li class="mui-table-view-cell mui-media"><a href="javascript:;"><img class="mui-media-object mui-pull-left" src="' +
				each.avatarUrl + '"><div class="mui-media-body">' + each.nickname +
				'<p class="mui-ellipsis">' + each.signTime + '</p></div></a></li></ul>';
		}
		document.getElementById("scroll2").innerHTML = html;
	}, 'json');
}

function loadItem3() {
	mui.post(baseurl + '/sign?method=find', {
		who: "other",
		valid: "all"
	}, function(data) {
		var html = "";
		for (var i = 0; i < data.length; i++) {
			var each = data[i];
			html +=
				'<ul class="mui-table-view"><li class="mui-table-view-cell mui-media"><a href="javascript:;"><img class="mui-media-object mui-pull-left" src="' +
				each.avatarUrl + '"><div class="mui-media-body">' + each.nickname +
				'<p class="mui-ellipsis">' + each.signTime + '</p></div></a></li></ul>';
		}
		document.getElementById("scroll3").innerHTML = html;
	}, 'json');
}
