import { ArrowLeft, Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDictLabel } from "@/lib/dict";
import type { SalesOrder } from "@/types/sales-order";

interface SalesOrderDetailProps {
  data: SalesOrder;
}

const statusColors: Record<string, string> = {
  pending: "border-amber-500 text-amber-600",
  processing: "border-blue-500 text-blue-600",
  shipped: "border-violet-500 text-violet-600",
  delivered: "border-emerald-500 text-emerald-600",
  cancelled: "border-gray-500 text-gray-600",
};

export function SalesOrderDetail({ data }: SalesOrderDetailProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/sales-orders">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{data.orderNo}</h1>
          <p className="text-sm text-muted-foreground">{data.productName}</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>订单信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">订单编号</span>
              <span className="font-mono">{data.orderNo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">产品名称</span>
              <span>{data.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">订单日期</span>
              <span>{data.orderDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">交付日期</span>
              <span>{data.deliveryDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">状态</span>
              <Badge variant="outline" className={statusColors[data.status]}>
                {getDictLabel("dict-order-status", data.status)}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>客户与金额</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">客户名称</span>
              <Link
                to="/customers/$id"
                params={{ id: data.customerId }}
                className="text-primary hover:underline"
              >
                {data.customerName}
              </Link>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">产品单价</span>
              <span>{formatAmount(data.amount / data.quantity)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">数量</span>
              <span>{data.quantity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">订单金额</span>
              <span className="font-semibold text-primary">{formatAmount(data.amount)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
