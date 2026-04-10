import Link from "next/link";

export default function ArticlesPage() {
  return (
    <div>
      <div style={{ backgroundColor: "#6E461E", paddingTop: "10rem", paddingBottom: "5rem", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          <p style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", color: "#A0CC6C", marginBottom: "1rem", fontFamily: "var(--font-body)" }}>Stories and Insights</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 8vw, 6rem)", color: "#FAF0E6", marginBottom: "1rem" }}>Articles</h1>
          <p style={{ fontFamily: "var(--font-body)", color: "#D4B896", fontSize: "1.1rem", maxWidth: "36rem" }}>
            Coffee farming, brewing craft, origin stories, and the people behind every cup. Written by Eli Natividad and the Farm to Cup team.
          </p>
        </div>
      </div>
      <div style={{ backgroundColor: "#FAF0E6", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "4rem", opacity: 0.3, marginBottom: "1.5rem" }}>📝</div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", color: "#9C6A32", marginBottom: "1rem" }}>Articles coming soon.</h2>
          <p style={{ fontFamily: "var(--font-body)", color: "#B89164", maxWidth: "28rem", margin: "0 auto 2rem" }}>
            Eli is writing. Check back shortly for stories from the highland farms, brewing guides, and origin deep-dives.
          </p>
          <Link href="/" style={{ textDecoration: "none" }} className="btn-primary">Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
