import { create } from "zustand";
import { fetchFinanceDetailsFromAPI, addFinance, updateFinance, deleteFinance } from "../services/financeServices";

const useFinanceStore = create((set) => ({
  financeDetails: [], 
  loading: false,
  error: null,

  fetchFinanceDetails: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchFinanceDetailsFromAPI();
      set({ financeDetails: data || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  addFinanceDetail: async (financeDetail) => {
    set({ loading: true, error: null });

    try {
      const data = await addFinance(financeDetail);
      set((state) => ({
        financeDetails: [...state.financeDetails, data],
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateFinanceDetail: async (id, updatedData) => {
    set({ loading: true, error: null });

    try {
      const data = await updateFinance(id, updatedData);
      set((state) => ({
        financeDetails: state.financeDetails.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        ),
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteFinanceDetail: async (id) => {
    set({ loading: true, error: null });

    try {
      await deleteFinance(id);
      set((state) => ({
        financeDetails: state.financeDetails.filter((item) => item.id !== id),
        loading: false
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useFinanceStore;
