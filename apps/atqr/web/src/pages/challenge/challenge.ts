import { atqrApi } from './ApiClient';

export const getChallenge = () => {
  const data = atqrApi.challenges.getOne('');
  console.log('this is data :', data);
  return data;
};
//pegat todos os elementos com atributo data-template 
//
//substituir as variaveis no innerhtml
function updateUI(data) {
  console.log('new result: ', data);
  const fields = document.querySelectorAll('[data-field]');
  fields.forEach((field) => {
    const path = (field as any).dataset.field.split('.');
    console.log('path: ', path);
    let value = data;
    path.forEach((key) => {
      value = value[key];
    });
    console.log(
      'Updating field:',
      field,
      `(${field.innerHTML})`,
      'with value:',
      value
    );
    field.innerHTML = value;
  });
}
updateUI(getChallenge());

//nextStepBtn.addEventListener('click', getChallenge);
