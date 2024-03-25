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
    this.productView.bindToggleForm();
    this.productView.bindAddProduct(
      this.handleAddProduct
    );
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
}
