export default class ProductController {
  constructor(model, view) {
    this.productModel = model;
    this.productView = view;
  }

  async init() {
    await this.renderProducts();
    this.productView.bindSearchProductElement(
      this.handleGet
    );
  }

  async renderProducts() {
    const products = await this.productModel.getProducts();
    this.productView.displayProducts(products);
  }

  handleGet = async (searchValue) => {
    return await this.productModel.getProductsByQuery(searchValue);
  }
}
