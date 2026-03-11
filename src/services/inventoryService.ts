import type { InventoryItem, EnrichedInventoryItem, StockAlert, ReplenishmentRecommendation, KPIData } from '../types/inventoryTypes';
import mockData from '../data/mockInventory.json';
import {
  enrichInventoryData,
  generateAlerts,
  generateRecommendations,
  calculateKPIs,
} from '../utils/inventoryCalculations';

const rawData: InventoryItem[] = mockData as InventoryItem[];

/**
 * Get raw inventory data
 */
export function getRawInventoryData(): InventoryItem[] {
  return rawData;
}

/**
 * Get enriched inventory data with calculations
 */
export function getInventoryData(): EnrichedInventoryItem[] {
  return enrichInventoryData(rawData);
}

/**
 * Get stock alerts
 */
export function getStockAlerts(): StockAlert[] {
  const enriched = enrichInventoryData(rawData);
  return generateAlerts(enriched);
}

/**
 * Get replenishment recommendations
 */
export function getReplenishmentRecommendations(): ReplenishmentRecommendation[] {
  const enriched = enrichInventoryData(rawData);
  return generateRecommendations(enriched);
}

/**
 * Get KPI summary data
 */
export function getKPIData(): KPIData {
  const enriched = enrichInventoryData(rawData);
  return calculateKPIs(enriched);
}
