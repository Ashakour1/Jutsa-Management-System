import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LoginUser } from "../services/userServices"; // Assuming this is your API call to login

const useUserStore = create()(
  persist(
    (set) => ({
      user: null, // The user state, initially null
      loading: false,
      error: null,

      login: async (user) => {
        set({ loading: true, error: null });

        try {
          const data = await LoginUser(user); // Call to the login API
          const { token, user: userData } = data; // Destructure token and user

          // Save the user and token in the state
          set({ user: userData, loading: false });

          // Save token to local storage (for session management)
          localStorage.setItem("token", token);
        } catch (e) {
          // Log error for debugging and set error state
          console.error("Login error:", e);
          set({
            error: "An error occurred",
            loading: false,
          });
        }
      },

      logout: () => {
        set({ user: null, error: null }); // Reset error state when logging out
        localStorage.removeItem("token");
      },
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage), // Persistence storage
    }
  )
);

export default useUserStore;
