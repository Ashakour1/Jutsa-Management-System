import { create } from "zustand";
import { fetchPositionDetailsFromAPI, registerPosition } from "../services/positionServices";

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

  register: async (formData) => {
    set({ loading: true, error: null });

    try {
      // Call the API to register the position
      const result = await registerPosition(formData);
      set((state) => ({
        // Add the new position to the existing list of positions
        PositionsDetails: [...state.PositionsDetails, result.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default usePositionStore;
