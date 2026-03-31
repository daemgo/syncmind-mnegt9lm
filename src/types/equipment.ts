export interface Equipment {
  id: string;
  code: string;
  name: string;
  model: string;
  manufacturer: string;
  location: string;
  status: EquipmentStatus;
  oee: number;
  purchaseDate: string;
  createdAt: string;
}

export type EquipmentStatus = "running" | "idle" | "maintenance" | "fault";
