"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";
import Icon3D from "./Icon3D";
import { Home, MoonStar, Sparkles, Settings } from "lucide-react";

const items = [
  { href: "/", key: "home", Icon: Home },
  { href: "/nights", key: "nights", Icon: MoonStar },
  { href: "/eid", key: "eid", Icon: Sparkles },
  { href: "/settings", key: "settings", Icon: Settings },
];

export default function Tabs(){
  const pathname = usePathname();
  const { state } = useAppState();
  const lang = state.settings.language;

  return (
    <nav className="tabs" aria-label="Primary">
      <div className="tabsInner" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {items.map(it => {
          const active = pathname === it.href || (it.href !== "/" && pathname?.startsWith(it.href));
          const label = t(lang, `nav.${it.key}`);
          const Icon = it.Icon;

          return (
            <Link
              key={it.key}
              href={it.href}
              aria-label={label}
              title={label}
              className={`tab ${active ? "tabActive":""}`}
              style={{ justifyContent: "center" }}
            >
              <Icon3D>
                <Icon size={18} />
              </Icon3D>
              <span style={{
                position:"absolute",
                width:1, height:1,
                padding:0, margin:-1,
                overflow:"hidden",
                clip:"rect(0,0,0,0)",
                whiteSpace:"nowrap",
                border:0
              }}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
