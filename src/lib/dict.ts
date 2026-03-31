export const dictionaries = {
  "dict-customer-status": [
    { label: "活跃", value: "active", color: "emerald" },
    { label: "非活跃", value: "inactive", color: "gray" },
    { label: "潜在客户", value: "potential", color: "amber" },
  ],
  "dict-order-status": [
    { label: "待处理", value: "pending", color: "amber" },
    { label: "处理中", value: "processing", color: "blue" },
    { label: "已发货", value: "shipped", color: "violet" },
    { label: "已交付", value: "delivered", color: "emerald" },
    { label: "已取消", value: "cancelled", color: "gray" },
  ],
  "dict-product-status": [
    { label: "有库存", value: "in_stock", color: "emerald" },
    { label: "库存不足", value: "low_stock", color: "amber" },
    { label: "缺货", value: "out_of_stock", color: "red" },
  ],
} as const;

export function getDictOptions(dictId: string) {
  return dictionaries[dictId as keyof typeof dictionaries] || [];
}

export function getDictLabel(dictId: string, value: string): string {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.label || value;
}

export function getDictColor(dictId: string, value: string): string | undefined {
  const options = getDictOptions(dictId);
  return options.find((o) => o.value === value)?.color;
}
