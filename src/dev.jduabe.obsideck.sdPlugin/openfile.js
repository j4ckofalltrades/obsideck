/// <reference path="libs/js/action.js" />
/// <reference path="libs/js/stream-deck.js" />

 
let openFileAction = new Action("dev.jduabe.obsideck.openfile")

openFileAction.onKeyUp(({ context, payload }) => {
  const apiKey = payload.settings.apiKey
  const url = payload.settings.url
  const filePath = payload.settings.filePath

  fetch(`${url}/open/${filePath}?newLeaf=true`, {
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
