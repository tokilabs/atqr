// eslint-disable-next-line @typescript-eslint/no-unused-vars
function challengeSuggestion(btn: Node, bool: boolean) {
  const catchDiv = (btn: Node): HTMLElement => {
    if ((btn as Element).tagName == 'DIV') {
      return btn as HTMLElement;
    } else {
      return catchDiv(btn.parentNode);
    }
  };

  const scrollToForm = (form: HTMLElement) => {
    form.click();
    const position = form.getBoundingClientRect().y;
    window.scroll({
      top: position,
      behavior: 'smooth',
    });
  };

  const div = catchDiv(btn);
  const text = div.querySelector('p').innerText;

  if (bool) {
    const li = document.getElementById('buttonSelectChallengeYourselfForm');
    scrollToForm(li);
    const input =
      document.forms['formChallengeYourself']['challengeYourselfDescription'];
    input.value = text;
  } else {
    const li = document.getElementById('buttonSelectChallengeSomeoneForm');
    scrollToForm(li);
    const input =
      document.forms['formChallengeSomeone']['challengeSomeoneDescription'];
    input.value = text;
  }
}
