"use client";
import { NIGHTS } from "@/data/nights";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";

export default function ProgressDots(){
  const { state } = useAppState();
  const lang = state.settings.language;

  const entries = NIGHTS.map(n => ({
    key: n.key,
    num: n.dayNumber,
    done: !!state.completedDays[n.key],
  }));

  const completed = entries.filter(e => e.done).length;
  const percent = Math.round((completed / 10) * 100);

  return (
    <div className="card" style={{ padding: 18, marginTop: 12 }}>
      <div style={{ display:"flex", alignItems:"baseline", justifyContent:"space-between", gap: 10 }}>
        <div style={{ fontWeight: 950, fontSize: 16 }}>{t(lang,"home.journey")}</div>
        <div style={{ fontWeight: 950, color:"var(--accent)" }}>{percent}%</div>
      </div>

      <div style={{ marginTop: 12, display:"flex", gap: 10, flexWrap:"wrap" }}>
        {entries.map(e => (
          <div
            key={e.key}
            title={`${t(lang,"home.night")} ${e.num}`}
            style={{
              width: 36, height: 36,
              borderRadius: 999,
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              fontWeight: 950,
              border: `1px solid ${e.done ? "color-mix(in oklab, var(--accent) 50%, var(--border))" : "var(--border)"}`,
              background: e.done ? "color-mix(in oklab, var(--accent) 14%, transparent)" : "var(--bg2)",
              boxShadow: e.done ? "0 10px 20px rgba(124,58,237,.14)" : "none"
            }}
          >
            {e.done ? "✓" : e.num}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 14, height: 10, borderRadius: 999, background:"var(--bg2)", border:"1px solid var(--border)", overflow:"hidden" }}>
        <div style={{ width:`${percent}%`, height:"100%", background:"linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent) 55%, white))" }} />
      </div>
    </div>
  );
}
