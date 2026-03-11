import type { InventoryItem, EnrichedInventoryItem, RiskLevel, StockAlert, ReplenishmentRecommendation, KPIData } from '../types/inventoryTypes';

/**
 * Calculate stock coverage (days of stock remaining)
 */
export function calculateStockCoverage(currentStock: number, dailySales: number): number {
  if (dailySales <= 0) return Infinity;
  return Math.round((currentStock / dailySales) * 10) / 10;
}

/**
 * Detect risk level based on stock coverage vs lead time
 */
export function detectRiskLevel(stockCoverage: number, leadTime: number): RiskLevel {
  if (stockCoverage < leadTime) return 'HIGH';
  if (stockCoverage < leadTime + 1) return 'MEDIUM';
  return 'SAFE';
}

/**
 * Calculate recommended reorder quantity
 * requiredStock = (dailySales × leadTime) + safetyStock
 * safetyStock = 1 day of demand
 * recommendedOrder = requiredStock − currentStock
 */
export function calculateReorderQuantity(
  dailySales: number,
  leadTime: number,
  currentStock: number
): number {
  const safetyStock = dailySales; // 1 day of demand
  const requiredStock = (dailySales * leadTime) + safetyStock;
  const recommended = requiredStock - currentStock;
  return Math.max(0, Math.ceil(recommended));
}

/**
 * Generate a reason string for reorder recommendation
 */
export function generateReorderReason(stockCoverage: number, leadTime: number): string {
  if (stockCoverage < leadTime) {
    return 'Stock coverage below lead time — immediate reorder required';
  }
  if (stockCoverage < leadTime + 1) {
    return 'Stock coverage approaching lead time threshold';
  }
  return 'Stock levels adequate';
}

/**
 * Generate a confidence score (mock logic — to be replaced by AI agent)
 */
export function generateConfidence(riskLevel: RiskLevel): number {
  switch (riskLevel) {
    case 'HIGH': return 92 + Math.floor(Math.random() * 6);
    case 'MEDIUM': return 78 + Math.floor(Math.random() * 10);
    case 'SAFE': return 60 + Math.floor(Math.random() * 15);
  }
}

/**
 * Enrich raw inventory items with calculated fields
 */
export function enrichInventoryData(items: InventoryItem[]): EnrichedInventoryItem[] {
  return items.map((item) => {
    const stockCoverage = calculateStockCoverage(item.currentStock, item.dailySales);
    const riskLevel = detectRiskLevel(stockCoverage, item.leadTime);
    const recommendedOrder = calculateReorderQuantity(item.dailySales, item.leadTime, item.currentStock);
    const reason = generateReorderReason(stockCoverage, item.leadTime);
    const confidence = generateConfidence(riskLevel);

    return {
      ...item,
      stockCoverage,
      riskLevel,
      recommendedOrder,
      reason,
      confidence,
    };
  });
}

/**
 * Generate stock alerts from enriched data
 */
export function generateAlerts(items: EnrichedInventoryItem[]): StockAlert[] {
  return items
    .filter((item) => item.riskLevel !== 'SAFE')
    .map((item, index) => ({
      id: `alert-${index + 1}`,
      sku: item.sku,
      productName: item.productName,
      message:
        item.riskLevel === 'HIGH'
          ? `${item.sku} may stock out in ${Math.max(1, Math.floor(item.stockCoverage))} day(s). Immediate action required.`
          : `${item.sku} stock coverage is approaching lead time threshold. Monitor closely.`,
      severity: item.riskLevel,
      daysUntilStockout: Math.max(0, Math.floor(item.stockCoverage)),
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
    }))
    .sort((a, b) => (a.severity === 'HIGH' ? -1 : 1) - (b.severity === 'HIGH' ? -1 : 1));
}

/**
 * Generate replenishment recommendations
 */
export function generateRecommendations(items: EnrichedInventoryItem[]): ReplenishmentRecommendation[] {
  return items
    .filter((item) => item.recommendedOrder > 0)
    .map((item) => ({
      sku: item.sku,
      productName: item.productName,
      suggestedOrderQuantity: item.recommendedOrder,
      reason: item.reason,
      confidence: item.confidence,
    }));
}

/**
 * Calculate KPI data
 */
export function calculateKPIs(items: EnrichedInventoryItem[]): KPIData {
  return {
    totalProducts: items.length,
    lowStockItems: items.filter((i) => i.riskLevel === 'MEDIUM').length,
    stockoutRiskItems: items.filter((i) => i.riskLevel === 'HIGH').length,
    pendingReplenishment: items.filter((i) => i.recommendedOrder > 0).length,
  };
}
