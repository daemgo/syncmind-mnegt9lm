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
import type { Customer } from "@/types/customer";

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data?: Customer;
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  data,
}: CustomerFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Customer>>(
    data || {
      code: "",
      name: "",
      contact: "",
      phone: "",
      email: "",
      industry: "",
      status: "active",
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
          <DialogTitle>{data ? "编辑客户" : "新建客户"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="code">客户编号</Label>
              <Input
                id="code"
                value={formData.code || ""}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="CUS-2026001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">客户名称</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="公司名称"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">联系人</Label>
              <Input
                id="contact"
                value={formData.contact || ""}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="姓名"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">联系电话</Label>
              <Input
                id="phone"
                value={formData.phone || ""}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="138-xxxx-xxxx"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@company.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="industry">行业</Label>
              <Input
                id="industry"
                value={formData.industry || ""}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                placeholder="所属行业"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">状态</Label>
            <Select
              value={formData.status || "active"}
              onValueChange={(value) => setFormData({ ...formData, status: value as Customer["status"] })}
            >
              <SelectTrigger>
                <SelectValue placeholder="选择状态" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">活跃</SelectItem>
                <SelectItem value="inactive">非活跃</SelectItem>
                <SelectItem value="potential">潜在客户</SelectItem>
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
