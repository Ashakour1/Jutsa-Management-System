import { create } from "zustand";
import { fetchMemberDetailsFromAPI } from "../services/memberServices"

const useMemberStore = create((set) => ({
  MemberDetails: [], // Always starts as an empty array
  loading: false,
  error: null,

  fetchMemberDetails: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchMemberDetailsFromAPI();
      set({ MemberDetails: data || [], loading: false }); // Ensure data is always an array
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useMemberStore;
