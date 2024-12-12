import { create } from "zustand";
import { LoginUser } from "../services/userServices";

const useUserStore = create((set) => ({
  user: null, // Always starts as an empty array
  loading: false,
  error: null,

  login: async (user) => {
    set({ loading: true, error: null });

    try {
      const data = await LoginUser(user);
      set({ user: data, loading: false });
    } catch (e) {
      set({ error: e.message, loading: false });
    }
  },
}));

export default useUserStore;
