import { create } from "zustand";
import {
  fetchMemberDetailsFromAPI,
  registerMember,
} from "../services/memberServices";

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

  register: async (formData) => {
    set({ loading: true, error: null });

    try {
      // Call the API to register the member
      const result = await registerMember(formData);
      set((state) => ({
        // Add the new member to the existing list of members
        MemberDetails: [...state.MemberDetails, result.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useMemberStore;
