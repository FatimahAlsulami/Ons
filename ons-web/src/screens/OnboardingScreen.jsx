"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import Button from "@/components/Button";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";

export default function OnboardingScreen(){
  const router = useRouter();
  const { state, setName } = useAppState();
  const lang = state.settings.language;
  const [name, setLocal] = useState(state.profile.displayName || "");

  function submit(){
    const v = name.trim();
    if (!v) return;
    setName(v);
    router.replace("/");
  }

  return (
    <div className="container">
      <Card style={{ padding: 18 }}>
        <h1 className="h1">{t(lang,"onboarding.title")}</h1>
        <p className="p" style={{ marginTop: 8 }}>{t(lang,"onboarding.subtitle")}</p>

        <div style={{ marginTop: 14 }}>
          <input className="input" value={name} onChange={(e)=>setLocal(e.target.value)} placeholder={t(lang,"onboarding.placeholder")} />
          <p className="muted" style={{ margin: "10px 2px 0", fontSize: 12 }}>{t(lang,"onboarding.hint")}</p>
        </div>

        <Button className="" style={{ width:"100%", marginTop: 14 }} onClick={submit}>
          {t(lang,"onboarding.cta")}
        </Button>
      </Card>
    </div>
  );
}
