"use client";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";
import { NIGHTS } from "@/data/nights";

export default function NightsScreen(){
  const { state } = useAppState();
  const lang = state.settings.language;

  return (
    <div className="container">
      <h1 className="h1">{t(lang,"nights.title")}</h1>

      <div style={{ marginTop: 14, display:"grid", gap: 12 }}>
        {NIGHTS.map(n => {
          const done = !!state.completedDays[n.key];
          return (
            <a key={n.key} href={`/night/${n.key}`}>
              <Card style={{ padding: 16, display:"flex", alignItems:"center", justifyContent:"space-between", gap: 12 }}>
                <div>
                  <div className="h2">{lang === "ar" ? n.title_ar : n.title_en}</div>
                  <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
                    {done ? t(lang,"nights.completed") : t(lang,"nights.incomplete")}
                  </div>
                </div>
                <div style={{
                  padding:"8px 12px",
                  borderRadius: 999,
                  background: done ? "color-mix(in oklab, var(--success) 16%, transparent)" : "color-mix(in oklab, var(--accent) 14%, transparent)",
                  border: "1px solid var(--border)",
                  fontWeight: 950
                }}>
                  {done ? "✓" : "•"}
                </div>
              </Card>
            </a>
          );
        })}
      </div>
    </div>
  );
}
