import { create } from "zustand";
import { deleteFinanceDetails, fetchFinanceDetailsFromAPI,createFinance } from "../services/financeServices"

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
  deleteFinanceDetails: async (id) => {
    set({ loading: true, error: null }); // Set loading to true and clear previous errors

    try {
      // Call API to delete the finance detail
      await deleteFinanceDetails(id); 

      // Update the local state by removing the deleted item from the financeDetails array
      set((state) => ({
        financeDetails: state.financeDetails.filter(item => item.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false }); // Set error state if delete fails
    }
  },
  createFinanceDetails: async (data) => {
    set({ loading: true, error: null });  // Set loading to true and clear previous errors

    try {
      // Call the createFinance API function to send the data
      const result = await createFinance(data); 

      // Update the store with the new finance details
      set((state) => ({
        financeDetails: [...state.financeDetails, result], // Assuming result contains the created finance data
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });  // Set error state if the API request fails
    }
  },
}));

export default useFinanceStore;
