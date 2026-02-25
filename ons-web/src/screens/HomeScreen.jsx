"use client";
import { useMemo } from "react";
import Card from "@/components/Card";
import SoftCard from "@/components/SoftCard";
import Button from "@/components/Button";
import ProgressDots from "@/components/ProgressDots";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";
import { computeCountdown } from "@/utils/date";
import { NIGHTS } from "@/data/nights";

export default function HomeScreen(){
  const { state } = useAppState();
  const lang = state.settings.language;

  const completedCount = useMemo(
    () => Object.values(state.completedDays).filter(Boolean).length,
    [state.completedDays]
  );

  const countdown = useMemo(
    () => computeCountdown(state.settings.eidDateISO),
    [state.settings.eidDateISO]
  );

  const countdownText =
    countdown.unit === "days"
      ? t(lang, "home.daysLeft", { count: countdown.value })
      : t(lang, "home.hoursLeft", { count: countdown.value });

  const nextNight = useMemo(() => {
    const next = NIGHTS.find(n => !state.completedDays[n.key]);
    return next || NIGHTS[NIGHTS.length - 1];
  }, [state.completedDays]);

  return (
    <div className="container">
      {/* Primary header card */}
      <Card style={{ padding: 18, marginTop: 10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap: 14 }}>
          <div>
            <div className="muted" style={{ fontSize: 12 }}>{t(lang,"home.countdownLabel")}</div>
            <div style={{ fontSize: 28, fontWeight: 950, marginTop: 6, color:"var(--accent)" }}>
              {countdownText}
            </div>
            <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
              {t(lang,"home.eidDateLabel")}: {state.settings.eidDateISO}
            </div>
          </div>

          <div className="iconBig" aria-hidden="true" />
        </div>
      </Card>

      {/* Clear stats (like your reference) */}
      <div className="grid2" style={{ marginTop: 12 }}>
        <SoftCard style={{ padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>{t(lang,"home.completed")}</div>
          <div style={{ fontSize: 26, fontWeight: 950, marginTop: 6 }}>{completedCount}/10</div>
        </SoftCard>

        <SoftCard style={{ padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>{t(lang,"home.streak")}</div>
          <div style={{ fontSize: 26, fontWeight: 950, marginTop: 6, color:"var(--accent2)" }}>{state.streak}</div>
        </SoftCard>

        <SoftCard style={{ padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>{t(lang,"home.bestStreak")}</div>
          <div style={{ fontSize: 26, fontWeight: 950, marginTop: 6, color:"var(--success)" }}>{state.bestStreak}</div>
        </SoftCard>

        <SoftCard style={{ padding: 16 }}>
          <div className="muted" style={{ fontSize: 12 }}>{t(lang,"home.progressLabel")}</div>
          <div style={{ fontSize: 26, fontWeight: 950, marginTop: 6 }}>
            {Math.round((completedCount/10)*100)}%
          </div>
        </SoftCard>
      </div>

      {/* Dots like the reference (clear journey) */}
      <ProgressDots />

      {/* Primary CTA → must navigate to next night */}
      <Card style={{ padding: 18, marginTop: 14 }}>
        <div className="h2">{t(lang,"home.startTonight")}</div>
        <p className="p" style={{ marginTop: 8 }}>
          {lang === "ar" ? nextNight.title_ar : nextNight.title_en}
        </p>

        <Button
          href={`/night/${nextNight.key}`}
          style={{ width:"100%", marginTop: 12 }}
        >
          {t(lang,"common.continue")}
        </Button>
      </Card>
    </div>
  );
}
