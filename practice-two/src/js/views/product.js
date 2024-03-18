export default class ProductView {
  displayProduct(products) {
    const mainContent = document.querySelector('.main-content');
    mainContent.innerHTML = '';

    const tableRowHeaderHTML = `
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
    products?.map(product => {
      const itemHTML = `
        <li class="product-row">
          <h2>
            ${product.name}
          </h2>
          <p>
            ${product.category}
          </p>
          <p>
            ${product.sku}
          </p>
          <p>
            ${product.quantity}
          </p>
          <p>
            ${product.cost}
          </p>
          <p>
            ${product.price}
          </p>
          <p>
            ${product.status}
          </p>
          <div>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </li>
      `;

      listItemHTML += itemHTML;
    });
    listItemHTML += '</ul>';

    mainContent.innerHTML += tableRowHeaderHTML;
    mainContent.innerHTML += listItemHTML;
  }
}
