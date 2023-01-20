function challengeSuggestion(btn: Node) {
  const fatherBtn = btn.parentNode.parentNode.parentNode;
  const text = fatherBtn.querySelector('p').innerText;
  if (btn.textContent == 'Se desafie!') {
    const li = document.getElementById('yourself');
    li.click();
    scrollToId(li);
    const input =
      document.forms['formChallengeYourself']['challengeYourselfDescription'];
    input.value = text;
  } else {
    const li = document.getElementById('someone');
    li.click();
    scrollToId(li);
    const input =
      document.forms['formChallengeSomeone']['challengeSomeoneDescription'];
    input.value = text;
  }
}

function scrollToId(form: HTMLElement) {
  const position = form.getBoundingClientRect().y;
  window.scroll({
    top: position,
    behavior: 'smooth',
  });
}

module.exports = { challengeSuggestion, scrollToId };
