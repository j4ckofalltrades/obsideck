/// <reference path="libs/js/property-inspector.js" />
/// <reference path="libs/js/utils.js" />

 
$PI.onConnected((jsn) => {
  const form = document.querySelector("#property-inspector")
  const {
    actionInfo: {
      payload: { settings },
    },
  } = jsn

  Utils.setFormValue(settings, form)

  form.addEventListener(
    "input",
    Utils.debounce(150, () => {
      const value = Utils.getFormValue(form)
      $PI.setSettings(value)
    }),
  )
})
