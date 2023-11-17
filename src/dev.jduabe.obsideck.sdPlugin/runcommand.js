/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

/* eslint-disable no-undef */
let runCommandAction = new Action("dev.jduabe.obsideck.runcommand")

runCommandAction.onKeyUp(({ context, payload }) => {
  const apiKey = payload.settings.apiKey
  const commandId = payload.settings.commandId
  const url = payload.settings.url

  fetch(`${url}/commands/${encodeURIComponent(commandId)}/`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      Authorization: "Bearer " + apiKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        $SD.showOk(context)
      } else {
        $SD.showAlert(context)
      }
    })
    .catch(() => $SD.showAlert(context))
})
