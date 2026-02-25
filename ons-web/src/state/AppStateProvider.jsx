"use client";
import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { loadState, saveState, clearState } from "@/utils/storage";
import { makeDefaultState } from "@/state/defaultState";
import { nextStreak } from "@/utils/streak";
import { todayISO } from "@/utils/date";

const Ctx = createContext(null);

function reducer(state, action){
  switch(action.type){
    case "HYDRATE":
      return action.state || state;

    case "SET_LANGUAGE":
      return { ...state, settings: { ...state.settings, language: action.value } };

    case "SET_THEME":
      return { ...state, settings: { ...state.settings, theme: action.value } };

    case "SET_EID":
      return { ...state, settings: { ...state.settings, eidDateISO: action.value } };

    case "SET_NAME":
      return { ...state, profile: { ...state.profile, displayName: action.value } };

    case "TOGGLE_COMPLETE": {
      const { dayKey, value } = action;
      const completedDays = { ...state.completedDays, [dayKey]: value };

      let streak = state.streak;
      let bestStreak = state.bestStreak;
      let lastCompletedDate = state.lastCompletedDate;

      if (value) {
        const ns = nextStreak(lastCompletedDate, streak);
        streak = ns;
        bestStreak = Math.max(bestStreak, ns);
        lastCompletedDate = todayISO();
      }

      return { ...state, completedDays, streak, bestStreak, lastCompletedDate };
    }

    case "SET_REFLECTION":
      return { ...state, reflections: { ...state.reflections, [action.dayKey]: action.value } };

    case "RESET":
      return makeDefaultState();

    default:
      return state;
  }
}

export function AppStateProvider({ children }){
  const [state, dispatch] = useReducer(reducer, makeDefaultState());

  useEffect(() => {
    const s = loadState();
    if (s) dispatch({ type:"HYDRATE", state: s });
  }, []);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const api = useMemo(() => ({
    state,
    setLanguage: (v) => dispatch({ type:"SET_LANGUAGE", value: v }),
    setTheme: (v) => dispatch({ type:"SET_THEME", value: v }),
    setEidDate: (v) => dispatch({ type:"SET_EID", value: v }),
    setName: (v) => dispatch({ type:"SET_NAME", value: v }),
    toggleComplete: (dayKey, value) => dispatch({ type:"TOGGLE_COMPLETE", dayKey, value }),
    setReflection: (dayKey, value) => dispatch({ type:"SET_REFLECTION", dayKey, value }),
    reset: () => { clearState(); dispatch({ type:"RESET" }); },
  }), [state]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useAppState(){
  const v = useContext(Ctx);
  if (!v) throw new Error("useAppState must be used within AppStateProvider");
  return v;
}
