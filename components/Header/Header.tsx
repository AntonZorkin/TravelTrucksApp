"use client";
import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isHomeActive = pathname === "/";
  const isCatalogActive = pathname==="/catalog";

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" aria-label="Home" className={css.logo}>
          <span className={css.main}>
            Travel<span className={css.accent}>Trucks</span>
          </span>
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.nav}>
            <li>
              <Link href="/" className={isHomeActive ? css.active : undefined}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={isCatalogActive ? css.active : undefined}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
