import { getSelectCategoryFormTemplate } from './categoryForm';
import { getSelectStatusFormTemplate } from './statusForm';

const productFormTemplate = (product = {}) => {
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
  const isEditForm = Object.keys(product).length > 0;

  const formProductHTML = `
    <div class="modal-overlay">
      <form action="javascript:void(0)" method="post" class="form-container">
        <h2 class="modal-form-title">${isEditForm ? 'Edit Product' : 'Add Product'}</h2>
        <div class="form-group">
          <label for="name">Product Name:</label>
          <input id="name" data-field-name="Name" name="name" value="${name}" placeholder="Enter product name" class="form-input">
          <p class="error-msg" data-field-error="Name"></p>
          </div>
        <div class="form-group">
          <label for="category">Category:</label>
          <div class="select-wrapper">
            <select id="category" data-field-name="category" class="form-input form-input-select">
              ${getSelectCategoryFormTemplate(category)}
            </select>
          </div>
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
          <div class="select-wrapper">
            <select id="status" data-field-name="status" class="form-input form-input-select">
              ${getSelectStatusFormTemplate(status)}
            </select>
          </div>
        </div>
        <div class="btn-submit-wrapper">
          <input type="submit" data-product-id="${id}" value="${isEditForm ? 'Save' : 'Add Product'}" class="btn-submit" id="btn-submit-product">
        </div>
      </form>
    </div>
  `;

  return formProductHTML;
};

export default productFormTemplate;
