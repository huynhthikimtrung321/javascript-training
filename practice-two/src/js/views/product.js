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
          <button class="btn-action">
              <svg width="24" height="24" fill="blue" viewBox="0 0 24 24">
                <use
                  xlink:href="${icon}#pen-icon"
                ></use>
              </svg>
            </button>
            <button class="btn-action">
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

    mainContent.innerHTML += tableRowHeaderHTML;
    mainContent.innerHTML += listItemHTML;
  }

  bindSearchProducts(handleSearchProductByKeyword) {
    const mainContent = document.querySelector('.main-content');

    mainContent.addEventListener('keydown', async (event) => {
      if(!event.target.classList.contains('input-search')) return;

      if(event.key !== 'Enter') return;

      const searchValue = event.target.value.toLowerCase();
      const searchedProducts = await handleSearchProductByKeyword({name: searchValue});
      this.displayProducts(searchedProducts);
  })
}
}
