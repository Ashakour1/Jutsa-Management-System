import { create } from "zustand";
import { fetchPositionDetailsFromAPI } from "../services/positionServices"

const usePositionStore = create((set) => ({
  PositionsDetails: [], // Always starts as an empty array
  loading: false,
  error: null,

  fetchPositionDetails: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchPositionDetailsFromAPI();
      set({ PositionsDetails: data || [], loading: false }); // Ensure data is always an array
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default usePositionStore;
