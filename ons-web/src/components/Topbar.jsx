"use client";
import { useAppState } from "@/state/AppStateProvider";
import { t, isRTL } from "@/i18n";
import Button from "./Button";
import Logo from "./Logo";

export default function Topbar(){
  const { state, setTheme, setLanguage } = useAppState();
  const lang = state.settings.language;
  const theme = state.settings.theme;

  return (
    <div className="topbar">
      <div className="topbarInner">
        <div className="brand">
          <div style={{ width: 42, height: 42, borderRadius: 14, overflow: "hidden" }}>
            <Logo size={42} />
          </div>
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
            aria-label="Toggle theme"
            title="Theme"
          >
            {theme === "dark" ? t(lang,"common.light") : t(lang,"common.dark")}
          </Button>

          <Button
            variant="secondary"
            onClick={() => setLanguage(lang === "ar" ? "en" : "ar")}
            aria-label="Toggle language"
            title="Language"
          >
            {lang === "ar" ? "EN" : "ع"}
          </Button>
        </div>
      </div>
    </div>
  );
}
