export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  stock: number;
  status: "in_stock" | "low_stock" | "out_of_stock";
  createdAt: string;
}

export type ProductStatus = Product["status"];
