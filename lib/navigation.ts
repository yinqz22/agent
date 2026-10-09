import { LayoutDashboard, Settings, type LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  /** Wird als Seitenüberschrift und als Tooltip verwendet (klein geschrieben). */
  label: string;
  icon: LucideIcon;
  /** Position in der Sidebar: oben (Hauptnavigation) oder unten (Werkzeuge). */
  area: "main" | "footer";
};

/**
 * Zentrale Navigationsliste.
 * Neue Bereiche später einfach hier eintragen und unter app/<route>/page.tsx anlegen –
 * Sidebar, Tooltip und Seitenüberschrift passen sich automatisch an.
 */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "dashboard", icon: LayoutDashboard, area: "main" },
  { href: "/einstellungen", label: "einstellungen", icon: Settings, area: "footer" },
];

export function getPageLabel(pathname: string): string {
  const match = NAV_ITEMS.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );
  return match?.label ?? "dashboard";
}

export function isActive(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}
