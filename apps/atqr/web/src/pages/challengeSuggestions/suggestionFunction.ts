function challengeSuggestionYourself(btn: Node) {
  const fatherBtn = btn.parentNode.parentNode.parentNode;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const text = fatherBtn.querySelector('p').innerText;
  // TODO: Get actual form name @albnunes, you should be the one to tackle this problem
  // const challengeForm = document.forms.insertNameForm;
  // challengeForm.elements.insertNameInput.value = text;
}

// Question: Is this function conceptually different from the previous? Can they be refactored into one function?
function challengeSuggestionSomeone(btn: Node) {
  const fatherBtn = btn.parentNode.parentNode.parentNode;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const text = fatherBtn.querySelector('p').innerText;
  // const challengeForm = document.forms.insertNameForm;
  // challengeForm.elements.insertNameInput.value = text;
}

module.exports = { challengeSuggestionYourself, challengeSuggestionSomeone };
