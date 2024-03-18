import ProductModel from "../models/product";
import ProductView from "../views/product";
import Product from "../models/product";

class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.productView = new ProductView();
  }

  async showProduct() {
    const products = await this.productModel.getProducts();
    this.productView.displayProduct(products);
  }

}
const productController = new ProductController();
productController.showProduct();
