import icon from '../../assets/images/icon.svg';
import {
  isNotEmptyField,
  isAllowedString,
  hasMinLength,
  isGreaterOrEqual,
  isLesserOrEqual,
  isValidSKU,
  isNumber,
  isInteger,
  isPositiveNumber,
  renderErrorMessages,
  validateForm,
} from '../helpers/validateForm';
import { toggleSpinner } from './loading/renderSpinner';
import productFormTemplate from './templates/getFormProductHtml';
import { getSelectStatusTemplate } from './templates/getSelectStatusTemplate';
import { getSelectCategoryTemplate } from './templates/getSelectCategoryTemplate';
import { getTableHeaderTemplate } from './templates/getTableHeaderTemplate';

export default class ProductView {
  constructor() {
    this.mainContent = document.querySelector('.main-content');
  }

  displaySpinner = () => toggleSpinner(true);

  removeSpinner = () => toggleSpinner(false);

  displayProducts(products, isLoading) {
    const mainContent = document.getElementById('product-list');
    mainContent.innerHTML = '';

    let listItemHTML = '<ul class="table-header">';

    if (isLoading) {
      listItemHTML += '<span class="spinner"></span>';
      listItemHTML += '</ul>';
    } else if (!products) {
      listItemHTML +=
        '<p class="text-large text-center">No products at this moment.</p>';
      listItemHTML += '</ul>';
    } else {
      products.map(products => {
        const { id, name, category, sku, quantity, cost, price, status } =
          products;
        const statuses = {
          'Best-seller': 'best-seller-label',
          'Poor seller': 'poor-seller-label',
          'On sale': 'on-sale-label',
          'New arrival': 'new-arrival-label',
          'Low stock': 'low-stock-label',
        };
        const productRowElement = `
				<li class="product-row product-item">
					<h2 class="text-responsive">${name}</h2>
					<p class="text-responsive">${category}</p>
					<p class="text-responsive">${sku}</p>
					<p class="text-responsive">${quantity}</p>
					<p class="text-responsive">${cost}</p>
					<p class="text-responsive">${price}</p>
					<p class="text-responsive label ${statuses[status]}">${status}</p>
					<div class="btn-actions-group">
						<button class="btn-action btn-edit-product" data-product-id="${id}">
							<svg width="20" height="20" fill="blue" viewBox="0 0 24 24">
								<use
									xlink:href="${icon}#pen-icon"
								></use>
							</svg>
						</button>
						<button class="btn-action btn-delete-product" data-product-id="${id}">
							<svg width="20 " height="20" fill="red" viewBox="0 0 41.336 41.336">
								<use
									xlink:href="${icon}#trash-can"
								></use>
							</svg>
						</button>
					</div>
				</li>
			`;

        listItemHTML += productRowElement;
      });
      listItemHTML += '</ul>';
    }

    mainContent.innerHTML += listItemHTML;
  }

  displayHeader() {
    this.mainContent.innerHTML = '';

    const selectStatusOptionsTemplate = getSelectStatusTemplate();
    const selectCategoryOptionsTemplate = getSelectCategoryTemplate();
    const tableHeaderTemplate = getTableHeaderTemplate();

    const tableRowHeaderHTML = `
			<div class="flex-space-between">
				<svg class="icon-search">
					<use
						xlink:href="${icon}#icon-search"
					></use>
				</svg>
				<input type="text" class="input-search" placeholder="Search product">
				<div class="button-filter-group">
					<div class="select-filter-wrapper flex">
						<select id="select-status" data-button-filter=true class="btn select-filter">
							${selectStatusOptionsTemplate}
						</select>
					</div>
					<div class="select-filter-wrapper flex">
						<select id="select-category" data-button-filter=true class="btn select-filter">
							${selectCategoryOptionsTemplate}
						</select>
					</div>
					<button class="btn-reset">Reset</button>
				</div>
				<button id="toggle-form" class="button-add-product">Add new product</button>
			</div>
			<div class="table-container">
				<div class="product-row product-header text-large">
          ${tableHeaderTemplate}
				<div>Actions</div>
				</div>
				<div id="product-list" class="product-items"></div>
			</div>
		`;

    this.mainContent.innerHTML += tableRowHeaderHTML;
  }

  displayProductForm(product = {}) {
    this.mainContent.innerHTML += productFormTemplate(product);
  }

  bindSearchProducts(handleSearchProductByKeyword) {
    this.mainContent.addEventListener('keydown', async event => {
      if (!event.target.classList.contains('input-search')) return;
      if (event.key !== 'Enter') return;
      const searchValue = event.target.value.toLowerCase();
      const searchedProducts = await handleSearchProductByKeyword({
        name: searchValue,
      });
      this.displayProducts(searchedProducts);
    });
  }

  bindFilterProductElement(renderProducts) {
    const mainContent = document.querySelector('.main-content');
    let filterParams = {};

    mainContent.addEventListener('keyup', async event => {
      if (!event.target.classList.contains('input-search')) return;
      if (event.key !== 'Enter') return;

      const searchValue = event.target.value.toLowerCase();
      filterParams.name = searchValue;
      renderProducts(filterParams);
    });

    mainContent.addEventListener('change', async event => {
      if (!event.target.dataset.buttonFilter) return;
      const statusValue = document.getElementById('select-status').value;
      const categoryValue = document.getElementById('select-category').value;
      filterParams.status = statusValue;
      filterParams.category = categoryValue;
      renderProducts(filterParams);
    });

    mainContent.addEventListener('click', async event => {
      if (!event.target.classList.contains('btn-reset')) return;

      filterParams = {};
      this.displayHeader();
      renderProducts({});
    });

    this.mainContent.addEventListener('click', event => {
      const target = event.target;
      if (!target.dataset.sortLabel) return;
      const targetField = target.dataset.field;
      const targetSiblings = Array.from(target.parentNode.children);
      targetSiblings
        .filter(sibling => sibling !== target)
        .map(sibling => {
          sibling.classList.remove('arrow-up');
          sibling.classList.remove('arrow-down');
        });

      const isArrowDown = target.classList.contains('arrow-down');
      const isArrowUp = target.classList.contains('arrow-up');

      if (!isArrowDown && !isArrowUp) {
        target.classList.add('arrow-down');
        filterParams.sortBy = targetField.toLowerCase();
        filterParams.order = 'desc';
        renderProducts(filterParams);
      } else if (isArrowDown) {
        target.classList.remove('arrow-down');
        target.classList.add('arrow-up');
        filterParams.sortBy = targetField.toLowerCase();
        filterParams.order = 'asc';
        renderProducts(filterParams);
      } else if (isArrowUp) {
        target.classList.remove('arrow-up');
        delete filterParams.sortBy;
        delete filterParams.order;
        renderProducts(filterParams);
      }
    });
  }

  bindSortProduct(handleSortProducts) {
    this.mainContent.addEventListener('click', event => {
      const target = event.target;
      if (!target.dataset.sortLabel) return;
      const targetField = target.dataset.field;
      const targetSiblings = Array.from(target.parentNode.children);
      targetSiblings
        .filter(sibling => sibling !== target)
        .map(sibling => {
          sibling.classList.remove('arrow-up');
          sibling.classList.remove('arrow-down');
        });

      const isArrowDown = target.classList.contains('arrow-down');
      const isArrowUp = target.classList.contains('arrow-up');

      if (!isArrowDown && !isArrowUp) {
        target.classList.add('arrow-down');
        handleSortProducts({
          sortBy: targetField.toLowerCase(),
          order: 'desc',
        });
      } else if (isArrowDown) {
        target.classList.remove('arrow-down');
        target.classList.add('arrow-up');
        handleSortProducts({
          sortBy: targetField.toLowerCase(),
          order: 'asc',
        });
      } else if (isArrowUp) {
        target.classList.remove('arrow-up');
        handleSortProducts({});
      }
    });
  }

  bindRemoveModal() {
    this.mainContent.addEventListener('mousedown', event => {
      const target = event.target;
      if (target.classList.contains('modal-overlay')) {
        target.remove();
      }
    });
  }

  bindProductAction(handleAddProduct, handleEditProduct) {
    this.mainContent.addEventListener('click', event => {
      const target = event.target;
      if (target.id !== 'btn-submit-product') return;

      const formElement = document.querySelector('.form-container');
      const formData = new FormData(formElement);
      const productId = target.dataset.productId;
      const formFields = [
        {
          field: 'name',
          value: formData.get('name'),
          validators: [isNotEmptyField, isAllowedString, hasMinLength],
        },
        {
          field: 'sku',
          value: formData.get('sku'),
          validators: [isNotEmptyField, isValidSKU],
        },
        {
          field: 'quantity',
          value: formData.get('quantity'),
          validators: [isNotEmptyField, isInteger, isPositiveNumber],
        },
        {
          field: 'price',
          value: formData.get('price'),
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber,
            () =>
              isGreaterOrEqual(formData.get('price'), {
                value: formData.get('cost'),
                field: 'Cost',
              }),
          ],
        },
        {
          field: 'cost',
          value: formData.get('cost'),
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber,
            () =>
              isLesserOrEqual(formData.get('cost'), {
                value: formData.get('price'),
                field: 'Price',
              }),
          ],
        },
      ];

      const formError = validateForm(formFields);
      for (let key in formError) {
        renderErrorMessages(formElement, {});
        if (formError[key] !== '') {
          return renderErrorMessages(formElement, formError);
        }
      }

      if(productId) {
        handleEditProduct(productId, formData);
      } else {
        handleAddProduct(formData);
      }
    });
  }

  bindToggleAddForm(handleShowAddForm) {
    this.mainContent.addEventListener('click', event => {
      const target = event.target;
      if (target.id === 'toggle-form') {
        handleShowAddForm();
      }
    });
  }

  bindToggleEditForm(handleShowEditForm) {
    this.mainContent.addEventListener('click', async event => {
      let target = event.target;
      if (target.closest('.btn-edit-product')) {
        target = target.closest('.btn-edit-product');
        const id = target.dataset.productId;
        await handleShowEditForm(id);
      }
    });
  }

  removeModal() {
    document.querySelector('.modal-overlay').remove();
  }

  bindRemoveModalDelete() {
    const modalDelete = document.querySelector('.modal-delete-container');
    modalDelete.addEventListener('mousedown', event => {
      if (event.target === modalDelete) {
        modalDelete.classList.add('hidden');
      }
    });
  }

  bindDeleteProduct(handleDeleteProduct) {
    const mainContent = document.querySelector('.main-content');
    const modalDeleteContainer = document.querySelector(
      '.modal-delete-container'
    );

    const btnDelete = document.querySelector('.btn-delete');
    const btnCancel = document.querySelector('.btn-cancel');
    let productId;

    mainContent.addEventListener('click', event => {
      const target = event.target.closest('.btn-delete-product');
      if (target) {
        productId = target.dataset.productId;
        modalDeleteContainer.classList.toggle('hidden');
      }
    });

    btnCancel.addEventListener('click', () => {
      modalDeleteContainer.classList.toggle('hidden');
    })

    btnDelete.addEventListener('click', () => {
      modalDeleteContainer.classList.toggle('hidden');
      handleDeleteProduct(productId);
    });
  }
}
