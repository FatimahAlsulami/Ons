"use client";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";

export default function SettingsScreen(){
  const { state, setTheme, setLanguage, setEidDate, setName, reset } = useAppState();
  const lang = state.settings.language;

  return (
    <div className="container">
      <h1 className="h1">{t(lang,"settings.title")}</h1>

      <Card style={{ padding: 18, marginTop: 14 }}>
        <div className="h2">{t(lang,"settings.name")}</div>
        <input
          className="input"
          style={{ marginTop: 10 }}
          value={state.profile.displayName}
          onChange={(e)=>setName(e.target.value)}
          placeholder={t(lang,"onboarding.placeholder")}
        />
      </Card>

      <Card style={{ padding: 18, marginTop: 12 }}>
        <div className="h2">{t(lang,"settings.appearance")}</div>
        <div style={{ display:"flex", gap: 10, marginTop: 12 }}>
          <Button variant={state.settings.theme === "light" ? "primary" : "secondary"} onClick={()=>setTheme("light")} style={{ flex: 1 }}>
            {t(lang,"common.light")}
          </Button>
          <Button variant={state.settings.theme === "dark" ? "primary" : "secondary"} onClick={()=>setTheme("dark")} style={{ flex: 1 }}>
            {t(lang,"common.dark")}
          </Button>
        </div>
      </Card>

      <Card style={{ padding: 18, marginTop: 12 }}>
        <div className="h2">{t(lang,"settings.language")}</div>
        <div style={{ display:"flex", gap: 10, marginTop: 12 }}>
          <Button variant={lang === "ar" ? "primary" : "secondary"} onClick={()=>setLanguage("ar")} style={{ flex: 1 }}>العربية</Button>
          <Button variant={lang === "en" ? "primary" : "secondary"} onClick={()=>setLanguage("en")} style={{ flex: 1 }}>English</Button>
        </div>
      </Card>

      <Card style={{ padding: 18, marginTop: 12 }}>
        <div className="h2">{t(lang,"settings.eidDate")}</div>
        <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>{t(lang,"settings.eidDateHint")}</div>
        <input
          className="input"
          style={{ marginTop: 10 }}
          value={state.settings.eidDateISO}
          onChange={(e)=>setEidDate(e.target.value)}
          placeholder="2026-03-19"
        />
      </Card>

      <Card style={{ padding: 18, marginTop: 12 }}>
        <div className="h2">{t(lang,"settings.data")}</div>
        <Button variant="danger" style={{ width:"100%", marginTop: 12 }} onClick={reset}>
          {t(lang,"settings.resetProgress")}
        </Button>
      </Card>
    </div>
  );
}
