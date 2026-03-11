import { create } from 'zustand';
import type { EnrichedInventoryItem, StockAlert, ReplenishmentRecommendation, KPIData } from '../types/inventoryTypes';
import {
  getInventoryData,
  getStockAlerts,
  getReplenishmentRecommendations,
  getKPIData,
} from '../services/inventoryService';

interface InventoryState {
  inventory: EnrichedInventoryItem[];
  alerts: StockAlert[];
  recommendations: ReplenishmentRecommendation[];
  kpis: KPIData;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loadData: () => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  inventory: [],
  alerts: [],
  recommendations: [],
  kpis: {
    totalProducts: 0,
    lowStockItems: 0,
    stockoutRiskItems: 0,
    pendingReplenishment: 0,
  },
  isLoading: true,
  searchQuery: '',

  setSearchQuery: (query: string) => set({ searchQuery: query }),

  loadData: () => {
    set({ isLoading: true });
    // Simulate async loading
    setTimeout(() => {
      const inventory = getInventoryData();
      const alerts = getStockAlerts();
      const recommendations = getReplenishmentRecommendations();
      const kpis = getKPIData();
      set({ inventory, alerts, recommendations, kpis, isLoading: false });
    }, 600);
  },
}));
