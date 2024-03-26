export default class ProductController {
  constructor(model, view) {
    this.productModel = model;
    this.productView = view;
  }

  async initialize() {
    this.productView.displayHeader();
    await this.renderProducts();
    this.productView.bindSearchProducts(
      this.handleSearchProductByKeyword
    );
    this.productView.bindFilterProductElement(
      this.handleFilterProducts
    )
    this.productView.bindSortProduct(
      this.handleSortProduct
    );
    this.productView.bindToggleAddForm(
      this.handleShowAddForm
    );
    this.productView.bindToggleEditForm(
      this.handleShowEditForm
    );
    this.productView.bindRemoveModal();
    this.productView.bindAddProduct(
      this.handleAddProduct
    );
    this.productView.bindEditProduct(
      this.handleEditProduct
    );
    this.productView.bindToggleDelete();
  }

  async renderProducts() {
    const products = await this.productModel.getProducts();
    this.productView.displayProducts(products);
  }

  handleSearchProductByKeyword = async (params = {}) => {
    return await this.productModel.getProducts(params);
  }

  handleFilterProducts = async (params) => {
    const products = await this.productModel.getProducts(params);
    this.productView.displayProducts(products);
  }

  handleSortProduct = async (field, orderBy) => {
    const products = await this.productModel.sortProducts(field, orderBy);
    this.productView.displayProducts(products);
  }

  handleAddProduct = async (product) => {
    const products = await this.productModel.addProduct(product);
    this.productView.removeModal();
    this.productView.displayProducts(products);

  }

  handleShowAddForm = () => {
    this.productView.displayProductForm();
  }

  handleShowEditForm = async (id) => {
    const product = await this.productModel.getProduct(id);
    this.productView.displayProductForm(product);
  }

  handleEditProduct = async (id, product) => {
    const products = await this.productModel.editProduct(id, product);
    this.productView.removeModal();
    this.productView.displayProducts(products);
  }

}
