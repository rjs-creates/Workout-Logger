import { create } from "zustand";

export const useWorkoutsStore = create((set) => ({
  workouts: null,
  setWorkouts: (workouts) => set({ workouts }),
  createWorkout: (workout) =>
    set((state) => ({
      workouts: [workout, ...(state.workouts || [])],
    })),
  deleteWorkout: (workout) =>
    set((state) => ({
      workouts: (state.workouts || []).filter((w) => w._id !== workout._id),
    })),
}));