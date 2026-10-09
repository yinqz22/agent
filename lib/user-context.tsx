"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "agent:user";
const DEFAULT_NAME = "Benutzer";

type StoredUser = { name: string; avatar: string | null };

type UserContextValue = {
  name: string;
  avatar: string | null;
  /** true, sobald gespeicherte Werte aus dem Browser geladen wurden */
  ready: boolean;
  setName: (name: string) => void;
  setAvatar: (avatar: string | null) => void;
};

const UserContext = createContext<UserContextValue | null>(null);

function readStored(): StoredUser | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredUser>;
    return {
      name: typeof parsed.name === "string" && parsed.name.trim() ? parsed.name : DEFAULT_NAME,
      avatar: typeof parsed.avatar === "string" ? parsed.avatar : null,
    };
  } catch {
    return null;
  }
}

function writeStored(user: StoredUser) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // Speicher voll oder nicht verfügbar (z. B. privater Modus): Zustand bleibt für die Sitzung erhalten.
  }
}

/**
 * Hält Benutzername und Profilbild im Anwendungszustand.
 * Persistenz: nur lokal im Browser (localStorage) – es gibt kein Backend.
 */
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<StoredUser>({ name: DEFAULT_NAME, avatar: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (stored) setUser(stored);
    setReady(true);
  }, []);

  const setName = useCallback((name: string) => {
    setUser((prev) => {
      const next = { ...prev, name };
      writeStored(next);
      return next;
    });
  }, []);

  const setAvatar = useCallback((avatar: string | null) => {
    setUser((prev) => {
      const next = { ...prev, avatar };
      writeStored(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ ...user, ready, setName, setAvatar }),
    [user, ready, setName, setAvatar],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser(): UserContextValue {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser muss innerhalb von <UserProvider> verwendet werden.");
  return ctx;
}
