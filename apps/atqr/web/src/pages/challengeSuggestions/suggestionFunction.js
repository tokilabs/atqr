function challengeSuggestionYourself(btn) {
  let fatherBtn = btn.parentNode.parentNode.parentNode;
  let text = fatherBtn.querySelector("p").innerText;
  let challengeForm = document.forms.insertNameForm;
  challengeForm.elements.insertNameInput.value = text;
}
function challengeSuggestionSomeone(btn) {
  let fatherBtn = btn.parentNode.parentNode.parentNode;
  let text = fatherBtn.querySelector("p").innerText;
  let challengeForm = document.forms.insertNameForm;
  challengeForm.elements.insertNameInput.value = text;
}

module.exports= {challengeSuggestionYourself ,challengeSuggestionSomeone}
