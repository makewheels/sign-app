mui.plusReady(function() {
	var imageUuid;
	var recordUuid;
	//拍照按钮
	document.getElementById("btn_image").addEventListener('tap', function() {
		//拍照
		plus.camera.getCamera().captureImage(function(capturedFile) {
			//上传
			var uploader = plus.uploader.createUpload(baseurl + '/upload?type=sign&content=image', {},
				function(upload, status) {
					var response = JSON.parse(upload.responseText);
					imageUuid = response.fileUuid;
					//删除文件
					plus.io.resolveLocalFileSystemURL(capturedFile, function(entry) {
						entry.remove();
					});
				}
			);
			uploader.addFile(capturedFile, {
				name: capturedFile
			});
			uploader.addEventListener('statechanged', function(upload, status) {
				var percent = Math.round(upload.uploadedSize / upload.totalSize * 100);
				console.log(percent + " " + status);
				document.getElementById("span_image").innerText = "正在上传：" +
					percent + "%";
			});
			uploader.start();
		});
	});

	//录音按钮
	document.getElementById("btn_record").addEventListener('tap', function() {

	});

	//提交按钮
	document.getElementById("btn_submit").addEventListener('tap', function() {

	});
});
