import icon from '../../assets/images/icon.svg';
import {
  isNotEmptyField,
  hasMinLength,
  isValidSKU,
  isNumber,
  isInteger,
  isPositiveNumber,
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

    const tableRowHeaderHTML = `
      <div class="flex-space-between">
        <svg class="icon-search">
          <use
            xlink:href="${icon}#icon-search"
          ></use>
        </svg>
        <input type="text" class="input-search" placeholder="Search product">
      </div>
      <div class="product-row">
        <div class="text-large product-label">
          Product name
        </div>
        <div class="text-large product-label">Category</div>
        <div class="text-large product-label">SKU</div>
        <div class="text-large product-label">Quantity</div>
        <div class="text-large product-label">Cost</div>
        <div class="text-large product-label">Price</div>
        <div class="text-large product-label">Status</div>
        <div class="text-large product-label">Actions</div>
      </div>
    `;

    let listItemHTML = '<ul class="table-header">';

    products?.map((products) => {
      const { id, name, category, sku, quantity, cost, price, status } =
        products;
      const productRowElement = `
        <li class="product-row">
          <h2>${name}</h2>
          <p>${category}</p>
          <p>${sku}</p>
          <p>${quantity}</p>
          <p>${cost}</p>
          <p> ${price}</p>
          <p>${status ? 'Active' : 'Inactive'}</p>
          <div>
          <button class="btn-action btn-edit-product" data-product-id="${id}">
              <svg width="24" height="24" fill="blue" viewBox="0 0 24 24">
                <use
                  xlink:href="${icon}#pen-icon"
                ></use>
              </svg>
            </button>
            <button class="btn-action btn-delete-product" data-product-id="${id}">
              <svg width="24 " height="24" fill="red" viewBox="0 0 41.336 41.336">
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
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';

    const tableRowHeaderHTML = `
      <div class="flex-space-between">
        <svg class="icon-search">
          <use
            xlink:href="${icon}#icon-search"
          ></use>
        </svg>
        <input type="text" class="input-search" placeholder="Search product">
        <button id="toggle-form" class="button-add-product">Add new product</button>
      </div>
      <div class="button-filter-group">
        <svg class="icon-sort">
          <use
            xlink:href="${icon}#icon-sort"
          ></use>
        </svg>
        <div class="flex">
          <select id="select-status" data-button-filter=true class="btn select-filter">
            <option selected value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div class="flex">
          <select id="select-category" data-button-filter=true class="btn select-filter">
            <option selected value="">Category</option>
            <option value="Skin care">Skin care</option>
            <option value="Face care">Face care</option>
            <option value="Lips care">Lips care</option>
          </select>
        </div>
      </div>
      <div class="table-container">
        <div class="product-row">
          <div class="col-product" data-field="name" data-sort-label=true>Product name</div>
          <div class="col-product" data-field="category" data-sort-label=true>Category</div>
          <div class="col-product" data-field="sku" data-sort-label=true>SKU</div>
          <div class="col-product" data-field="quantity" data-sort-label=true>Quantity</div>
          <div class="col-product" data-field="cost" data-sort-label=true>Cost</div>
          <div class="col-product" data-field="price" data-sort-label=true>Price</div>
          <div class="col-product" data-field="status" data-sort-label=true>Status</div>
          <div>Actions</div>
        </div>
        <div id="product-list"></div>
      </div>
    `;

    mainContent.innerHTML += tableRowHeaderHTML;
  }

  displayProductForm(product = {}) {
    this.mainContent.innerHTML += productFormTemplate(product);
  }

  bindSearchProducts(handleSearchProductByKeyword) {
    const mainContent = document.querySelector('.main-content');

    mainContent.addEventListener('keydown', async (event) => {
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
    mainContent.addEventListener('change', (event) => {
      const filterParams = {};
      const target = event.target;
      if (!target.dataset.buttonFilter) return;
      const statusValue = document.getElementById('select-status').value;
      const categoryValue = document.getElementById('select-category').value;
      if (statusValue) filterParams.status = statusValue === 'Active';
      if (categoryValue) filterParams.category = categoryValue;

      renderProducts(filterParams);
    });
  }

  bindSortProduct(handleSortProducts) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
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
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('mousedown', (event) => {
      const target = event.target;
      if (target.classList.contains('modal-overlay')) {
        target.remove();
      }
    });
  }

  bindToggleAddForm(handleShowAddForm) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (target.id === 'toggle-form') {
        handleShowAddForm();
      }
    });
  }

  bindToggleEditForm(handleShowEditForm) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', async (event) => {
      let target = event.target;
      if (target.closest('.btn-edit-product')) {
        target = target.closest('.btn-edit-product');
        const id = target.dataset.productId;
        await handleShowEditForm(id);
      }
    });
  }

  removeModal() {
    const modalElement = document.querySelector('.modal-overlay');
    modalElement.remove();
  }

  bindAddProduct(handleAddProduct) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
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
          validators: [isNotEmptyField, hasMinLength],
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
          validators: [isNotEmptyField, isNumber, isPositiveNumber],
        },
        {
          field: 'Cost',
          value: costInputElement.value,
          validators: [isNotEmptyField, isNumber, isPositiveNumber],
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
        status: statusInputElement.value === 'Active',
      };

      handleAddProduct(product);
    });
  }

  bindEditProduct(handleEditProduct) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
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
          validators: [isNotEmptyField, hasMinLength],
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
          validators: [isNotEmptyField, isNumber, isPositiveNumber],
        },
        {
          field: 'Cost',
          value: costInputElement.value,
          validators: [isNotEmptyField, isNumber, isPositiveNumber],
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
        quantity: quantityInputElement.value,
        price: priceInputElement.value,
        cost: costInputElement.value,
        status: statusInputElement.value === 'active' ? true : false,
      };

      handleEditProduct(productId, product);
    });
  }

  bindDeleteProduct(handleDeleteProduct) {
    const mainContent = document.querySelector('.main-content');
    const modalDeleteContainer = document.querySelector(
      '.modal-delete-container'
    );
    const btnCancel = document.querySelector('.btn-cancel');
    const btnDelete = document.querySelector('.btn-delete');
    let productId;

    mainContent.addEventListener('click', (event) => {
      const target = event.target.closest('.btn-delete-product');
      if (target) {
        productId = target.dataset.productId;
        modalDeleteContainer.classList.toggle('hidden');
      }
    });

    btnCancel.addEventListener('click', () => {
      modalDeleteContainer.classList.toggle('hidden');
    });

    btnDelete.addEventListener('click', () => {
      modalDeleteContainer.classList.toggle('hidden');
      handleDeleteProduct(productId);
    });
  }
}
