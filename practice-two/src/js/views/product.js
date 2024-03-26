import icon from '../../assets/images/icon.svg';
import {
  isNotEmptyField,
  hasMinLength,
  isValidSKU,
  isNumber,
  isInteger,
  isPositiveNumber,
  renderErrorMessages,
  validateForm
} from '../helpers/validateForm';
import generateFormProductHtml from './generateFormProductHtml';
import getDataForm from '../utils/getDataForm';

export default class ProductView {
  constructor() {
    this.mainContent = document.querySelector('.main-content');
  }

  displayProducts(products) {
    const mainContent = document.getElementById('product-list');
    mainContent.innerHTML = '';

    let listItemHTML = '<ul class="table-header">';
    products?.map(products => {
      const {
        id,
        name,
        category,
        sku,
        quantity,
        cost,
        price,
        status
      } = products;
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
            <button data-product-id="${id}" class="btn-edit-product">Edit</button>
            <button data-product-id="${id}" class="btn-delete-product">Delete</button>
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
          <label class="label-selection">Status</label>
          <select id="select-status" data-button-filter=true class="btn select-filter">
            <option selected value="">None</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <div class="flex">
          <label class="label-selection"  >Category</label>
          <select id="select-category" data-button-filter=true class="btn select-filter">
            <option selected value="">None</option>
            <option value="Skin care">Skin care</option>
            <option value="Face care">Face care</option>
            <option value="Lip care">Lips care</option>
          </select>
        </div>
      </div>
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
    `;

    mainContent.innerHTML += tableRowHeaderHTML;
  }

  displayProductForm(product = {}) {
    this.mainContent.innerHTML += generateFormProductHtml(product);
  }

  bindSearchProducts(handleSearchProductByKeyword) {
    const mainContent = document.querySelector('.main-content');

    mainContent.addEventListener('keydown', async (event) => {
      if (!event.target.classList.contains('input-search')) return;

      if (event.key !== 'Enter') return;

      const searchValue = event.target.value.toLowerCase();
      const searchedProducts = await handleSearchProductByKeyword({ name: searchValue });
      this.displayProducts(searchedProducts);
    })
  }

  bindFilterProductElement(handleFilterProducts) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.dataset.buttonFilter) return;

      const activeValue = document.getElementById('select-status').value === 'Active' ? true : false;
      const categoryValue = document.getElementById('select-category').value;

      const filterValues = {};

      if (activeValue) filterValues.status = activeValue;
      if (categoryValue) filterValues.category = categoryValue;

      handleFilterProducts(filterValues);
    })
  }

  bindSortProduct(handleSortProduct) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.dataset.sortLabel) return;
      const targetSiblings = Array.from(target.parentNode.children);
      targetSiblings.filter(sibling => sibling !== target).map(sibling => {
        sibling.classList.remove('arrow-up');
        sibling.classList.remove('arrow-down');
      })

      const isArrowDown = target.classList.contains('arrow-down');
      const isArrowUp = target.classList.contains('arrow-up');

      if (!isArrowDown && !isArrowUp) {
        target.classList.add('arrow-down');
        handleSortProduct(target.dataset.field, 'desc');
      } else if (isArrowDown) {
        target.classList.remove('arrow-down');
        target.classList.add('arrow-up');
        handleSortProduct(target.dataset.field, 'asc');
      } else if (isArrowUp) {
        target.classList.remove('arrow-up');
        handleSortProduct(target.dataset.field, '');
      }
    })
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
      if(target.id === 'toggle-form') {
        handleShowAddForm();
      }
    });
  }

  bindToggleEditForm(handleShowEditForm) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', async (event) => {
      const target = event.target;
      if(target.classList.contains('btn-edit-product')) {
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

      const formElement = document.querySelector('.add-product-container');
      const nameInputElement = formElement.querySelector('[data-field-name="Name"]');
      const categoryInputElement = formElement.querySelector('[data-field-name="category"]');
      const statusInputElement = formElement.querySelector('[data-field-name="status"]');
      const skuInputElement = formElement.querySelector('[data-field-name="SKU"]')
      const quantityInputElement = formElement.querySelector('[data-field-name="Quantity"]');
      const priceInputElement = formElement.querySelector('[data-field-name="Price"]');
      const costInputElement = formElement.querySelector('[data-field-name="Cost"]');

      const formFields = [
        {
          field: 'Name',
          value: nameInputElement.value,
          validators: [
            isNotEmptyField,
            hasMinLength
          ]
        },
        {
          field: 'SKU',
          value: skuInputElement.value,
          validators: [
            isNotEmptyField,
            isValidSKU
          ]
        },
        {
          field: 'Quantity',
          value: quantityInputElement.value,
          validators: [
            isNotEmptyField,
            isInteger,
            isPositiveNumber
          ]
        },
        {
          field: 'Price',
          value: priceInputElement.value,
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber
          ]
        },
        {
          field: 'Cost',
          value: costInputElement.value,
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber
          ]
        }
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
        quantity: quantityInputElement.value,
        price: priceInputElement.value,
        cost: costInputElement.value,
        status: statusInputElement.value
      }

      handleAddProduct(product);
    })
  }

  bindEditProduct(handleEditProduct) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (target.id !== 'btn-edit-product') return;

      const formElement = document.querySelector('.add-product-container');
      const productId = target.dataset.productId;
      const nameInputElement = formElement.querySelector('[data-field-name="Name"]');
      const categoryInputElement = formElement.querySelector('[data-field-name="category"]');
      const statusInputElement = formElement.querySelector('[data-field-name="status"]');
      const skuInputElement = formElement.querySelector('[data-field-name="SKU"]')
      const quantityInputElement = formElement.querySelector('[data-field-name="Quantity"]');
      const priceInputElement = formElement.querySelector('[data-field-name="Price"]');
      const costInputElement = formElement.querySelector('[data-field-name="Cost"]');

      const formFields = [
        {
          field: 'Name',
          value: nameInputElement.value,
          validators: [
            isNotEmptyField,
            hasMinLength
          ]
        },
        {
          field: 'SKU',
          value: skuInputElement.value,
          validators: [
            isNotEmptyField,
            isValidSKU
          ]
        },
        {
          field: 'Quantity',
          value: quantityInputElement.value,
          validators: [
            isNotEmptyField,
            isInteger,
            isPositiveNumber
          ]
        },
        {
          field: 'Price',
          value: priceInputElement.value,
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber
          ]
        },
        {
          field: 'Cost',
          value: costInputElement.value,
          validators: [
            isNotEmptyField,
            isNumber,
            isPositiveNumber
          ]
        }
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
        status: statusInputElement.value === 'active' ? true : false
      }
      handleEditProduct(productId, product);
    })
  }

  confirmDeleteModal(handleDeleteProduct, id) {
    const modalDeleteContainer = document.querySelector('.modal-delete-container');
    const btnCancel = document.querySelector('.btn-cancel');
    const btnDelete = document.querySelector('.btn-delete');
    modalDeleteContainer.classList.toggle('hidden');

    btnCancel.addEventListener('click', () => {
      modalDeleteContainer.classList.toggle('hidden');
    })

    btnDelete.addEventListener('click', () => {
      modalDeleteContainer.classList.toggle('hidden');
      handleDeleteProduct(id);
    })
  }

  bindToggleDelete(handleDeleteProduct) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('btn-delete-product')) {
        this.confirmDeleteModal(handleDeleteProduct, target.dataset.productId);
      };
    });
  }
}
