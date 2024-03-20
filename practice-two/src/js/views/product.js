import icon from '../../assets/images/icon.svg';

export default class ProductView {
  displayProducts(products) {
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
      </div>
      <div class="button-filter-group">
        <svg class="icon-sort">
          <use
            xlink:href="${icon}#icon-sort"
          ></use>
        </svg>
        <input type="checkbox" data-button-filter=true id="select-active" class="btn">Active</button>
        <select id="select-category" class="btn">

          <option data-button-filter=true >Skin care</option>
          <option data-button-filter=true >Face care</option>
          <option data-button-filter=true >Lips care</option>
        </select>
        <select id="select-quantity" data-button-filter=true class="btn">
          <option data-button-filter=true value="asc">Low to High</option>
          <option data-button-filter=true value="desc">High to Low</option>
        </select>
        <select id="select-price" data-button-filter=true class="btn">
          <option data-button-filter=true value="asc">Low to High</option>
          <option data-button-filter=true value="desc">High to Low</option>
        </select>
      </div>
      <div class="product-row">
        <div class="col-product-name">
          Product name
        </div>
        <div>Category</div>
        <div>SKU</div>
        <div>Quantity</div>
        <div>Cost</div>
        <div>Price</div>
        <div>Status</div>
        <div>Actions</div>
      </div>
    `;

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

    mainContent.innerHTML += tableRowHeaderHTML;
    mainContent.innerHTML += listItemHTML;
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
      console.log(target.dataset.buttonFilter)
      if (!target.dataset.buttonFilter) return;

      const activeValue = document.getElementById('select-active').checked ? 'active' : 'inactive';
      const categoryValue = document.getElementById('select-category').value;
      const quantityValue = document.getElementById('select-quantity').value;
      const priceValue = document.getElementById('select-price').value;

      const filterValues = {
        active: activeValue,
        category: categoryValue,
        quantity: quantityValue,
        price: priceValue
      };

      handleFilterProducts(filterValues);
    })

  }

  addProduct() {
    const mainContent = document.querySelector('.main-content');

    mainContent.innerHTML = `

    `
  }

}
