import { ArrowLeft, Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDictLabel } from "@/lib/dict";
import type { Product } from "@/types/product";

interface ProductDetailProps {
  data: Product;
}

const statusColors: Record<string, string> = {
  in_stock: "border-emerald-500 text-emerald-600",
  low_stock: "border-amber-500 text-amber-600",
  out_of_stock: "border-red-500 text-red-600",
};

export function ProductDetail({ data }: ProductDetailProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/products">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{data.name}</h1>
          <p className="text-sm text-muted-foreground">{data.code}</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          编辑
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>基本信息</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">产品编号</span>
              <span className="font-mono">{data.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">产品名称</span>
              <span>{data.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">分类</span>
              <span>{data.category}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">单位</span>
              <span>{data.unit}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">状态</span>
              <Badge variant="outline" className={statusColors[data.status]}>
                {getDictLabel("dict-product-status", data.status)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">创建日期</span>
              <span>{data.createdAt}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>价格与库存</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">单价</span>
              <span className="font-semibold text-primary">{formatPrice(data.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">当前库存</span>
              <span className={data.stock === 0 ? "text-red-600 font-medium" : ""}>
                {data.stock} {data.unit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">库存状态</span>
              <Badge variant="outline" className={statusColors[data.status]}>
                {getDictLabel("dict-product-status", data.status)}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">库存价值</span>
              <span>{formatPrice(data.price * data.stock)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
