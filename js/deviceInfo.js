var deviceJson;
mui.plusReady(function() {
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
		}
	});
})
