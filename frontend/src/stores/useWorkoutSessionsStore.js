import { create } from 'zustand';

export const useWorkoutSessionsStore = create((set) => ({
  sessions: [],
  selectedSession: null,

  setSessions: (sessions) => set({ sessions }),
  setSelectedSession: (session) => set({ selectedSession: session }),

  createSession: (session) =>
    set((state) => ({
      sessions: [...state.sessions, session],
      selectedSession: session,
    })),

  deleteSession: (sessionId) =>
    set((state) => ({
      sessions: state.sessions.filter((s) => s.id !== sessionId),
      selectedSession:
        state.selectedSession && state.selectedSession.id === sessionId
          ? null
          : state.selectedSession,
    })),
}));

// Individual selectors for ctrl+click navigation
export const selectSessions = (state) => state.sessions;
export const selectSelectedSession = (state) => state.selectedSession;
export const selectSetSessions = (state) => state.setSessions;
export const selectSetSelectedSession = (state) => state.setSelectedSession;
export const selectCreateSession = (state) => state.createSession;
export const selectDeleteSession = (state) => state.deleteSession;