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
        <button class="btn btn-filter">Active</button>
        <select class="btn btn-filter">
          <option selected="true" disabled="disabled">Category</option>
          <option>Skin care</option>
          <option>Face care</option>
          <option>Lips care</option>
        </select>
        <select class="btn btn-filter">
          <option selected="true" disabled="disabled">Quantity</option>
          <option>Low to High</option>
          <option>High to Low</option>
        </select>
        <select class="btn btn-filter">
          <option selected="true" disabled="disabled">Price</option>
          <option>Low to High</option>
          <option>High to Low</option>
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
            ${status}
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

  bindSearchProductElement(handleGet) {
    const mainContent = document.querySelector('.main-content');

    mainContent.addEventListener('keydown', async (event) => {
      if (!event.target.classList.contains('input-search')) return;

      if (event.key !== 'Enter') return;

      const searchValue = event.target.value.toLowerCase();
      const searchedProducts = await handleGet(searchValue);
      this.displayProducts(searchedProducts);
    })
  }
}
