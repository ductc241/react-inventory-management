import ProductList from "../../modules/product/ProductList";

const ProductListPage = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-2 border">
        <p>Sidebar Product</p>
      </div>
      <div className="col-span-10">
        <ProductList />
      </div>
    </div>
  );
};

export default ProductListPage;
