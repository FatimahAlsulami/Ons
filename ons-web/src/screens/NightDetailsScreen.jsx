"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";
import { NIGHTS } from "@/data/nights";

export default function NightDetailsScreen({ dayKey }){
  const { state, toggleComplete } = useAppState();
  const lang = state.settings.language;

  const night = useMemo(() => NIGHTS.find(n => n.key === dayKey) || NIGHTS[0], [dayKey]);
  const completed = !!state.completedDays[night.key];

  const title = lang === "ar" ? night.title_ar : night.title_en;
  const challenge = lang === "ar" ? night.challenge_ar : night.challenge_en;
  const hadith = lang === "ar" ? night.hadith_ar : night.hadith_en;
  const impact = lang === "ar" ? night.impact_ar : night.impact_en;

  const verse = night.verse_ar;
  const verseRef = night.verse_ref;

  const isEhsan = night.key === "day21";

  return (
    <div className="container">
      <div style={{ display:"flex", gap: 10, alignItems:"center" }}>
        <a href="/nights" className="backLink">{lang === "ar" ? "←" : "←"} {t(lang,"common.back")}</a>
      </div>

      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <Card style={{ padding: 18, marginTop: 12 }}>
          <div className="h1">{title}</div>
          <div className="muted" style={{ marginTop: 8, fontSize: 12 }}>
            {lang === "ar" ? `اليوم ${night.dayNumber} من 10` : `Day ${night.dayNumber} of 10`}
          </div>
        </Card>

        <Card style={{ padding: 18, marginTop: 12 }}>
          <div className="h2">{t(lang,"night.challenge")}</div>
          <p className="p" style={{ marginTop: 10 }}>{challenge}</p>

          {isEhsan && (
            <Button
              href="https://ehsan.sa"
              target="_blank"
              rel="noopener noreferrer"
              style={{ width:"100%", marginTop: 12 }}
            >
              {lang === "ar" ? "زيارة منصة إحسان →" : "Open Ehsan →"}
            </Button>
          )}
        </Card>

        <Card style={{ padding: 18, marginTop: 12 }}>
          <div className="h2">{t(lang,"night.verse")}</div>
          <div className="verseBox" style={{ marginTop: 10 }}>
            <div style={{ fontSize: 18, lineHeight: 1.9 }}>{verse}</div>
            <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>{verseRef}</div>
          </div>
        </Card>

        <Card style={{ padding: 18, marginTop: 12 }}>
          <div className="h2">{t(lang,"night.hadith")}</div>
          <div className="softCard" style={{ padding: 14, marginTop: 10 }}>
            <div style={{ fontSize: 16, lineHeight: 1.8 }}>{hadith}</div>
          </div>
        </Card>

        <Card style={{ padding: 18, marginTop: 12 }}>
          <div className="h2">{t(lang,"night.impact")}</div>
          <p className="p" style={{ marginTop: 10 }}>{impact}</p>
        </Card>

        <Card style={{ padding: 18, marginTop: 12 }}>
          <Button
            style={{ width:"100%" }}
            onClick={() => toggleComplete(night.key)}
            variant={completed ? "secondary" : "primary"}
          >
            {completed ? t(lang,"night.markIncomplete") : t(lang,"night.markComplete")}
          </Button>
        </Card>
      </motion.div>
    </div>
  );
}
