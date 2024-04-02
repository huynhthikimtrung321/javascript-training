export const getTagTemplate = ({
  tagName,
  textContent = '',
  className = '',
  attributes = {},
}) => {
  const optionElement = document.createElement(tagName);
  optionElement.className = className;
  optionElement.textContent = textContent;
  for (const key in attributes) {
    optionElement.setAttribute(key, attributes[key]);
  }

  return optionElement.outerHTML;
};
