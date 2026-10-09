/** Wird bei jedem Seitenwechsel neu eingehängt – das löst die sanfte Einblendung aus. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
