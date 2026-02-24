"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppState } from "@/state/AppStateProvider";
import { t } from "@/i18n";
import Icon3D from "./Icon3D";

const items = [
  { href: "/", key: "home", icon: "/favicon.png" },
  { href: "/nights", key: "nights", icon: "/favicon.png" },
  { href: "/eid", key: "eid", icon: "/favicon.png" },
  { href: "/settings", key: "settings", icon: "/favicon.png" },
];

export default function Tabs(){
  const pathname = usePathname();
  const { state } = useAppState();
  const lang = state.settings.language;

  return (
    <nav className="tabs" aria-label="Primary">
      <div className="tabsInner">
        {items.map(it => {
          const active = pathname === it.href || (it.href !== "/" && pathname?.startsWith(it.href));
          return (
            <Link key={it.key} href={it.href} className={`tab ${active ? "tabActive":""}`}>
              <Icon3D src={it.icon} alt="" />
              <span>{t(lang, `nav.${it.key}`)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
