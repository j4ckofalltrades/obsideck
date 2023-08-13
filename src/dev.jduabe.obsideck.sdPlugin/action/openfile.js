/// <reference path="../libs/js/action.js" />
/// <reference path="../libs/js/stream-deck.js" />

var settings = {};
var openFileAction = new Action("dev.jduabe.obsideck.openfile");

openFileAction.onWillAppear((event) => {
	$SD.getSettings(event.context);
});

openFileAction.onDidReceiveSettings(({ payload }) => {
	settings = payload.settings;
});

openFileAction.onKeyUp(({ context }) => {
	const apiKey = settings.apiKey;
	const url = settings.url;
	const filePath = settings.filePath;

	fetch(`${url}/open/${encodeURIComponent(filePath)}/`, {
		method: "POST",
		headers: {
			"Accept": "*/*",
			"Authorization": "Bearer " + apiKey,
		}
	})
		.then(response => {
			if (response.ok) {
				$SD.showOk(context);
			} else {
				$SD.showAlert(context);
			}
		})
		.catch(err => $SD.showAlert(context));
});
