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
      this.renderProducts
    )
  }

  async renderProducts(params = {}) {
    const products = await this.productModel.getProducts(params);
    this.productView.displayProducts(products);
  }

  handleSearchProductByKeyword = async (params={}) => {
    return await this.productModel.getProducts(params);
  }
}
