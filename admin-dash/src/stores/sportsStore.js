import { create } from "zustand";
import { fetchSportsDetailsFromAPI } from "../services/sportsServices"

const useSportsStore = create((set) => ({
  SportsDetails: [], // Always starts as an empty array
  loading: false,
  error: null,

  fetchSportsDetails: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchSportsDetailsFromAPI();
      set({ SportsDetails: data || [], loading: false }); // Ensure data is always an array
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useSportsStore;
