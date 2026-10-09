"use client";

import { Bell } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { notifications } from "@/lib/notifications";

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="bell" ref={wrapperRef}>
      <button
        ref={buttonRef}
        type="button"
        className="nav-link"
        data-tooltip="benachrichtigungen"
        aria-label="Benachrichtigungen"
        aria-expanded={open}
        aria-controls={panelId}
        data-active={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Bell size={20} strokeWidth={1.6} />
        {unread > 0 && <span className="bell-dot" aria-hidden="true" />}
      </button>

      {open && (
        <div id={panelId} className="popover" role="dialog" aria-label="Benachrichtigungen">
          <div className="popover-head">benachrichtigungen</div>
          {notifications.length === 0 ? (
            <div className="popover-empty">
              <Bell size={20} strokeWidth={1.4} aria-hidden="true" />
              <p>Du bist auf dem neuesten Stand.</p>
            </div>
          ) : (
            <ul className="popover-list">
              {notifications.map((n) => (
                <li key={n.id}>
                  <strong>{n.title}</strong>
                  {n.body && <span>{n.body}</span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
