import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="shell">
      <a className="skip-link" href="#content">
        Zum Inhalt springen
      </a>
      <Sidebar />
      <div className="main">
        <Header />
        <main id="content" className="content">
          {children}
        </main>
      </div>
    </div>
  );
}
