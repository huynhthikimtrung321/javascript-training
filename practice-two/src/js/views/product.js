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
  isGreaterOrEqual,
  isLesserOrEqual,
  renderErrorMessages,
  validateForm,
} from '../helpers/validateForm';
import productFormTemplate from './generateFormProductHtml';

export default class ProductView {
  constructor() {
    this.mainContent = document.querySelector('.main-content');
  }

  displayProducts(products) {
    const mainContent = document.getElementById('product-list');
    mainContent.innerHTML = '';

    let listItemHTML = '<ul class="table-header">';

    products
      ?.sort((a, b) => parseInt(b.id) - parseInt(a.id))
      .map((products) => {
        const { id, name, category, sku, quantity, cost, price, status } =
          products;
        const statuses = {
          'Best-seller': 'best-seller-label',
          'Low stock': 'low-stock-label',
          'Poor seller': 'poor-seller-label',
          'On sale': 'on-sale-label',
          'New arrival': 'new-arrival-label',
          'Low stock': 'low-stock-label',
        };
        const productRowElement = `
        <li class="product-row product-item">
          <h2>${name}</h2>
          <p>${category}</p>
          <p>${sku}</p>
          <p>${quantity}</p>
          <p>${cost}</p>
          <p>${price}</p>
          <p class="label ${statuses[status]}">${status}</p>
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

    mainContent.innerHTML += listItemHTML;
  }

  displayHeader() {
    this.mainContent.innerHTML = '';

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
              <option selected disabled value="">Status</option>
              <option value="">All</option>
              <option value="Best-seller">Best-seller</option>
              <option value="Poor seller">Poor seller</option>
              <option value="On sale">On sale</option>
              <option value="New arrival">New arrival</option>
              <option value="Low stock">Low stock</option>
            </select>
          </div>
          <div class="select-filter-wrapper flex">
            <select id="select-category" data-button-filter=true class="btn select-filter">
              <option selected disabled value="">Category</option>
              <option value="">All</option>
              <option value="Skin care">Skin care</option>
              <option value="Face care">Face care</option>
              <option value="Lips care">Lips care</option>
            </select>
          </div>
          <button class="btn-reset">Reset</button>
        </div>
        <button id="toggle-form" class="button-add-product">Add new product</button>
      </div>
      <div class="table-container">
        <div class="product-row product-header text-large">
          <div class="col-product" data-field="name" data-sort-label=true>Product name</div>
          <div class="col-product" data-field="category" data-sort-label=true>Category</div>
          <div class="col-product" data-field="sku" data-sort-label=true>SKU</div>
          <div class="col-product" data-field="quantity" data-sort-label=true>Quantity</div>
          <div class="col-product" data-field="cost" data-sort-label=true>Cost</div>
          <div class="col-product" data-field="price" data-sort-label=true>Price</div>
          <div class="col-product" data-field="status" data-sort-label=true>Status</div>
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
    this.mainContent.addEventListener('keydown', async (event) => {
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

    mainContent.addEventListener('keyup', async (event) => {
      if (!event.target.classList.contains('input-search')) return;
      if (event.key !== 'Enter') return;

      const searchValue = event.target.value.toLowerCase();
      filterParams.name = searchValue;
      renderProducts(filterParams);
    });

    mainContent.addEventListener('change', async (event) => {
      if (!event.target.dataset.buttonFilter) return;
      const statusValue = document.getElementById('select-status').value;
      const categoryValue = document.getElementById('select-category').value;
      filterParams.status = statusValue;
      filterParams.category = categoryValue;
      renderProducts(filterParams);
    });

    mainContent.addEventListener('click', async (event) => {
      if (!event.target.classList.contains('btn-reset')) return;

      this.displayHeader();
      renderProducts({});
    });
  }

  bindSortProduct(handleSortProducts) {
    this.mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.dataset.sortLabel) return;
      const targetSiblings = Array.from(target.parentNode.children);
      targetSiblings
        .filter((sibling) => sibling !== target)
        .map((sibling) => {
          sibling.classList.remove('arrow-up');
          sibling.classList.remove('arrow-down');
        });

      const isArrowDown = target.classList.contains('arrow-down');
      const isArrowUp = target.classList.contains('arrow-up');

      if (!isArrowDown && !isArrowUp) {
        target.classList.add('arrow-down');
        handleSortProducts(target.dataset.field, 'desc');
      } else if (isArrowDown) {
        target.classList.remove('arrow-down');
        target.classList.add('arrow-up');
        handleSortProducts(target.dataset.field, 'asc');
      } else if (isArrowUp) {
        target.classList.remove('arrow-up');
        handleSortProducts(target.dataset.field, '');
      }
    });
  }

  bindRemoveModal() {
    this.mainContent.addEventListener('mousedown', (event) => {
      const target = event.target;
      if (target.classList.contains('modal-overlay')) {
        target.remove();
      }
    });
  }

  bindToggleAddForm(handleShowAddForm) {
    this.mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (target.id === 'toggle-form') {
        handleShowAddForm();
      }
    });
  }

  bindToggleEditForm(handleShowEditForm) {
    this.mainContent.addEventListener('click', async (event) => {
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

  bindAddProduct(handleAddProduct) {
    this.mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (target.id !== 'btn-add-product') return;
      const formElement = document.querySelector('.form-container');
      const nameInputElement = formElement.querySelector(
        '[data-field-name="Name"]'
      );
      const categoryInputElement = formElement.querySelector(
        '[data-field-name="category"]'
      );
      const statusInputElement = formElement.querySelector(
        '[data-field-name="status"]'
      );
      const skuInputElement = formElement.querySelector(
        '[data-field-name="SKU"]'
      );
      const quantityInputElement = formElement.querySelector(
        '[data-field-name="Quantity"]'
      );
      const priceInputElement = formElement.querySelector(
        '[data-field-name="Price"]'
      );
      const costInputElement = formElement.querySelector(
        '[data-field-name="Cost"]'
      );

      const formFields = [
        {
          field: 'Name',
          value: nameInputElement.value,
          validators: [isNotEmptyField, isAllowedString, hasMinLength],
        },
        {
          field: 'SKU',
          value: skuInputElement.value,
          validators: [isNotEmptyField, isValidSKU],
        },
        {
          field: 'Quantity',
          value: quantityInputElement.value,
          validators: [isNotEmptyField, isInteger, isPositiveNumber],
        },
        {
          field: 'Price',
          value: priceInputElement.value,
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber,
            () =>
              isGreaterOrEqual(priceInputElement.value, {
                value: costInputElement.value,
                field: 'Cost',
              }),
          ],
        },
        {
          field: 'Cost',
          value: costInputElement.value,
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber,
            () =>
              isLesserOrEqual(costInputElement.value, {
                value: priceInputElement.value,
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

      const product = {
        name: nameInputElement.value,
        category: categoryInputElement.value,
        sku: skuInputElement.value,
        quantity: parseInt(quantityInputElement.value),
        price: parseFloat(priceInputElement.value),
        cost: parseFloat(costInputElement.value),
        status: statusInputElement.value,
      };

      handleAddProduct(product);
    });
  }

  bindEditProduct(handleEditProduct) {
    this.mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (target.id !== 'btn-edit-product') return;

      const formElement = document.querySelector('.form-container');
      const productId = target.dataset.productId;
      const nameInputElement = formElement.querySelector(
        '[data-field-name="Name"]'
      );
      const categoryInputElement = formElement.querySelector(
        '[data-field-name="category"]'
      );
      const statusInputElement = formElement.querySelector(
        '[data-field-name="status"]'
      );
      const skuInputElement = formElement.querySelector(
        '[data-field-name="SKU"]'
      );
      const quantityInputElement = formElement.querySelector(
        '[data-field-name="Quantity"]'
      );
      const priceInputElement = formElement.querySelector(
        '[data-field-name="Price"]'
      );
      const costInputElement = formElement.querySelector(
        '[data-field-name="Cost"]'
      );

      const formFields = [
        {
          field: 'Name',
          value: nameInputElement.value,
          validators: [isNotEmptyField, isAllowedString, hasMinLength],
        },
        {
          field: 'SKU',
          value: skuInputElement.value,
          validators: [isNotEmptyField, isValidSKU],
        },
        {
          field: 'Quantity',
          value: quantityInputElement.value,
          validators: [isNotEmptyField, isInteger, isPositiveNumber],
        },
        {
          field: 'Price',
          value: priceInputElement.value,
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber,
            () =>
              isGreaterOrEqual(priceInputElement.value, {
                value: costInputElement.value,
                field: 'Cost',
              }),
          ],
        },
        {
          field: 'Cost',
          value: costInputElement.value,
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber,
            () =>
              isLesserOrEqual(costInputElement.value, {
                value: priceInputElement.value,
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

      const product = {
        id: productId,
        name: nameInputElement.value,
        category: categoryInputElement.value,
        sku: skuInputElement.value,
        quantity: parseInt(quantityInputElement.value),
        price: parseFloat(priceInputElement.value),
        cost: parseFloat(costInputElement.value),
        status: statusInputElement.value,
      };

      handleEditProduct(productId, product);
    });
  }

  bindRemoveModalDelete() {
    const modalDelete = document.querySelector('.modal-delete-container');
    modalDelete.addEventListener('mousedown', (event) => {
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
    let productId;

    mainContent.addEventListener('click', (event) => {
      const target = event.target.closest('.btn-delete-product');
      if (target) {
        productId = target.dataset.productId;
        modalDeleteContainer.classList.toggle('hidden');
      }
    });

    btnDelete.addEventListener('click', () => {
      modalDeleteContainer.classList.toggle('hidden');
      handleDeleteProduct(productId);
    });
  }
}
