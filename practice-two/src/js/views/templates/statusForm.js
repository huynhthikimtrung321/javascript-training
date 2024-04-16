import { getTagTemplate } from './getTagTemplate';
import { LABELS } from '../../constants/labels';

const {
  BEST_SELLER,
  POOR_SELLER,
  ON_SALE,
  NEW_ARRIVAL,
  LOW_STOCK,
} = LABELS;

export const getSelectStatusFormTemplate = status => {
  const selectStatusOptionAttributes = {
    [BEST_SELLER]: {},
    [POOR_SELLER]: {},
    [ON_SALE]: {},
    [NEW_ARRIVAL]: {},
    [LOW_STOCK]: {},
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
