"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/",         label: "Home"            },
  { href: "/about",    label: "About Us"        },
  { href: "/pricing",  label: "Pricing"         },
  { href: "/articles", label: "Articles"        },
  { href: "/partner",  label: "Partner With Us" },
];

export function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 50,
      transition: "all 0.3s",
      backgroundColor: scrolled ? "rgba(250,240,230,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(8px)" : "none",
      borderBottom: scrolled ? "1px solid #E6DCD2" : "none",
    }}>
      <nav style={{
        maxWidth: "80rem",
        margin: "0 auto",
        padding: "0 1.5rem",
        height: "5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>

        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          <div style={{
            width: "2.5rem", height: "2.5rem",
            borderRadius: "50%",
            border: "2px solid #7FAF5B",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: "1rem", height: "1rem", border: "1.5px solid #7FAF5B", borderRadius: "50%" }} />
          </div>
          <div style={{ lineHeight: 1 }}>
            <span style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.2rem",
              color: "#6E461E",
              display: "block",
              letterSpacing: "-0.01em",
            }}>
              FARM<span style={{ fontSize: "0.85rem", fontFamily: "var(--font-body)", fontWeight: 500 }}>to</span>CUP
            </span>
            <span style={{
              fontSize: "0.6rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              color: "#B89164",
            }}>
              Est. PH 2020
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "2rem", listStyle: "none", margin: 0, padding: 0 }}
            className="hidden-mobile">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={{
                textDecoration: "none",
                fontSize: "0.875rem",
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                color: pathname === href ? "#6DA544" : "#5A3818",
                transition: "color 0.2s",
              }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden-mobile">
          <Link href="/pricing" className="btn-primary" style={{ textDecoration: "none" }}>
            Order Beans
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="show-mobile"
          style={{ background: "none", border: "none", cursor: "pointer", padding: "0.5rem", display: "flex", flexDirection: "column" as const, gap: "5px" }}
          aria-label="Toggle menu"
        >
          <span style={{ display: "block", width: "1.5rem", height: "2px", backgroundColor: "#6E461E", transition: "all 0.2s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
          <span style={{ display: "block", width: "1.5rem", height: "2px", backgroundColor: "#6E461E", transition: "all 0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: "block", width: "1.5rem", height: "2px", backgroundColor: "#6E461E", transition: "all 0.2s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          backgroundColor: "#FAF0E6",
          borderTop: "1px solid #E6DCD2",
          padding: "1.5rem",
          display: "flex",
          flexDirection: "column" as const,
          gap: "1rem",
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              textDecoration: "none",
              fontSize: "1rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              color: pathname === href ? "#6DA544" : "#5A3818",
            }}>
              {label}
            </Link>
          ))}
          <Link href="/pricing" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ textDecoration: "none", marginTop: "0.5rem", textAlign: "center", justifyContent: "center" }}>
            Order Beans
          </Link>
        </div>
      )}

      <style>{`
        .hidden-mobile { display: flex; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </header>
  );
}