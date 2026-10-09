"use client";

import { LayoutDashboard } from "lucide-react";
import EmptyState from "@/components/EmptyState";
import { useUser } from "@/lib/user-context";

export default function DashboardPage() {
  const { name, ready } = useUser();

  return (
    <>
      <section className="intro">
        <p className="intro-title" data-ready={ready}>
          Willkommen zurück, <span className="intro-name">{name}</span>.
        </p>
        <p className="intro-text">Hier laufen später deine Bereiche zusammen.</p>
      </section>

      <EmptyState
        icon={<LayoutDashboard size={22} strokeWidth={1.4} />}
        title="Noch nichts zu sehen"
        text="Sobald du Funktionen hinzufügst, erscheinen sie hier."
      />
    </>
  );
}
