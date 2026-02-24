"use client";
import { useAppState } from "@/state/AppStateProvider";
import { t, isRTL } from "@/i18n";
import Button from "./Button";

export default function Topbar(){
  const { state, setTheme, setLanguage } = useAppState();
  const lang = state.settings.language;
  const theme = state.settings.theme;

  return (
    <div className="topbar">
      <div className="topbarInner">
        <div className="brand">
          <img src="/favicon.png" alt="Ons" />
          <div>
            <div className="brandTitle">{t(lang, "common.appName")}</div>
            <div className="muted" style={{ fontSize: 12 }}>
              {state.profile.displayName ? (isRTL(lang) ? `أهلًا ${state.profile.displayName}` : `Hi ${state.profile.displayName}`) : ""}
            </div>
          </div>
        </div>
        <div style={{ display:"flex", gap: 10 }}>
          <Button
            variant="secondary"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? t(lang,"common.light") : t(lang,"common.dark")}
          </Button>
          <Button
            variant="secondary"
            onClick={() => setLanguage(lang === "ar" ? "en" : "ar")}
          >
            {lang === "ar" ? "EN" : "ع"}
          </Button>
        </div>
      </div>
    </div>
  );
}
