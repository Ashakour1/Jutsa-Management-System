import { create } from "zustand";
import { fetchCompetitorDetailsFromAPI } from "../services/competitorServices"

const useCompetitorStore = create((set) => ({
  CompetitorDetails: [], // Always starts as an empty array
  loading: false,
  error: null,

  fetchCompetitorDetails: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchCompetitorDetailsFromAPI();
      set({ CompetitorDetails: data || [], loading: false }); // Ensure data is always an array
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useCompetitorStore;
