export default function getDataForm(modalElement = document) {
  const product = {};
  const inputElements = modalElement.querySelectorAll('[data-field-name]');
  inputElements.forEach((elem) => {
    product[elem.dataset.fieldName] = elem.value;
  });

  return product;
}
