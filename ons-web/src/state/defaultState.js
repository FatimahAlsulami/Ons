export function makeDefaultState(){
  return {
    profile: { displayName: "" },
    completedDays: {
      day21:false, day22:false, day23:false, day24:false, day25:false,
      day26:false, day27:false, day28:false, day29:false, day30:false
    },
    reflections: {
      day21:"", day22:"", day23:"", day24:"", day25:"",
      day26:"", day27:"", day28:"", day29:"", day30:""
    },
    streak: 0,
    bestStreak: 0,
    lastCompletedDate: null,
    settings: {
      language: "ar",
      theme: "light", // light | dark
      eidDateISO: "2026-03-19"
    }
  };
}
