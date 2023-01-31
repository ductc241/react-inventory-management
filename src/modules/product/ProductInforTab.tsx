import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CloseIcon } from "../../components/icons";
import { IProduct } from "../../types/product.type";

interface IProps {
  id: number;
  closeTab: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductInforTab = ({ id, closeTab }: IProps) => {
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    try {
      const getInitData = async () => {
        // const { data } = await productServices.getProductById(id);
        setProduct({
          id: 1,
          category_id: 1,
          name: "san pham 1",
          sku: "SP0001",
          price: 233333,
          import_price: 233333,
          quantity: 6870,
          description: "mo ta 1",
          image: null,
          warranty_date: 12,
          status: 1
        });
      };

      getInitData();
    } catch (error) {
      console.log(error);
      toast.error("Không thể lấy thông tin, Vui lòng thử lại sau");
    }
  }, [id]);

  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <div className="absolute inset-0 bg-black opacity-5" />
      <div className="z-[999] w-full md:w-3/4 rounded-md bg-white text-left drop-shadow-2xl">
        <div className="flex justify-between item-center py-5 px-5 border-b">
          <p>{product?.name}</p>
          <CloseIcon
            width={20}
            height={20}
            onClick={() => closeTab(false)}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="py-5 px-3">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae quos
            nobis labore debitis quo cum quod veniam est quam unde facere
            consectetur cupiditate, doloremque voluptate in provident numquam,
            tempore fugit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductInforTab;
