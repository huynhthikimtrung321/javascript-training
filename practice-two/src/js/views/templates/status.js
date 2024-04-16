import { getTagTemplate } from './getTagTemplate';
import { LABELS } from '../../constants/labels';

const {
  BEST_SELLER,
  POOR_SELLER,
  ON_SALE,
  NEW_ARRIVAL,
  LOW_STOCK,
  ALL_STATUS,
} = LABELS;

export const getSelectStatusTemplate = () => {
  const selectStatusOptionAttributes = {
    [ALL_STATUS]: {
      value: '',
    },
    [BEST_SELLER]: {
      value: 'Best-seller',
    },
    [POOR_SELLER]: {
      value: 'Poor seller',
    },
    [ON_SALE]: {
      value: 'On sale',
    },
    [NEW_ARRIVAL]: {
      value: 'New arrival',
    },
    [LOW_STOCK]: {
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
