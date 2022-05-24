function suggestionChallengeYourself(btn) {
  let fatherBtn = btn.parentNode.parentNode.parentNode;
  let text = fatherBtn.querySelector("p").innerText;

  let challengeForm = document.forms.inserirnomedoformulárioaqui;
  challengeForm.elements.inserirnomedoinputaqui.value = text;
}

function suggestionChallengeSomeone(btn) {
  let fatherBtn = btn.parentNode.parentNode.parentNode;
  let text = fatherBtn.querySelector("p").innerText;

  let challengeForm = document.forms.inserirnomedoformulárioaqui;
  challengeForm.elements.inserirnomedoinputaqui.value = text;
}
