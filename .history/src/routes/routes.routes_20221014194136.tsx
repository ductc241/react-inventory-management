import Product from "../modules/product";
import ProductForm from "../modules/product/ProductForm/ProductForm";

import IRoute from "../types/router.type";
import * as routerPaths from "./routes.paths";

export const appRoutes: IRoute[] = [
  {
    key: 1,
    path: routerPaths.PATH,
    component: <Product />
  },
  {
    key: 2,
    path: routerPaths.PATH_PRODUCTS_FORM,
    component: <ProductForm />
  }
];
