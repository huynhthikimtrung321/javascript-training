import icon from '../../assets/images/icon.svg';

export default class ProductView {
  displayProducts(products) {
    const mainContent = document.getElementById('product-list');
    mainContent.innerHTML = '';

    let listItemHTML = '<ul class="table-header">'
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
      const searchedProducts = await handleSearchProductByKeyword({name: searchValue});
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

      if(activeValue) filterValues.status = activeValue;
      if(categoryValue) filterValues.category = categoryValue;

      handleFilterProducts(filterValues);
    })
  }

  bindSortProduct(handleSortProduct) {
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('click', (event) => {
      const target = event.target;
      if(!target.dataset.sortLabel) return;
      const targetSiblings = Array.from(target.parentNode.children);
      targetSiblings.filter(sibling => sibling !== target).map(sibling => {
        sibling.classList.remove('arrow-up');
        sibling.classList.remove('arrow-down');
      })

      const isArrowDown = target.classList.contains('arrow-down');
      const isArrowUp = target.classList.contains('arrow-up');

      if(!isArrowDown && !isArrowUp) {
        target.classList.add('arrow-down');
        handleSortProduct(target.dataset.field, 'desc');
      } else if(isArrowDown) {
        target.classList.remove('arrow-down');
        target.classList.add('arrow-up');
        handleSortProduct(target.dataset.field, 'asc');
      } else if(isArrowUp) {
        target.classList.remove('arrow-up');
        handleSortProduct(target.dataset.field, '');
      }
    })

  }

  bindToggleForm() {
    const mainContent = document.querySelector('.main-content');

    const modalOverlay = document.querySelector('.modal-overlay');
    modalOverlay.addEventListener('click', (event) => {
      if(event.target === modalOverlay) {
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

}
