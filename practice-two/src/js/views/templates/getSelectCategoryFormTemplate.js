import { getTagTemplate } from './getTagTemplate';

export const getSelectCategoryFormTemplate = category => {
  const selectCategoryOptionAttributes = {
    'Skin care': {},
    'Face care': {},
    'Lips care': {},
  };
  if (category) {
    selectCategoryOptionAttributes[category].selected = true;
  }

  let selectCategoryFormTemplate = ``;
  for (const key in selectCategoryOptionAttributes) {
    const selectOptionHTML = getTagTemplate({
      tagName: 'option',
      textContent: key,
      attributes: selectCategoryOptionAttributes[key],
    });
    selectCategoryFormTemplate += selectOptionHTML;
  }

  return selectCategoryFormTemplate;
};
