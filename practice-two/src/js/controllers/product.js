import { showError, showSuccess } from '../views/toast';
import { ALERT_MESSAGES } from '../constants/messages';

const {
  ADD_SUCCESS_MSG,
  ADD_FAILED_MSG,
  EDIT_SUCCESS_MSG,
  EDIT_FAILED_MSG,
  DELETE_SUCCESS_MSG,
  DELETE_FAILED_MSG,
} = ALERT_MESSAGES;

export default class ProductController {
  constructor(model, view) {
    this.productModel = model;
    this.productView = view;
  }

  async initialize() {
    this.productView.displayHeader();
    await this.renderProducts();
    this.productView.bindFilterProductElement(this.handleFilterProducts);
    this.productView.bindToggleAddForm(this.handleShowAddForm);
    this.productView.bindToggleEditForm(this.handleShowEditForm);
    this.productView.bindRemoveModal();
    this.productView.bindAddProduct(this.handleAddProduct);
    this.productView.bindEditProduct(this.handleEditProduct);
    this.productView.bindDeleteProduct(this.handleDeleteProduct);
    this.productView.bindRemoveModalDelete();
  }

  renderProducts = async (params = {}, products) => {
    // Default params is to show the newest product on the list
    if (!('sortBy' in params && 'order' in params)) {
      params.sortBy = 'id';
      params.order = 'desc';
    }

    this.productView.displayProducts(products, true);
    products = await this.productModel.getProducts(params);
    this.productView.displayProducts(products, false);
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

  handleShowEditForm = async id => {
    this.productView.displaySpinner();
    const product = await this.productModel.getProduct(id);
    this.productView.removeSpinner();
    this.productView.displayProductForm(product);
  };

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
