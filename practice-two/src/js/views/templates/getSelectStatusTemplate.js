import { getTagTemplate } from './getTagTemplate';

export const getSelectStatusTemplate = () => {
  const selectStatusOptionAttributes = {
    'All status': {
      value: '',
    },
    'Best-seller': {
      value: 'Best-seller',
    },
    'Poor seller': {
      value: 'Poor seller',
    },
    'On sale': {
      value: 'On sale',
    },
    'New arrival': {
      value: 'New arrival',
    },
    'Low stock': {
      value: 'Low stock',
    },
  };
  let selectStatusOptionsTemplate = ``;
  for (const key in selectStatusOptionAttributes) {
    const selectOptionHTML = getTagTemplate({
      tagName: 'option',
      textContent: key,
      attributes: selectStatusOptionAttributes[key],
    });
    selectStatusOptionsTemplate += selectOptionHTML;
  }

  return selectStatusOptionsTemplate;
};
