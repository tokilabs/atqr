//pegat todos os elementos com atributo data-template 
//
//substituir as variaveis no innerhtml
export function updateUI(data, htmlElement: string) {
    console.log('new result: ', data);
    const fields = document.querySelectorAll(`[${htmlElement}]`);
     fields.forEach((field) => {
      const path = (field as HTMLElement).dataset.field.split('.');
      let value = data;
      path.forEach((key) => {
        value = data[key];
      });
      field.innerHTML = value;
    });
  }
  