var deviceJson;

function loadDeviceJson() {
	plus.runtime.getProperty(plus.runtime.appid, function(info) {
		deviceJson = JSON.stringify({
			version: "1",
			imei: plus.device.imei,
			imsi: plus.device.imsi,
			model: plus.device.model,
			vendor: plus.device.vendor,
			uuid: plus.device.uuid,
			volume: plus.device.getVolume(),
			screen: {
				resolutionHeight: plus.screen.resolutionHeight,
				resolutionWidth: plus.screen.resolutionWidth,
				scale: plus.screen.scale,
				dpiX: plus.screen.dpiX,
				dpiY: plus.screen.dpiY,
				brightness: plus.screen.getBrightness()
			},
			display: {
				resolutionHeight: plus.display.resolutionHeight,
				resolutionWidth: plus.display.resolutionWidth
			},
			networkinfo: plus.networkinfo.getCurrentType(),
			os: {
				language: plus.os.language,
				version: plus.os.version,
				name: plus.os.name,
				vendor: plus.os.vendor
			},
			runtime: {
				appid: plus.runtime.appid,
				arguments: plus.runtime.arguments,
				channel: plus.runtime.channel,
				launcher: plus.runtime.launcher,
				origin: plus.runtime.origin,
				version: plus.runtime.version,
				innerVersion: plus.runtime.innerVersion,
				launchLoadedTime: plus.runtime.launchLoadedTime,
				processId: plus.runtime.processId,
				startupTime: plus.runtime.startupTime,
				isCustomLaunchPath: plus.runtime.isCustomLaunchPath(),
				widgetInfo: {
					appid: info.appid,
					version: info.version,
					name: info.name,
					description: info.description,
					author: info.author,
					email: info.email,
					license: info.license,
					licensehref: info.licensehref,
					features: info.features
				}
			}
		});
	});
}

function getDeviceJson() {
	if (deviceJson == undefined) {
		loadDeviceJson();
	}
	return deviceJson;
}

mui.plusReady(function() {
	loadDeviceJson();
})
