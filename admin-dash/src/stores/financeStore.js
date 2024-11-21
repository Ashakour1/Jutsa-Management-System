import { create } from "zustand";
import { fetchFinanceDetailsFromAPI } from "../services/financeServices"

const useFinanceStore = create((set) => ({
  financeDetails: [], // Always starts as an empty array
  loading: false,
  error: null,

  fetchFinanceDetails: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchFinanceDetailsFromAPI();
      set({ financeDetails: data || [], loading: false }); // Ensure data is always an array
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useFinanceStore;
