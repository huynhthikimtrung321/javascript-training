import { getTagTemplate } from './getTagTemplate';
import { LABELS } from '../../constants/labels';

const {
  SKIN_CARE,
  FACE_CARE,
  LIPS_CARE,
} = LABELS;

export const getSelectCategoryFormTemplate = category => {
  const selectCategoryOptionAttributes = {
    [SKIN_CARE]: {},
    [FACE_CARE]: {},
    [LIPS_CARE]: {},
  };
  for(key in selectCategoryOptionAttributes) {
    selectStatusOptionAttributes[key].selected = false;
  }
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
