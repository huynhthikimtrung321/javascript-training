import { getTagTemplate } from './getTagTemplate';

export const getSelectCategoryTemplate = () => {
  const selectCategoryOptionAttributes = {
    'All category': {
      value: '',
    },
    'Skin care': {
      value: 'Skin care',
    },
    'Face care': {
      value: 'Face care',
    },
    'Lips care': {
      value: 'Lips care',
    },
  };
  let selectCategoryOptionsTemplate = ``;
  for (const key in selectCategoryOptionAttributes) {
    const selectOptionHTML = getTagTemplate({
      tagName: 'option',
      textContent: key,
      attributes: selectCategoryOptionAttributes[key],
    });
    selectCategoryOptionsTemplate += selectOptionHTML;
  }

  return selectCategoryOptionsTemplate;
};
