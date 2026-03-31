import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { MoreHorizontal, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getDictLabel } from "@/lib/dict";
import type { Product } from "@/types/product";
import { ProductFormDialog } from "./product-form-dialog";

interface ProductTableProps {
  data: Product[];
}

const statusColors: Record<string, string> = {
  in_stock: "border-emerald-500 text-emerald-600",
  low_stock: "border-amber-500 text-amber-600",
  out_of_stock: "border-red-500 text-red-600",
};

export function ProductTable({ data }: ProductTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Product | undefined>();

  const handleEdit = (item: Product) => {
    setEditingData(item);
    setDialogOpen(true);
  };

  const handleNew = () => {
    setEditingData(undefined);
    setDialogOpen(true);
  };

  const handleDialogClose = (open: boolean) => {
    if (!open) {
      setDialogOpen(false);
      setEditingData(undefined);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
    }).format(price);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          新建产品
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>产品编号</TableHead>
              <TableHead>产品名称</TableHead>
              <TableHead>分类</TableHead>
              <TableHead className="text-right">单价</TableHead>
              <TableHead className="text-center">库存</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-sm">{item.code}</TableCell>
                <TableCell>
                  <Link
                    to="/products/$id"
                    params={{ id: item.id }}
                    className="text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right">{formatPrice(item.price)}</TableCell>
                <TableCell className="text-center">{item.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusColors[item.status]}
                  >
                    {getDictLabel("dict-product-status", item.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(item)}>编辑</DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/products/$id" params={{ id: item.id }}>
                          查看详情
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        data={editingData}
      />
    </>
  );
}
