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

export default class ProductView {
  displayProducts(products) {
    const mainContent = document.getElementById('product-list');
    mainContent.innerHTML = '';

    let listItemHTML = '<ul class="table-header">';
    console.log(products)
    products?.map(products => {
      const {
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
          <h2>
            ${name}
          </h2>
          <p>
            ${category}
          </p>
          <p>
            ${sku}
          </p>
          <p>
            ${quantity}
          </p>
          <p>
            ${cost}
          </p>
          <p>
            ${price}
          </p>
          <p>
            ${status ? 'Active' : 'Inactive'}
          </p>
          <div>
            <button>Edit</button>
            <button>Delete</button>
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

  bindToggleForm() {
    const mainContent = document.querySelector('.main-content');

    const formProductHTML = `
      <div class="modal-overlay hidden">
        <form action="javascript:void(0)" method="post" class="add-product-container">
          <h2 class="add-product-title">Add products</h2>
          <div class="form-group">
            <label for="name">Product Name:</label>
            <input id="name" data-field-name="Name" name="name" placeholder="Enter product name" class="form-input">
            <p class="error-msg" data-field-error="Name"></p>
            </div>
          <div class="form-group">
            <label for="category">Category:</label>
            <select id="category" data-field-name="category" class="form-input">
              <option>Skin care</option>
              <option>Face care</option>
              <option>Lips care</option>
            </select>
          </div>
          <div class="form-group">
            <label for="sku">SKU:</label>
            <input type="text" id="sku" data-field-name="SKU"class="form-input">
            <p class="error-msg" data-field-error="SKU"></p>
          </div>
          <div class="form-group">
            <label for="quantity">Quantity:</label>
            <input id="quantity" data-field-name="Quantity" name="quantity" placeholder="0" class="form-input">
            <p class="error-msg" data-field-error="Quantity"></p>
          </div>
          <div class="form-group">
            <label for="price">Price:</label>
            <input id="price" data-field-name="Price" name="price" placeholder="Enter price" class="form-input">
            <p class="error-msg" data-field-error="Price"></p>
          </div>
          <div class="form-group">
            <label for="cost">Cost:</label>
            <input id="cost" data-field-name="Cost" name="cost" placeholder="Enter cost" class="form-input">
            <p class="error-msg" data-field-error="Cost"></p>
          </div>
          <div class="form-group">
            <label for="status">Status:</label>
            <select id="status" data-field-name="status" class="form-input">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Add Product" class="add-product-submit" id="btn-add-product">
          </div>
        </form>
      </div>
    `
    mainContent.innerHTML += formProductHTML;

    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.addEventListener('mousedown', (event) => {
      if (event.target === modalOverlay) {
        modalOverlay.classList.toggle('hidden');
      }
    });

    mainContent.addEventListener('click', (e) => {
      const target = e.target;
      if (e.target.id === 'toggle-form') {
        modalOverlay.classList.toggle('hidden');
      }
    });
  }

  removeModal() {
    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.classList.toggle('hidden');
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

}
