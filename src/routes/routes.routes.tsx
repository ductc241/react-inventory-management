import ShipmentsForm from "../modules/transaction/shipments/ShipmentsForm";
import { CategoryListPage } from "../pages/category";
import DashboardPage from "../pages/DashboardPage";
import {
  ProductCreatePage,
  ProductListPage,
  ProductUpdatePage
} from "../pages/product";
import ShipmentPage from "../pages/shipments/ShipmentsList";
import SuplierPage from "../pages/supplier/SupllierPage";

import IRoute from "../types/router.type";
import * as routerPaths from "./routes.paths";

export const appRoutes: IRoute[] = [
  {
    key: 1,
    path: routerPaths.PATH_DASHBOARD,
    component: <DashboardPage />
  },

  {
    key: 2,
    path: routerPaths.PATH_PRODUCTS,
    component: <ProductListPage />
  },
  {
    key: 3,
    path: routerPaths.PATH_PRODUCTS_ADD,
    component: <ProductCreatePage />
  },
  {
    key: 4,
    path: routerPaths.PATH_PRODUCTS_UPDATE,
    component: <ProductUpdatePage />
  },
  {
    key: 5,

    path: routerPaths.PATH_IMPORT_SHIPMENT,
    component: <ShipmentPage />
  },
  {
    key: 6,
    path: routerPaths.PATH_SUPPLIER,
    component: <SuplierPage />
  },
  {
    key: 7,
    path: routerPaths.PATH_CATEGORIES,
    component: <CategoryListPage />
  },
  {
    key: 8,
    path: routerPaths.PATH_IMPORT_SHIPMENT_ADD,
    component: <ShipmentsForm />
  }
];
