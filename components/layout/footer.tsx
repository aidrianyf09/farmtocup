import Link from "next/link";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#321C0C", color: "#E6DCD2" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          marginBottom: "3rem",
        }}>

          {/* Brand */}
          <div style={{ gridColumn: "span 2" }}>
            <p style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#FAF0E6",
              marginBottom: "0.25rem",
            }}>
              FARM<span style={{ fontSize: "1rem", fontFamily: "var(--font-body)", fontWeight: 400 }}>to</span>CUP
            </p>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#A0968C", marginBottom: "1rem" }}>
              EST. PH 2020
            </p>
            <p style={{ fontSize: "0.875rem", color: "#BEB4AA", lineHeight: 1.7, maxWidth: "20rem", marginBottom: "1.5rem" }}>
              Specialty coffee sourced directly from highland farms to your cup.
              Grown with care. Roasted with intention.
            </p>
            <p style={{ fontSize: "0.75rem", color: "#A0968C", lineHeight: 1.6 }}>
              Philippine Nazarene College<br />
              Pico Rd, La Trinidad, Benguet
            </p>
          </div>

          {/* Explore */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7FAF5B", marginBottom: "1rem" }}>
              Explore
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { href: "/",         label: "Home"            },
                { href: "/about",    label: "About Us"        },
                { href: "/pricing",  label: "Pricing"         },
                { href: "/articles", label: "Articles"        },
                { href: "/partner",  label: "Partner With Us" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} style={{ textDecoration: "none", fontSize: "0.875rem", color: "#BEB4AA" }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#7FAF5B", marginBottom: "1rem" }}>
              Connect
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                { href: "https://www.facebook.com/farmtocupph", label: "Facebook" },
                { href: "https://www.instagram.com/farmtocupph", label: "Instagram" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", fontSize: "0.875rem", color: "#BEB4AA" }}>
                    {label} ↗
                  </a>
                </li>
              ))}
            </ul>
            <Link href="/pricing" className="btn-green" style={{ textDecoration: "none", fontSize: "0.8rem" }}>
              Order Beans
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #462A12", paddingTop: "2rem", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <p style={{ fontSize: "0.75rem", color: "#7D7268", fontFamily: "var(--font-body)" }}>
            © 2026 Farm to Cup Philippines · Version 4.0
          </p>
          <p style={{ fontSize: "0.75rem", color: "#7D7268", fontFamily: "var(--font-body)" }}>
            Built by{" "}
            <a href="https://solyrasystems.com" target="_blank" rel="noopener noreferrer" style={{ color: "#A0968C", textDecoration: "none" }}>
              Solyra Systems
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}