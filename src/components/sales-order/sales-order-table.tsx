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
import { getDictLabel, getDictColor } from "@/lib/dict";
import type { SalesOrder } from "@/types/sales-order";
import { SalesOrderFormDialog } from "./sales-order-form-dialog";

interface SalesOrderTableProps {
  data: SalesOrder[];
}

const statusColors: Record<string, string> = {
  pending: "border-amber-500 text-amber-600",
  processing: "border-blue-500 text-blue-600",
  shipped: "border-violet-500 text-violet-600",
  delivered: "border-emerald-500 text-emerald-600",
  cancelled: "border-gray-500 text-gray-600",
};

export function SalesOrderTable({ data }: SalesOrderTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<SalesOrder | undefined>();

  const handleEdit = (item: SalesOrder) => {
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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
    }).format(amount);
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          新建订单
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>订单编号</TableHead>
              <TableHead>客户名称</TableHead>
              <TableHead>产品</TableHead>
              <TableHead className="text-right">金额</TableHead>
              <TableHead className="text-center">数量</TableHead>
              <TableHead>订单日期</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-mono text-sm">{item.orderNo}</TableCell>
                <TableCell>
                  <Link
                    to="/customers/$id"
                    params={{ id: item.customerId }}
                    className="text-primary hover:underline"
                  >
                    {item.customerName}
                  </Link>
                </TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell className="text-right">{formatAmount(item.amount)}</TableCell>
                <TableCell className="text-center">{item.quantity}</TableCell>
                <TableCell>{item.orderDate}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={statusColors[item.status]}
                  >
                    {getDictLabel("dict-order-status", item.status)}
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
                        <Link to="/sales-orders/$id" params={{ id: item.id }}>
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
      <SalesOrderFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        data={editingData}
      />
    </>
  );
}
