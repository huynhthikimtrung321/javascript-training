import { getTagTemplate } from './getTagTemplate';

export const getSelectStatusFormTemplate = status => {
  const selectStatusOptionAttributes = {
    'Best-seller': {},
    'Poor seller': {},
    'On sale': {},
    'New arrival': {},
    'Low stock': {},
  };
  if (status) {
    selectStatusOptionAttributes[status].selected = true;
  }

  let selectStatusFormTemplate = ``;
  for (const key in selectStatusOptionAttributes) {
    const selectOptionHTML = getTagTemplate({
      tagName: 'option',
      textContent: key,
      attributes: selectStatusOptionAttributes[key],
    });
    selectStatusFormTemplate += selectOptionHTML;
  }

  return selectStatusFormTemplate;
};
