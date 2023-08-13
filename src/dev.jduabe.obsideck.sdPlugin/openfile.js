/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

var openFileSettings = {};
var openFileAction = new Action("dev.jduabe.obsideck.openfile");

openFileAction.onWillAppear((event) => {
	$SD.getSettings(event.context);
});

openFileAction.onDidReceiveSettings(({ payload }) => {
	openFileSettings = payload.settings;
});

openFileAction.onKeyUp(({ context }) => {
	const apiKey = openFileSettings.apiKey;
	const url = openFileSettings.url;
	const filePath = openFileSettings.filePath;

	fetch(`${url}/open/${filePath}?newLeaf=true`, {
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
