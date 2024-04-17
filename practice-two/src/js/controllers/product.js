import { showError, showSuccess } from '../views/toast';
import { NOTIFY_MESSAGES } from '../constants/messages';

const {
  ADD_SUCCESS_MSG,
  ADD_FAILED_MSG,
  EDIT_SUCCESS_MSG,
  EDIT_FAILED_MSG,
  DELETE_SUCCESS_MSG,
  DELETE_FAILED_MSG,
  GET_FAILED_MSG,
} = NOTIFY_MESSAGES;

export default class ProductController {
  constructor(model, view) {
    this.productModel = model;
    this.productView = view;
  }

  /**
   * Initialize the view with event bindings and render the product list
   */
  async initialize() {
    this.productView.displayHeader();
    await this.renderProducts();
    this.productView.bindFilterProductElement(this.handleFilterProducts);
    this.productView.bindToggleAddForm(this.handleShowAddForm);
    this.productView.bindToggleEditForm(this.handleShowEditForm);
    this.productView.bindRemoveModal();
    this.productView.bindProductAction(this.handleAddProduct, this.handleEditProduct);
    this.productView.bindDeleteProduct(this.handleDeleteProduct);
    this.productView.bindRemoveModalDelete();
  }


  /**
   * Render the product list with default sorting and filtering parameters
   */
  renderProducts = async (params = {}, products) => {
    // Default params is to show the newest product on the list
    if (!('sortBy' in params && 'order' in params)) {
      params.sortBy = 'id';
      params.order = 'desc';
    }

    try {
      this.productView.displayProducts(products, true);
      products = await this.productModel.getProducts(params);
    } catch(error) {
      showError({ text: GET_FAILED_MSG})
    } finally {
      this.productView.displayProducts(products, false);
    }
  };

  handleSearchProductByKeyword = async (params = {}) => {
    this.renderProducts(params);
  };

  handleFilterProducts = async params => {
    this.renderProducts(params);
  };

  handleSortProducts = async params => {
    this.renderProducts(params);
  };


  /**
   * Adds a product and notify the end users
   */
  handleAddProduct = async product => {
    try {
      this.productView.displaySpinner();
      const products = await this.productModel.addProduct(product);
      this.productView.removeSpinner();
      showSuccess({ text: ADD_SUCCESS_MSG });
      this.productView.removeModal();
      this.productView.displayProducts(products);
    } catch (error) {
      showError({ text: ADD_FAILED_MSG });
    }
  };

  handleRemoveModal() {
    this.productView.removeModal();
  }

  handleShowAddForm = () => {
    this.productView.displayProductForm();
  };

  /**
   * Fetches the target product for editing and shows the form with its data
   */
  handleShowEditForm = async id => {
    this.productView.displaySpinner();
    const product = await this.productModel.getProduct(id);
    this.productView.removeSpinner();
    this.productView.displayProductForm(product);
  };

  /**
   * Edits a product and notify the end users
   */
  handleEditProduct = async (id, product) => {
    try {
      this.productView.displaySpinner();
      const products = await this.productModel.editProduct(id, product);
      this.productView.removeSpinner();
      showSuccess({ text: EDIT_SUCCESS_MSG });
      this.productView.removeModal();
      this.productView.displayProducts(products);
    } catch (error) {
      showError({ text: EDIT_FAILED_MSG });
    }
  };

  /**
   * Deletes a product and notify the end users
   */
  handleDeleteProduct = async id => {
    try {
      this.productView.displaySpinner();
      const products = await this.productModel.deleteProduct(id);
      this.productView.removeSpinner();
      showSuccess({ text: DELETE_SUCCESS_MSG });
      this.productView.displayProducts(products);
    } catch (error) {
      showError({ text: DELETE_FAILED_MSG });
    }
  };
}
