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
import type { Product } from "@/types/product";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Product;
}

export function ProductFormDialog({
  open,
  onOpenChange,
  data,
}: ProductFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    data || {
      code: "",
      name: "",
      category: "",
      unit: "套",
      price: 0,
      stock: 0,
      status: "in_stock",
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
          <DialogTitle>{data ? "编辑产品" : "新建产品"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">产品编号</Label>
              <Input
                id="code"
                value={formData.code || ""}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="PRD-XXX-001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">产品名称</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="产品名称"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">分类</Label>
              <Input
                id="category"
                value={formData.category || ""}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="产品分类"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">单位</Label>
              <Input
                id="unit"
                value={formData.unit || ""}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                placeholder="套/个/台"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">单价</Label>
              <Input
                id="price"
                type="number"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">库存</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock || 0}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">状态</Label>
            <Select
              value={formData.status || "in_stock"}
              onValueChange={(value) => setFormData({ ...formData, status: value as Product["status"] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="in_stock">有库存</SelectItem>
                <SelectItem value="low_stock">库存不足</SelectItem>
                <SelectItem value="out_of_stock">缺货</SelectItem>
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
