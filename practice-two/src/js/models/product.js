import { API_ENDPOINT } from "../constants/endpoint";

const { PRODUCT_ENDPOINT } = API_ENDPOINT;

export class Product {
  constructor({ id, name, category, sku, quantity, cost, price, status = false }) {
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
  constructor(httpService) {
    this.httpService = httpService;
    this.products = [];
  }

  async getProducts(params = {}) {
    if(this.products.length) {
      return this.products;
    }

    return this.products = await this.httpService.get(PRODUCT_ENDPOINT, params);
  }

  async sortProducts(field, orderBy = '') {
    const products = (await this.getProducts({})).slice();

    return products.sort((a, b) => {
      let comparision = 0;

      if (typeof a[field] === 'string') {
        comparision = a[field].localeCompare(b[field]);
      } else if(typeof a[field] === 'boolean') {
        comparision = 1;
      } else if(typeof a[field] === 'number') {
        comparision = a[field] - b[field];
      }

      return orderBy === 'asc' ? comparision : orderBy === 'desc' ? -comparision : 0;
    });
  }
}
