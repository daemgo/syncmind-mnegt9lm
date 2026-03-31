import { ArrowLeft, Edit } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getDictLabel } from "@/lib/dict";
import type { Customer } from "@/types/customer";

interface CustomerDetailProps {
  data: Customer;
}

export function CustomerDetail({ data }: CustomerDetailProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/customers">
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
              <span className="text-muted-foreground">客户编号</span>
              <span className="font-mono">{data.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">行业</span>
              <span>{data.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">状态</span>
              <Badge variant="outline">
                {getDictLabel("dict-customer-status", data.status)}
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
            <CardTitle>联系方式</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">联系人</span>
              <span>{data.contact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">联系电话</span>
              <span>{data.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">邮箱</span>
              <span>{data.email}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
