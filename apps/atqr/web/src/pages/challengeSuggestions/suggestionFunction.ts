function challengeSuggestionYourself(btn: Node) {
  const fatherBtn = btn.parentNode.parentNode.parentNode;
  const text = fatherBtn.querySelector("p").innerText;
  const challengeForm = document.forms.insertNameForm;
  challengeForm.elements.insertNameInput.value = text;
}
function challengeSuggestionSomeone(btn: Node) {
  const fatherBtn = btn.parentNode.parentNode.parentNode;
  const text = fatherBtn.querySelector("p").innerText;
  const challengeForm = document.forms.insertNameForm;
  challengeForm.elements.insertNameInput.value = text;
}

module.exports= {challengeSuggestionYourself ,challengeSuggestionSomeone}
