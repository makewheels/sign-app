//图片文件uuid
var imageUuid;
//录音文件uuid
var recordUuid;
mui.plusReady(function() {

	//拍照按钮
	var btn_image = document.getElementById("btn_image");
	btn_image.addEventListener('tap', function() {
		//拍照
		plus.camera.getCamera().captureImage(function(capturedFile) {
			//隐藏拍照按钮
			btn_image.style.display = "none";
			//上传
			var span = document.getElementById("span_image");
			span.style.color = "red";
			span.innerText = "正在上传...";
			//开始上传
			var uploader = plus.uploader.createUpload(baseurl + '/upload?type=sign&content=image', {},
				function(upload, status) {
					var response = JSON.parse(upload.responseText);
					imageUuid = response.fileUuid;
					//删除文件
					plus.io.resolveLocalFileSystemURL(capturedFile, function(entry) {
						entry.remove();
					});
					//上传完成
					span.innerText = "搞定了，老铁！";
					span.style.color = "green";
					checkFinish();
				}
			);
			uploader.addFile(capturedFile, {
				name: capturedFile
			});
			uploader.start();
		});
	});

	//录音机对象
	var recorder = plus.audio.getRecorder();
	//是否正在录音
	var isRecording = false;
	//录音按钮
	var btn_record = document.getElementById("btn_record");
	btn_record.addEventListener('tap', function() {
		//如果还没开始录音
		if (isRecording == false) {
			//开始录音
			var span = document.getElementById("span_record");
			span.innerText = "正在录音...";
			btn_record.innerText = "结束录音";
			btn_record.classList.remove("mui-btn-blue");
			btn_record.classList.add("mui-btn-red");
			isRecording = true;
			//开始录音
			recorder.record({
				format: "amr",
				samplerate: "16000"
			}, function(recordFile) {
				//录音完成
				isRecording = false;
				//上传
				span.innerText = "正在上传...";
				var uploader = plus.uploader.createUpload(baseurl + '/upload?type=sign&content=record', {},
					function(upload, status) {
						var response = JSON.parse(upload.responseText);
						recordUuid = response.fileUuid;
						//删除文件
						plus.io.resolveLocalFileSystemURL(recordFile, function(entry) {
							entry.remove();
						});
						//上传完成
						span.innerText = "搞定了，老铁！";
						span.style.color = "green";
						checkFinish();
					}
				);
				uploader.addFile(recordFile, {
					name: recordFile
				});
				uploader.start();
			});
			//如果正在录音
		} else {
			isRecording = false;
			//停止录音机
			recorder.stop();
			btn_record.style.display = "none";
		}
	});
});

//检查是否完成，如果完成，则提交
function checkFinish() {
	if (imageUuid == undefined || recordUuid == undefined) {
		return;
	}
	mui.post(baseurl + '/sign?method=doSign', {
		imageUuid: imageUuid,
		recordUuid: recordUuid
	}, function(data) {
		if (data.state == "ok") {
			plus.webview.getWebviewById('sign').reload();
			plus.webview.currentWebview().close();
			mui.toast("签到成功！");
		}
	}, 'json');
}
