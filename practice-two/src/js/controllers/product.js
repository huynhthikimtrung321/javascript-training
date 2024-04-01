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
    this.productView.bindSortProduct(this.handleSortProducts);
    this.productView.bindToggleAddForm(this.handleShowAddForm);
    this.productView.bindToggleEditForm(this.handleShowEditForm);
    this.productView.bindRemoveModal();
    this.productView.bindAddProduct(this.handleAddProduct);
    this.productView.bindEditProduct(this.handleEditProduct);
    this.productView.bindDeleteProduct(this.handleDeleteProduct);
    this.productView.bindRemoveModalDelete();
  }

  renderProducts = async (params = {}) => {
    const products = await this.productModel.getProducts(params);
    this.productView.displayProducts(products);
  };

  handleSearchProductByKeyword = async (params = {}) => {
    return await this.productModel.getProducts(params);
  };

  handleFilterProducts = async (params) => {
    const products = await this.productModel.getProducts(params);
    this.productView.displayProducts(products);
  };

  handleSortProducts = async (field, orderBy) => {
    const products = await this.productModel.sortProducts(field, orderBy);
    this.productView.displayProducts(products);
  };

  handleAddProduct = async (product) => {
    try {
      const products = await this.productModel.addProduct(product);
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

  handleShowEditForm = async (id) => {
    const product = await this.productModel.getProduct(id);
    this.productView.displayProductForm(product);
  };

  handleEditProduct = async (id, product) => {
    try {
      const products = await this.productModel.editProduct(id, product);
      showSuccess({ text: EDIT_SUCCESS_MSG });
      this.productView.removeModal();
      this.productView.displayProducts(products);
    } catch (error) {
      showError({ text: EDIT_FAILED_MSG });
    }
  };

  handleDeleteProduct = async (id) => {
    try {
      const products = await this.productModel.deleteProduct(id);
      showSuccess({ text: DELETE_SUCCESS_MSG });
      this.productView.displayProducts(products);
    } catch (error) {
      showError({ text: DELETE_FAILED_MSG });
    }
  };
}
