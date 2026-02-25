"use client";
import { useMemo } from "react";
import Card from "@/components/Card";
import SoftCard from "@/components/SoftCard";
import Button from "@/components/Button";
import { useAppState } from "@/state/AppStateProvider";
import { t, isRTL } from "@/i18n";
import { computeCountdown } from "@/utils/date";
import { NIGHTS } from "@/data/nights";
import ProgressDots from "@/components/ProgressDots";

export default function HomeScreen(){
  const { state } = useAppState();
  const lang = state.settings.language;

  const completedCount = useMemo(() => Object.values(state.completedDays).filter(Boolean).length, [state.completedDays]);
  const countdown = useMemo(() => computeCountdown(state.settings.eidDateISO), [state.settings.eidDateISO]);

  const countdownText = countdown.unit === "days"
    ? t(lang, "home.daysLeft", { count: countdown.value })
    : countdown.unit === "hours"
      ? t(lang, "home.hoursLeft", { count: countdown.value })
      : t(lang, "home.minutesLeft", { count: countdown.value });

  const nextNight = useMemo(() => {
    const idx = NIGHTS.findIndex(n => !state.completedDays[n.key]);
    return idx === -1 ? NIGHTS[NIGHTS.length-1] : NIGHTS[idx];
  }, [state.completedDays]);

  return (
    <div className="container">
      <h1 className="h1">{t(lang,"home.title")}</h1>

      <ProgressDots />

      <Card style={{ padding: 18, marginTop: 14 }}>
        <div style={{ display:"flex", justifyContent:"space-between", gap: 12, alignItems:"center" }}>
          <div>
            <div className="h2">{t(lang,"home.eidCountdown")}</div>
            <div style={{ fontSize: 22, fontWeight: 950, color:"var(--accent)", marginTop: 8 }}>
              {countdownText}
            </div>
            <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
              {t(lang,"home.noteEidDate", { date: state.settings.eidDateISO })}
            </div>
          </div>
          <div style={{
            width: 86, height: 86, borderRadius: 26,
            background: "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--accent) 70%, white), color-mix(in oklab, var(--accent) 55%, black))",
            boxShadow: "0 18px 36px rgba(124,58,237,.22)",
            border: "1px solid var(--border)"
          }} />
        </div>
      </Card>

      <div className="grid2" style={{ marginTop: 12 }}>
        <SoftCard style={{ padding: 14 }}>
          <div className="muted" style={{ fontSize: 12 }}>{t(lang,"home.completed")}</div>
          <div style={{ fontSize: 22, fontWeight: 950, marginTop: 6 }}>{completedCount}/10</div>
        </SoftCard>
        <SoftCard style={{ padding: 14 }}>
          <div className="muted" style={{ fontSize: 12 }}>{t(lang,"home.streak")}</div>
          <div style={{ fontSize: 22, fontWeight: 950, marginTop: 6, color:"var(--accent2)" }}>{state.streak}</div>
        </SoftCard>
        <SoftCard style={{ padding: 14 }}>
          <div className="muted" style={{ fontSize: 12 }}>{t(lang,"home.bestStreak")}</div>
          <div style={{ fontSize: 22, fontWeight: 950, marginTop: 6, color:"var(--success)" }}>{state.bestStreak}</div>
        </SoftCard>
        <SoftCard style={{ padding: 14 }}>
          <div className="muted" style={{ fontSize: 12 }}>—</div>
          <div style={{ fontSize: 14, fontWeight: 900, marginTop: 10 }}>
            {isRTL(lang) ? "عمق. اتساق. لطف." : "Depth. Consistency. Mercy."}
          </div>
        </SoftCard>
      </div>

      <Card style={{ padding: 18, marginTop: 14 }}>
        <div className="h2">{t(lang,"home.startTonight")}</div>
        <p className="p" style={{ marginTop: 8 }}>
          {lang === "ar" ? nextNight.title_ar : nextNight.title_en}
        </p>
        <a href={`/night/${nextNight.key}`}>
          <Button style={{ width:"100%", marginTop: 12 }}>{t(lang,"common.continue")}</Button>
        </a>
      </Card>
    </div>
  );
}
