import PriceSetting from "../modules/priceSetting/priceSetting";
import DetailReceipt from "../modules/receipt/DetailReceipt";
import ProductInventory from "../modules/statistics/inventory/ProductInventory";
import RevenueByInventory from "../modules/statistics/revenue/RevenueBySupplier";
import ExportShipments from "../modules/transaction/ExportShipments/Index";
import ShipmentDetail from "../modules/transaction/shipments/ShipmentDetail";
import ShipMentsForm from "../modules/transaction/shipments/ShipmentsForm";
import ShipmentsTable from "../modules/transaction/shipments/shipmentsTable";
import TransactionTable from "../modules/transaction/TransactionTable";
import User from "../modules/user";
import CategoryListPage from "../pages/category/CategoryListPage";
import DashboardPage from "../pages/DashboardPage";
import Layout_PriceBook from "../pages/PriceBook/Layout_PriceBook";
import {
  ProductCreatePage,
  ProductListPage,
  ProductUpdatePage
} from "../pages/product";
import Layout_Returns from "../pages/Returns/Layout_Returns";
import RefundPage from "../pages/refurnd";
import SoQuyListPage from "../pages/SoQuy/SoQuyListPage";
import RevenuePage from "../pages/statistics/RevenuePage";
import RevenueProductPage from "../pages/statistics/RevenueProductPage";
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
    component: <ProductCreatePage />,
    role: [2]
  },
  {
    key: 4,
    path: routerPaths.PATH_PRODUCTS_UPDATE,
    component: <ProductUpdatePage />,
    role: [2]
  },
  {
    key: 5,
    path: routerPaths.PATH_IMPORT_SHIPMENT,
    component: <ShipmentsTable />
  },
  {
    key: 6,
    path: routerPaths.PATH_SUPPLIER,
    component: <SuplierPage />
  },
  {
    key: 7,
    path: routerPaths.PATH_CATEGORY,
    component: <CategoryListPage />
  },
  {
    key: 8,
    path: routerPaths.PATH_SoQuy,
    component: <SoQuyListPage />
  },
  {
    key: 9,
    path: routerPaths.PATH_PRICE_SETTING,
    component: <PriceSetting />
  },
  {
    key: 10,
    path: routerPaths.PATH_IMPORT_SHIPMENT_ADD,
    component: <ShipMentsForm />,
    role: [2]
  },
  {
    key: 11,
    path: routerPaths.PATH_RECEIPT,
    component: <TransactionTable />
  },
  {
    key: 12,
    path: routerPaths.PATH_RECEIPT_ID,
    component: <DetailReceipt />
  },
  {
    key: 13,
    path: routerPaths.PATH_EXPORT_SHIPMENT,
    component: <ExportShipments />
  },
  {
    key: 14,
    path: routerPaths.PATH_IMPORT_SHIPMENT_DETAIL,
    component: <ShipmentDetail />
  },
  {
    key: 15,
    path: routerPaths.PATH_REPORT_REVENUE,
    component: <RevenuePage />
  },
  {
    key: 16,
    path: routerPaths.PATH_REPORT_REVENUE_PRODUCT,
    component: <RevenueProductPage />
  },
  {
    key: 17,
    path: routerPaths.PATH_REPORT_REVENUE_SUPPLIER,
    component: <RevenueByInventory />
  },
  {
    key: 18,
    path: routerPaths.PATH_REPORT_INVENTORY_PRODUCT,
    component: <ProductInventory />
  },
  {
    key: 19,
    path: routerPaths.PATH_ALL_USER,
    component: <User />,
    role: [2]
  },
  {
    key: 20,
    path: routerPaths.PATH_PRICE_BOOK,
    component: <Layout_PriceBook />
  },
  {
    key: 21,
    path: routerPaths.PATH_PRICE_BOOK,
    component: <Layout_Returns />
  },
  {
    key: 21,
    path: routerPaths.PATH_REFUND_SUPPLIER,
    component: <RefundPage />
  }
];
