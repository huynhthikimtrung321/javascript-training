import ProductModel from "../models/product";
import ProductView from "../views/product";
import Product from "../models/product";

class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.productView = new ProductView();
  }

  async renderProducts() {
    const products = await this.productModel.getProducts();
    this.productView.displayProducts(products);
  }

  handleGet = async (searchValue) => {
    return await this.productModel.getProductsByQuery(searchValue);
  }
}
const productController = new ProductController();
(async () => {
  await productController.renderProducts();
  productController.productView.bindSearchProductElement(
    productController.handleGet
  );
})();
