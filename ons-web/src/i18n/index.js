import en from "./en";
import ar from "./ar";

const dict = { en, ar };

export function t(lang, key, params) {
  const parts = key.split(".");
  let cur = dict[lang] || dict.en;
  for (const p of parts) cur = cur?.[p];
  if (typeof cur !== "string") return key;

  if (!params) return cur;
  return cur.replace(/\{\{(\w+)\}\}/g, (_, k) => String(params[k] ?? ""));
}

export function isRTL(lang){ return lang === "ar"; }
