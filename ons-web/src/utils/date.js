export function todayISO(){
  const d = new Date();
  d.setHours(0,0,0,0);
  return d.toISOString().slice(0,10);
}

export function parseISODate(s){
  if (!s || typeof s !== "string") return null;
  const m = /^\d{4}-\d{2}-\d{2}$/.test(s.trim());
  if (!m) return null;
  const d = new Date(s.trim() + "T00:00:00");
  return Number.isNaN(d.getTime()) ? null : d;
}

export function msUntil(d){ return d.getTime() - Date.now(); }

export function computeCountdown(eidISO){
  const d = parseISODate(eidISO);
  if (!d) return { unit: "days", value: 0 };
  const ms = msUntil(d);
  if (ms <= 0) return { unit: "days", value: 0 };
  const minutes = Math.floor(ms / (1000*60));
  const hours = Math.floor(ms / (1000*60*60));
  const days = Math.floor(ms / (1000*60*60*24));
  if (days >= 1) return { unit: "days", value: days };
  if (hours >= 1) return { unit: "hours", value: hours };
  return { unit: "minutes", value: minutes };
}

export function daysBetween(aISO,bISO){
  const a = new Date(aISO + "T00:00:00");
  const b = new Date(bISO + "T00:00:00");
  return Math.round((b.getTime()-a.getTime())/(1000*60*60*24));
}
