"use client";
import { useEffect } from "react";
import Topbar from "@/components/Topbar";
import Tabs from "@/components/Tabs";
import { useAppState } from "@/state/AppStateProvider";
import { isRTL } from "@/i18n";

export default function Shell({ children }){
  const { state } = useAppState();
  const lang = state.settings.language;
  const theme = state.settings.theme;

  useEffect(() => {
    document.documentElement.setAttribute("dir", isRTL(lang) ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Topbar />
      {children}
      <Tabs />
    </>
  );
}
