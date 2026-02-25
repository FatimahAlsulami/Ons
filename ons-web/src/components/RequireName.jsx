"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "@/state/AppStateProvider";

export default function RequireName({ children }){
  const router = useRouter();
  const { state } = useAppState();

  useEffect(() => {
    if (!state.profile.displayName) router.replace("/onboarding");
  }, [state.profile.displayName, router]);

  if (!state.profile.displayName) return null;
  return children;
}
