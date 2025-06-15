import { create } from 'zustand';

export const useWorkoutSessionsStore = create((set) => ({
  workoutSessions: [],
  currentWorkoutSession: null,

  setWorkoutSessions: (workoutSessions) => set({ workoutSessions }),
  setCurrentWorkoutSession: (workoutSession) => set({ currentWorkoutSession: workoutSession }),

  addWorkoutSession: (workoutSession) =>
    set((state) => ({
      workoutSessions: [...state.workoutSessions, workoutSession],
      currentWorkoutSession: workoutSession,
    })),

  removeWorkoutSession: (workoutSessionId) =>
    set((state) => ({
      workoutSessions: state.workoutSessions.filter((s) => s.id !== workoutSessionId),
      currentWorkoutSession:
        state.currentWorkoutSession && state.currentWorkoutSession.id === workoutSessionId
          ? null
          : state.currentWorkoutSession,
    })),
}));

// State selectors
export const selectWorkoutSessions = (state) => state.workoutSessions;
export const selectCurrentWorkoutSession = (state) => state.currentWorkoutSession;

// Action exports (no 'select' prefix)
export const setWorkoutSessions = (state) => state.setWorkoutSessions;
export const setCurrentWorkoutSession = (state) => state.setCurrentWorkoutSession;
export const addWorkoutSession = (state) => state.addWorkoutSession;
export const removeWorkoutSession = (state) => state.removeWorkoutSession;