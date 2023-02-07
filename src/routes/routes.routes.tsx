import PriceSetting from "../modules/priceSetting/priceSetting";
import DetailReceipt from "../modules/receipt/DetailReceipt";
import ProductInventory from "../modules/statistics/inventory/ProductInventory";
import SupplierInventory from "../modules/statistics/inventory/SupplierInventory";
import RevenueByInventory from "../modules/statistics/revenue/RevenueBySupplier";
import ExportShipments from "../modules/transaction/ExportShipments/Index";
import ShipmentDetail from "../modules/transaction/ImportShipments/ShipmentDetail";
import ShipMentsForm from "../modules/transaction/ImportShipments/ShipmentsForm";
import ShipmentsTable from "../modules/transaction/ImportShipments/shipmentsTable";
import ImportShipmentForm from "../modules/transaction/ImportShipments";
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
import RefundPage from "../pages/refurnd";
import SoQuyListPage from "../pages/SoQuy/SoQuyListPage";
import RevenuePage from "../pages/statistics/RevenuePage";
import RevenueProductPage from "../pages/statistics/RevenueProductPage";
import SuplierPage from "../pages/supplier/SupllierPage";

import IRoute from "../types/router.type";
import * as routerPaths from "./routes.paths";
import NewSalse from "../modules/transaction/NewSalse/NewSalse";
import ForecastImport from "../modules/statistics/products/ForecastImport";
import StorageTime from "../modules/statistics/products/StorageTime";
import ProductBroken from "../modules/transaction/ProductBroken";
import ProductBrokenForm from "../modules/transaction/ProductBroken/ProductBrokenForm";
import RefundForm from "../pages/refurnd/RefundForm";
import RefundSupplier from "../modules/transaction/RefundSupplier";
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
    component: <ProductUpdatePage />,
    role: [1]
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
    component: <ImportShipmentForm />,
    role: [1]
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
    path: routerPaths.PATH_REPORT_INVENTORY_SUPPLIER,
    component: <SupplierInventory />
  },
  {
    key: 20,
    path: routerPaths.PATH_ALL_USER,
    component: <User />,
    role: [1]
  },
  {
    key: 21,
    path: routerPaths.PATH_PRICE_BOOK,
    component: <Layout_PriceBook />
  },
  {
    key: 22,
    path: routerPaths.PATH_REFUND_SUPPLIER,
    component: <RefundSupplier />
  },
  {
    key: 23,
    path: routerPaths.PATH_RETAIL_NEW,
    component: <NewSalse />
  },
  {
    key: 24,
    path: routerPaths.PATH_FORECAST,
    component: <ForecastImport />
  },
  {
    key: 25,
    path: routerPaths.PATH_STORAGE,
    component: <StorageTime />
  },
  {
    key: 26,
    path: routerPaths.PATH_PRODUCT_BROKEN,
    // component: <ProductBroken />
    component: <RefundPage />
  },
  {
    key: 27,
    path: routerPaths.PATH_PRODUCT_BROKEN_ADD,
    component: <ProductBrokenForm />
  },
  {
    key: 28,
    path: routerPaths.PATH_REFUND_SUPPLIER_ADD,
    component: <RefundForm />
  }
];
