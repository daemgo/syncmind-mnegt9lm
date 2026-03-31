export interface Customer {
  id: string;
  code: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  industry: string;
  status: "active" | "inactive" | "potential";
  createdAt: string;
}

export type CustomerStatus = Customer["status"];
