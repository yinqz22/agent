"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ImagePlus, Trash2 } from "lucide-react";
import { useUser } from "@/lib/user-context";
import Avatar from "./Avatar";

const MAX_NAME = 32;
const AVATAR_PX = 256;

/** Zuschneiden (quadratisch) und verkleinern, damit das Bild klein genug für localStorage bleibt. */
function resizeImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const side = Math.min(img.width, img.height);
      const canvas = document.createElement("canvas");
      canvas.width = AVATAR_PX;
      canvas.height = AVATAR_PX;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(
        img,
        (img.width - side) / 2,
        (img.height - side) / 2,
        side,
        side,
        0,
        0,
        AVATAR_PX,
        AVATAR_PX,
      );
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("load"));
    };
    img.src = url;
  });
}

export default function ProfileForm() {
  const { name, avatar, setName, setAvatar } = useUser();
  const [draft, setDraft] = useState(name);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  // Gespeicherten Namen übernehmen, sobald er aus dem Browser geladen wurde.
  useEffect(() => setDraft(name), [name]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const trimmed = draft.trim();
  const dirty = trimmed !== name;

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!trimmed) {
      setError("Der Name darf nicht leer sein.");
      setSaved(false);
      return;
    }
    setError(null);
    setName(trimmed);
    setSaved(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setSaved(false), 3500);
  }

  async function onFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setAvatarError("Bitte wähle eine Bilddatei aus (PNG, JPG oder WebP).");
      return;
    }
    try {
      setAvatar(await resizeImage(file));
      setAvatarError(null);
    } catch {
      setAvatarError("Das Bild konnte nicht geladen werden. Versuche eine andere Datei.");
    }
  }

  return (
    <>
      <section className="panel" aria-labelledby="profil-heading">
        <div className="panel-head">
          <h2 id="profil-heading">profil</h2>
          <p>So wirst du in AGENT angezeigt.</p>
        </div>
        <form className="field-row" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor="username">Benutzername</label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="nickname"
              maxLength={MAX_NAME}
              value={draft}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "username-error" : undefined}
              onChange={(e) => {
                setDraft(e.target.value);
                setSaved(false);
                setError(null);
              }}
            />
            {error && (
              <p id="username-error" className="field-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="actions">
            <button type="submit" className="btn btn-primary" disabled={!dirty}>
              Änderungen speichern
            </button>
            <span className="status" role="status" data-visible={saved}>
              {saved && (
                <>
                  <Check size={15} strokeWidth={2} aria-hidden="true" /> Gespeichert
                </>
              )}
            </span>
          </div>
        </form>
      </section>

      <section className="panel" aria-labelledby="bild-heading">
        <div className="panel-head">
          <h2 id="bild-heading">profilbild</h2>
          <p>Wird in der Sidebar angezeigt. Ohne Bild erscheinen deine Initialen.</p>
        </div>
        <div className="avatar-row">
          <Avatar name={name} src={avatar} size={64} />
          <div className="actions">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="visually-hidden"
              onChange={onFile}
              tabIndex={-1}
              aria-label="Profilbild auswählen"
            />
            <button type="button" className="btn" onClick={() => fileRef.current?.click()}>
              <ImagePlus size={16} strokeWidth={1.6} aria-hidden="true" />
              Bild auswählen
            </button>
            {avatar && (
              <button type="button" className="btn btn-quiet" onClick={() => setAvatar(null)}>
                <Trash2 size={16} strokeWidth={1.6} aria-hidden="true" />
                Entfernen
              </button>
            )}
          </div>
        </div>
        {avatarError && (
          <p className="field-error" role="alert">
            {avatarError}
          </p>
        )}
      </section>
    </>
  );
}
