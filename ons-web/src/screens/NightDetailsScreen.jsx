"use client";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";
import { NIGHTS } from "@/data/nights";

export default function NightDetailsScreen({ dayKey }){
  const { state, toggleComplete, setReflection } = useAppState();
  const lang = state.settings.language;

  const night = useMemo(() => NIGHTS.find(n => n.key === dayKey) || NIGHTS[0], [dayKey]);
  const completed = !!state.completedDays[night.key];

  const [note, setNote] = useState(state.reflections?.[night.key] || "");

  const title = lang === "ar" ? night.title_ar : night.title_en;
  const challenge = lang === "ar" ? night.challenge_ar : night.challenge_en;
  const hadith = lang === "ar" ? night.hadith_ar : night.hadith_en;

  function onToggle(){
    toggleComplete(night.key, !completed);
  }

  return (
    <div className="container">
      <a href="/nights">
        <Button variant="secondary">← {lang === "ar" ? "رجوع" : "Back"}</Button>
      </a>

      <motion.div
        initial={{ opacity:0, y: 10 }}
        animate={{ opacity:1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="h1" style={{ marginTop: 14 }}>{title}</h1>

        <Card style={{ padding: 18, marginTop: 14 }}>
          <div className="h2">{t(lang,"night.challenge")}</div>
          <p className="p" style={{ marginTop: 10 }}>{challenge}</p>
          {night.link ? (
            <a href={night.link} target="_blank" rel="noreferrer">
              <Button variant="secondary" style={{ width:"100%", marginTop: 12 }}>{t(lang,"night.openEhsan")}</Button>
            </a>
          ) : null}
        </Card>

        <Card style={{ padding: 18, marginTop: 12 }}>
          <div className="h2">{t(lang,"night.quranVerse")}</div>
          <p style={{ marginTop: 10, lineHeight: 1.9 }}>{night.verse_ar}</p>
          <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>{night.verse_ref}</div>
        </Card>

        <Card style={{ padding: 18, marginTop: 12 }}>
          <div className="h2">{t(lang,"night.hadith")}</div>
          <p className="p" style={{ marginTop: 10 }}>{hadith}</p>
        </Card>

        <Card style={{ padding: 18, marginTop: 12 }}>
          <div className="h2">{t(lang,"night.reflection")}</div>
          <textarea
            className="input"
            style={{ minHeight: 96, marginTop: 10, resize: "vertical" }}
            value={note}
            onChange={(e)=>setNote(e.target.value)}
            onBlur={() => setReflection(night.key, note)}
            placeholder={t(lang,"night.reflectionPlaceholder")}
          />
        </Card>

        <motion.div
          style={{ marginTop: 14 }}
          animate={completed ? { scale:[1,1.02,1] } : { scale: 1 }}
          transition={{ duration: 0.25 }}
        >
          <Button
            style={{ width:"100%" }}
            variant={completed ? "secondary" : "primary"}
            onClick={onToggle}
          >
            {completed ? t(lang,"night.markIncomplete") : t(lang,"night.markComplete")}
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
