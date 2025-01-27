import { create } from "zustand";
import {
    addActivity,
  deleteActivity,
  FecthActivities,
  fetchActivityById,
  updateActivity,
} from "../services/activityServices";
// import { registerActivity } from "../../../Backend/controllers/activity-controller";

const useActivityStore = create((set) => ({
  ActivitiesDetails: [],
  loading: false,
  error: null,

  // Fetch all activities
  fetchActivities: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await FecthActivities();

      set({
        ActivityDetails: data || [],
        loading: false,
      });
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },

  // Fetch activity by ID
  fetchActivityById: async (id) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const data = await fetchActivityById(id);

      set({
        ActivityDetails: data,
        loading: false,
      });

      return data;
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });

      throw err;
    }
  },

  // Register activity
  registerActivity: async (activityData) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const result = await addActivity(activityData);

      set((state) => ({
        ActivityDetails: [...state.ActivityDetails, result.data],
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },

  // Update activity

  updateActivity: async (id, updatedData) => {
    set({
      loading: true,
      error: null,
    });

    try {
      const result = await updateActivity(id, updatedData);

      set((state) => ({
        ActivityDetails: state.ActivityDetails.map((activity) =>
          activity.id === id ? result.data : activity
        ),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },

  // Delete activity

  deleteActivity: async (id) => {
    set({
      loading: true,
      error: null,
    });

    try {
      await deleteActivity(id);

      set((state) => ({
        ActivityDetails: state.ActivityDetails.filter(
          (activity) => activity.id !== id
        ),
        loading: false,
      }));
    } catch (err) {
      set({
        error: err.message,
        loading: false,
      });
    }
  },
}));

export default useActivityStore;
