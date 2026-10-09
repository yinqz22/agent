"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActive } from "@/lib/navigation";
import { useUser } from "@/lib/user-context";
import Avatar from "./Avatar";
import NotificationBell from "./NotificationBell";

export default function Sidebar() {
  const pathname = usePathname();
  const { name, avatar } = useUser();
  const main = NAV_ITEMS.filter((i) => i.area === "main");
  const footer = NAV_ITEMS.filter((i) => i.area === "footer");

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav" aria-label="Hauptnavigation">
        <ul className="nav-group nav-main">
          {main.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="nav-link"
                data-tooltip={label}
                data-active={isActive(pathname, href)}
                aria-label={label}
                aria-current={isActive(pathname, href) ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={1.6} />
              </Link>
            </li>
          ))}
        </ul>

        <ul className="nav-group nav-footer">
          {footer.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link
                href={href}
                className="nav-link"
                data-tooltip={label}
                data-active={isActive(pathname, href)}
                aria-label={label}
                aria-current={isActive(pathname, href) ? "page" : undefined}
              >
                <Icon size={20} strokeWidth={1.6} />
              </Link>
            </li>
          ))}
          <li>
            <NotificationBell />
          </li>
          <li>
            <Link
              href="/einstellungen"
              className="nav-link nav-avatar"
              data-tooltip="profil"
              aria-label={`Profil von ${name} und Einstellungen`}
            >
              <Avatar name={name} src={avatar} size={34} />
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
