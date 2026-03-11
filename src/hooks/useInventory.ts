import { useEffect } from 'react';
import { useInventoryStore } from '../store/inventoryStore';

export function useInventory() {
  const store = useInventoryStore();

  useEffect(() => {
    store.loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store;
}
