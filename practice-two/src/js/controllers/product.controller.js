import HttpService from "../services/httpClient.service";
import ProductView from "../views/product.view";
import Product from "../models/product.model";

class ProductController {
  constructor() {
    this.HttpService = new HttpService();
    this.productView = new ProductView();
  }

  async showProduct() {
    const products = await this.HttpService.get('product')
    this.productView.displayProduct(products);
  }

}
const productController = new ProductController();
productController.showProduct();
