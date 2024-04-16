import { getTagTemplate } from './getTagTemplate';
import { LABELS } from '../../constants/labels';

const {
  SKIN_CARE,
  FACE_CARE,
  LIPS_CARE,
  ALL_CATEGORY,
} = LABELS;

export const getSelectCategoryTemplate = () => {
  const selectCategoryOptionAttributes = {
    [ALL_CATEGORY]: {
      value: '',
    },
    [SKIN_CARE]: {
      value: 'Skin care',
    },
    [FACE_CARE]: {
      value: 'Face care',
    },
    [LIPS_CARE]: {
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
