import ProductModel from './models/product';
import ProductView from './views/product';
import ProductController from './controllers/product';
import HttpService from './services/httpClient.service';

document.addEventListener('DOMContentLoaded', async () => {
  const httpService = new HttpService();
  const productModel = new ProductModel(httpService);
  const productView = new ProductView();
  const productController = new ProductController(productModel, productView);
  await productController.initialize();
});
