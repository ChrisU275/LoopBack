// src/pages/About.js
import ImpactHero from "../components/ImpactHero";

export default function About() {
  return (
    <div style={{ padding: "24px 20px" }}>
      {/* Big hero with the running impact total */}
      <ImpactHero impact={1087236918} />

      {/* About copy */}
      <section
        style={{
          maxWidth: 900,
          margin: "40px auto 80px",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 8px 24px rgba(0,0,0,.06)",
          padding: 24,
          lineHeight: 1.6,
        }}
      >
        <h2 style={{ margin: "0 0 8px" }}>about loopback</h2>
        <p style={{ margin: "0 0 10px" }}>
          loopback is a community marketplace for re-use. list items you’d like
          to donate, exchange, or repair — and give things a second life.
        </p>
        <p style={{ margin: 0 }}>
          every post keeps usable items out of landfills and puts them into the
          hands of neighbours who need them. the number above is our running
          tally of items given new life.
        </p>
      </section>
    </div>
  );
}
