import Item from "antd/lib/list/Item";
import { useEffect, useState } from "react";
import { list } from "../../api/supplier.api";
import IOptionSupplier from "../../types/option.supplier";



export const BrandOptionsSupplier: IOptionSupplier[] = [

  {
    label: "Apple",
    value: 1
  },
  {
    label: "Samsung",
    value: 2
  },
  {
    label: "Oppo",
    value: 3
  },
  {
    label: "Xiaomi",
    value: 4
  }
];
