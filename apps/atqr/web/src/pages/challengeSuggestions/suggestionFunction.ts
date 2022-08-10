function challengeSuggestionYourself(btn: Node) {
  const fatherBtn = btn.parentNode.parentNode.parentNode;
  const text = fatherBtn.querySelector('p').innerText;
  // const challengeForm = document.forms.insertNameForm; // TODO: Get actual form name
  // challengeForm.elements.insertNameInput.value = text;
}

// Question: Is this function conceptually different from the previous? Can they be refactored into one function?
function challengeSuggestionSomeone(btn: Node) {
  const fatherBtn = btn.parentNode.parentNode.parentNode;
  const text = fatherBtn.querySelector('p').innerText;
  // const challengeForm = document.forms.insertNameForm;
  // challengeForm.elements.insertNameInput.value = text;
}

module.exports = { challengeSuggestionYourself, challengeSuggestionSomeone };
