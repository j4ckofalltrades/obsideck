/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

var settings = {};
var runCommandAction = new Action("dev.jduabe.obsideck.runcommand");

runCommandAction.onWillAppear((event) => {
	$SD.getSettings(event.context);
});

runCommandAction.onDidReceiveSettings(({ payload }) => {
	settings = payload.settings;
});

runCommandAction.onKeyUp(({ context }) => {
	const apiKey = settings.apiKey;
	const commandId = settings.commandId;
	const url = settings.url;

	fetch(`${url}/commands/${encodeURIComponent(commandId)}/`, {
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
