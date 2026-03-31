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
import type { Customer } from "@/types/customer";
import { CustomerFormDialog } from "./customer-form-dialog";

interface CustomerTableProps {
  data: Customer[];
}

export function CustomerTable({ data }: CustomerTableProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingData, setEditingData] = useState<Customer | undefined>();

  const handleEdit = (item: Customer) => {
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

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={handleNew}>
          <Plus className="h-4 w-4 mr-2" />
          新建客户
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>客户编号</TableHead>
              <TableHead>客户名称</TableHead>
              <TableHead>联系人</TableHead>
              <TableHead>联系电话</TableHead>
              <TableHead>行业</TableHead>
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
                    to="/customers/$id"
                    params={{ id: item.id }}
                    className="text-primary hover:underline"
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.industry}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      getDictColor("dict-customer-status", item.status) === "emerald"
                        ? "border-emerald-500 text-emerald-600"
                        : getDictColor("dict-customer-status", item.status) === "amber"
                        ? "border-amber-500 text-amber-600"
                        : "border-gray-500 text-gray-600"
                    }
                  >
                    {getDictLabel("dict-customer-status", item.status)}
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
                        <Link to="/customers/$id" params={{ id: item.id }}>
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
      <CustomerFormDialog
        open={dialogOpen}
        onOpenChange={handleDialogClose}
        data={editingData}
      />
    </>
  );
}
