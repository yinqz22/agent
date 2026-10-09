/**
 * Vorbereitete Struktur für spätere Benachrichtigungen.
 * Aktuell gibt es bewusst keine Daten – die Oberfläche zeigt dann den Empty State.
 */
export type AppNotification = {
  id: string;
  title: string;
  body?: string;
  /** ISO-Zeitstempel */
  createdAt: string;
  read: boolean;
};

export const notifications: AppNotification[] = [];
