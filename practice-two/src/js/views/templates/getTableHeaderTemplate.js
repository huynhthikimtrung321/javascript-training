import { getTagTemplate } from './getTagTemplate';

export const getTableHeaderTemplate = () => {
  const tableHeaderAttributes = {
    'Product name': {
      'data-field': 'name',
      'data-sort-label': true,
    },
    Category: {
      'data-field': 'category',
      'data-sort-label': true,
    },
    SKU: {
      'data-field': 'SKU',
      'data-sort-label': true,
    },
    Quantity: {
      'data-field': 'Quantity',
      'data-sort-label': true,
    },
    Cost: {
      'data-field': 'Cost',
      'data-sort-label': true,
    },
    Price: {
      'data-field': 'price',
      'data-sort-label': true,
    },
    Status: {
      'data-field': 'status',
      'data-sort-label': true,
    },
  };

  let tableHeaderTemplate = ``;
  for (const key in tableHeaderAttributes) {
    const selectOptionHTML = getTagTemplate({
      tagName: 'div',
      textContent: key,
      className: 'text-responsive arrow-down-up',
      attributes: tableHeaderAttributes[key],
    });
    tableHeaderTemplate += selectOptionHTML;
  }

  return tableHeaderTemplate;
};
