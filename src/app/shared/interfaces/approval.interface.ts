export interface ApprovalModel {
  documents: Document[];
  hasNext: boolean;
}

export interface Document {
  documentBranch: string;
  documentNumber: string;
  documentTotal: number;
  documentType: string;
  documentUserName: string;
  documentGroupAprov: string;
  documentItemGroup: string;
  documentStatus: string;
  documentCurrency: string;
  documentCreated: string;
  scrId: number;
  purchaseOrder?: PurchaseOrder;
  purchaseRequest?: PurchaseRequest;
  measurements?: Measurements;
}

export interface Measurements {
  contractNumber?: string;
  review?: string;
  competence?: string;
  spreadsheet: Spreadsheet[];
}

export interface Spreadsheet {
  number: string;
  description: string;
  items: Item[];
}

export interface Item {
  item: string;
  product_code: string;
  product_description: string;
  quantity: number;
  discount: string;
  unitary_value: number;
  total_value: number;
  value_symbol: string;
  delivery_date: string;
}

export interface PurchaseOrder {
  supplyerName?: string;
  paymentTermDescription?: string;
  purchaserName?: string;
  orderTotal?: number;
  currency?: string;
  date?: string;
  itemDescriptionCostCenter?: string;
  recno?: number;
}

export interface PurchaseRequest {
  requesterName?: string;
  requestTotal?: number;
  date?: string;
  CostCenter?: string;
  recno?: number;
}

export interface Establishment {
  branchCode?: string;
  branchName?: string;
  code: string;
  companyCode?: string;
  companyName?: string;
  description?: string;
}

export interface Approval {
  approvals: ApprovalElement[];
}

export interface ApprovalElement {
  branch: string;
  documents: DocumentApproval[];
}

export interface DocumentApproval {
  toApprove: boolean;
  documentId: string;
  justification: string;
  itemGroup: string;
}
