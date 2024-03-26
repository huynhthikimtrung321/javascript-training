const generateFormProductHtml = (product = {}) => {
  const {
    id = '',
    name = '',
    category = '',
    sku = '',
    quantity = '',
    cost = '',
    price = '',
    status = '',
  } = product;
  console.log(status);
  const isEditForm = Object.keys(product).length > 0;

  const formProductHTML = `
    <div class="modal-overlay">
      <form action="javascript:void(0)" method="post" class="add-product-container">
        <h2 class="add-product-title">${isEditForm ? 'Edit Product' : 'Add Product'}</h2>
        <div class="form-group">
          <label for="name">Product Name:</label>
          <input id="name" data-field-name="Name" name="name" value="${name}" placeholder="Enter product name" class="form-input">
          <p class="error-msg" data-field-error="Name"></p>
          </div>
        <div class="form-group">
          <label for="category">Category:</label>
          <select id="category" data-field-name="category" class="form-input">
            <option ${category === 'Skin care' && 'selected'}>Skin care</option>
            <option ${category === 'Face care' && 'selected'}>Face care</option>
            <option ${category === 'Lips care' && 'selected'}>Lips care</option>
          </select>
        </div>
        <div class="form-group">
          <label for="sku">SKU:</label>
          <input type="text" value="${sku}" id="sku" data-field-name="SKU"class="form-input">
          <p class="error-msg" data-field-error="SKU"></p>
        </div>
        <div class="form-group">
          <label for="quantity">Quantity:</label>
          <input id="quantity" value="${quantity}" data-field-name="Quantity" name="quantity" placeholder="0" class="form-input">
          <p class="error-msg" data-field-error="Quantity"></p>
        </div>
        <div class="form-group">
          <label for="price">Price:</label>
          <input id="price" value="${price}" data-field-name="Price" name="price" placeholder="Enter price" class="form-input">
          <p class="error-msg" data-field-error="Price"></p>
        </div>
        <div class="form-group">
          <label for="cost">Cost:</label>
          <input id="cost" value="${cost}" data-field-name="Cost" name="cost" placeholder="Enter cost" class="form-input">
          <p class="error-msg" data-field-error="Cost"></p>
        </div>
        <div class="form-group">
          <label for="status">Status:</label>
          <select id="status" data-field-name="status" class="form-input">
            <option ${status === true && 'selected'} value="active">Active</option>
            <option ${status === false && 'selected'} value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <input type="submit" data-product-id="${id}" value="${isEditForm ? 'Edit Product' : 'Add Product'}" class="add-product-submit" id="${isEditForm ? 'btn-edit-product' : 'btn-add-product'}">
        </div>
      </form>
    </div>
  `;

  return formProductHTML;
};

export default generateFormProductHtml;
