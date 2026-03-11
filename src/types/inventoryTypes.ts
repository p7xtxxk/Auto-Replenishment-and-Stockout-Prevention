export type RiskLevel = 'SAFE' | 'MEDIUM' | 'HIGH';

export interface InventoryItem {
  sku: string;
  productName: string;
  dailySales: number;
  currentStock: number;
  leadTime: number;
  supplier: string;
}

export interface EnrichedInventoryItem extends InventoryItem {
  stockCoverage: number;
  riskLevel: RiskLevel;
  recommendedOrder: number;
  reason: string;
  confidence: number;
}

export interface StockAlert {
  id: string;
  sku: string;
  productName: string;
  message: string;
  severity: RiskLevel;
  daysUntilStockout: number;
  timestamp: string;
}

export interface ReplenishmentRecommendation {
  sku: string;
  productName: string;
  suggestedOrderQuantity: number;
  reason: string;
  confidence: number;
}

export interface KPIData {
  totalProducts: number;
  lowStockItems: number;
  stockoutRiskItems: number;
  pendingReplenishment: number;
}

export interface AgentResult {
  status: 'success' | 'pending' | 'error';
  message: string;
  data?: unknown;
}
