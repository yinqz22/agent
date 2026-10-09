import { Moon } from "lucide-react";
import type { Metadata } from "next";
import ProfileForm from "@/components/ProfileForm";

export const metadata: Metadata = { title: "einstellungen – AGENT" };

export default function SettingsPage() {
  return (
    <div className="settings">
      <ProfileForm />

      <section className="panel" aria-labelledby="darstellung-heading">
        <div className="panel-head">
          <h2 id="darstellung-heading">darstellung</h2>
          <p>AGENT verwendet durchgehend das dunkle Design.</p>
        </div>
        <div className="theme-row">
          <Moon size={18} strokeWidth={1.6} aria-hidden="true" />
          <span>Dunkel mit Sandakzenten</span>
          <span className="pill">Standard</span>
        </div>
      </section>
    </div>
  );
}
