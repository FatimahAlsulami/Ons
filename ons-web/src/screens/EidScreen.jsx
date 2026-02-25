"use client";
import { useMemo, useRef, useState } from "react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";
import { toPng } from "html-to-image";

export default function EidScreen(){
  const { state } = useAppState();
  const lang = state.settings.language;
  const ref = useRef(null);
  const [busy, setBusy] = useState(false);

  const completedCount = useMemo(
    () => Object.values(state.completedDays).filter(Boolean).length,
    [state.completedDays]
  );

  // ✅ Locked until ALL challenges are completed (10/10)
  const unlocked = completedCount >= 10;

  async function shareCard(){
    if (!unlocked) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(ref.current, { cacheBust: true, pixelRatio: 2 });

      // Convert dataUrl → File (for Web Share API)
      const res = await fetch(dataUrl);
      const blob = await res.blob();
      const file = new File([blob], "ons-eid-card.png", { type: "image/png" });

      // ✅ If the device supports sharing (WhatsApp, X, Instagram, Snapchat, etc.)
      const canShare =
        typeof navigator !== "undefined" &&
        !!navigator.share &&
        !!navigator.canShare &&
        navigator.canShare({ files: [file] });

      if (canShare) {
        await navigator.share({
          title: "أُنس (Ons) — Eid Card",
          text: "Ons — Last Ten Nights Journey",
          files: [file],
        });
        return;
      }

      // Fallback: download (user can upload to any social app)
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "ons-eid-card.png";
      a.click();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="container">
      <h1 className="h1">{t(lang,"eid.title")}</h1>

      {!unlocked ? (
        <Card style={{ padding: 18, marginTop: 14 }}>
          <div className="h2">{t(lang,"eid.lockedTitle")}</div>
          <p className="p" style={{ marginTop: 10 }}>{t(lang,"eid.lockedBody")}</p>
          <div style={{ marginTop: 12, fontWeight: 950 }}>
            {t(lang,"eid.nightsCompleted", { count: completedCount })}
          </div>
        </Card>
      ) : (
        <>
          <div ref={ref} style={{
            marginTop: 14,
            padding: 22,
            borderRadius: 26,
            border: "1px solid var(--border)",
            background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 16%, var(--card)), color-mix(in oklab, var(--accent2) 12%, var(--card)))",
            boxShadow: "0 20px 44px rgba(0,0,0,.18)",
            position:"relative",
            overflow:"hidden"
          }}>
            <div style={{
              position:"absolute", top:-120, right:-120, width: 260, height: 260, borderRadius: 999,
              background:"color-mix(in oklab, var(--accent) 26%, transparent)"
            }}/>
            <div style={{
              position:"absolute", bottom:-150, left:-150, width: 320, height: 320, borderRadius: 999,
              background:"color-mix(in oklab, var(--accent2) 22%, transparent)"
            }}/>
            <div style={{ position:"relative" }}>
              <div style={{ fontSize: 24, fontWeight: 950 }}>{t(lang,"eid.unlockedTitle")}</div>
              <div className="p" style={{ marginTop: 10 }}>{t(lang,"eid.unlockedBody")}</div>
              <div style={{ marginTop: 14, display:"grid", gap: 10 }}>
                <div className="softCard" style={{ padding: 12 }}>{t(lang,"eid.nightsCompleted", { count: completedCount })}</div>
                <div className="softCard" style={{ padding: 12 }}>{t(lang,"home.streak")}: {state.streak}</div>
                <div className="softCard" style={{ padding: 12 }}>{t(lang,"home.bestStreak")}: {state.bestStreak}</div>
              </div>
              <div className="muted" style={{ marginTop: 14, fontSize: 12 }}>Ons — Last Ten Nights Journey</div>
            </div>
          </div>

          <Card style={{ padding: 18, marginTop: 12 }}>
            <Button style={{ width:"100%" }} onClick={shareCard} disabled={busy}>
              {busy ? "…" : t(lang,"eid.shareCTA")}
            </Button>
            <div className="muted" style={{ marginTop: 10, fontSize: 12 }}>
              {lang === "ar"
                ? "إذا ما ظهر زر المشاركة في جهازك، سيتم تحميل الصورة لتشاركها يدويًا في أي تطبيق."
                : "If sharing isn’t available on your device, the image will download so you can post it anywhere."}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
