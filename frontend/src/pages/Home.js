// The landing page
export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>LoopBack</h1>
      <p>Connecting communities through reuse, repair, and exchange</p>
      <p>Our Impact: 500+ items reused, 100+ families helped</p>
      <button onClick={() => window.location.href="/marketplace"}>Explore Marketplace</button>
    </div>
  );
}
