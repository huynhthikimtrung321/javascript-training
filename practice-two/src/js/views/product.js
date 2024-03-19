import searchIcon from '../../assets/images/icon.svg';

export default class ProductView {
  displayProducts(products) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';

    const tableRowHeaderHTML = `
      <div class="flex-space-between">
        <svg class="icon-search">
          <use
            xlink:href="${searchIcon}#icon-search"
          ></use>
        </svg>
        <input type="text" class="input-search" placeholder="Search product">
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

  bindSearchProducts(handleGet) {
    const mainContent = document.querySelector('.main-content');

    mainContent.addEventListener('keydown', async (event) => {
      if(!event.target.classList.contains('input-search')) return;

      if(event.key !== 'Enter') return;

      const searchValue = event.target.value.toLowerCase();
      const searchedProducts = await handleGet({name: searchValue});
      this.displayProducts(searchedProducts);
  })
}
}
