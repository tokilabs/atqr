/**
 *
 * @param data
 * Object that contains the data to be displayed in the UI
 * @param htmlElement
 * The html element that will be updated
 */
export function updateUI(data: object, htmlElement: string) {
  console.log('new result: ', data);
  const fields = document.querySelectorAll(`[${htmlElement}]`);
  fields.forEach((field) => {
    const path = (field as HTMLElement).dataset.field.split('.');
    let value: string;
    path.forEach((key) => {
      value = data[key];
    });
    field.innerHTML = value;
  });
}
