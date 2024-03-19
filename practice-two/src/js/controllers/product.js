export default class ProductController {
  constructor(model, view) {
    this.productModel = model;
    this.productView = view;
  }

  async initialize() {
    await this.renderProducts();
    this.productView.bindSearchProducts(
      this.handleGet
    );
  }

  async renderProducts() {
    const products = await this.productModel.getProducts();
    this.productView.displayProducts(products);
  }

  handleGet = async (params={}) => {
    return await this.productModel.getProducts(params);
  }
}
