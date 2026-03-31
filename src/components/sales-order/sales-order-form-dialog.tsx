import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SalesOrder } from "@/types/sales-order";

interface SalesOrderFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: SalesOrder;
}

export function SalesOrderFormDialog({
  open,
  onOpenChange,
  data,
}: SalesOrderFormDialogProps) {
  const [formData, setFormData] = useState<Partial<SalesOrder>>(
    data || {
      orderNo: "",
      customerId: "",
      customerName: "",
      productName: "",
      amount: 0,
      quantity: 1,
      status: "pending",
      orderDate: "",
      deliveryDate: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submit:", formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{data ? "编辑订单" : "新建订单"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderNo">订单编号</Label>
              <Input
                id="orderNo"
                value={formData.orderNo || ""}
                onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                placeholder="SO-20260301"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerName">客户名称</Label>
              <Input
                id="customerName"
                value={formData.customerName || ""}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder="客户名称"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="productName">产品名称</Label>
            <Input
              id="productName"
              value={formData.productName || ""}
              onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
              placeholder="产品名称"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">金额</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount || 0}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">数量</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity || 1}
                onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderDate">订单日期</Label>
              <Input
                id="orderDate"
                type="date"
                value={formData.orderDate || ""}
                onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deliveryDate">交付日期</Label>
              <Input
                id="deliveryDate"
                type="date"
                value={formData.deliveryDate || ""}
                onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">状态</Label>
            <Select
              value={formData.status || "pending"}
              onValueChange={(value) => setFormData({ ...formData, status: value as SalesOrder["status"] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">待处理</SelectItem>
                <SelectItem value="processing">处理中</SelectItem>
                <SelectItem value="shipped">已发货</SelectItem>
                <SelectItem value="delivered">已交付</SelectItem>
                <SelectItem value="cancelled">已取消</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <Button type="submit">{data ? "保存" : "创建"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
