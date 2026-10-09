"use client";

import { usePathname } from "next/navigation";
import { getPageLabel } from "@/lib/navigation";
import BrandMark from "./BrandMark";

export default function Header() {
  const pathname = usePathname();
  const label = getPageLabel(pathname);

  return (
    <header className="header">
      <div className="header-page">
        <BrandMark />
        <h1 key={label} className="page-title">
          {label}
        </h1>
      </div>
      <p className="wordmark">AGENT</p>
    </header>
  );
}
