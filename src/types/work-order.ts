export interface WorkOrder {
  id: string;
  code: string;
  equipmentId: string;
  equipmentName: string;
  type: WorkOrderType;
  priority: Priority;
  status: WorkOrderStatus;
  description: string;
  assignee: string;
  reporter: string;
  scheduledDate: string;
  completedAt: string | null;
  createdAt: string;
}

export type WorkOrderType = "repair" | "preventive" | "inspection";
export type Priority = "high" | "medium" | "low";
export type WorkOrderStatus = "pending" | "assigned" | "in_progress" | "completed" | "cancelled";
