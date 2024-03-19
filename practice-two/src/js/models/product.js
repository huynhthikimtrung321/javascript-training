import HttpService from "../services/httpClient.service";

export class Product {
  constructor({ id, name, category, sku, quantity, cost, price, status = false}) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.sku = sku;
    this.quantity = quantity;
    this.cost = cost;
    this.price = price;
    this.status = status;
  }
}

export default class ProductModel {
  constructor() {
    this.httpService = new HttpService();
  }

  async getProducts() {
    return await this.httpService.get('products');
  }
}
