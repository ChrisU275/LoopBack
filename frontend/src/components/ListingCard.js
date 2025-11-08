// Displays an individual post/item
export default function ListingCard({ listing }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
      <h3>{listing.title}</h3>
      <p>Type: {listing.type}</p>
      <p>Community: {listing.community}</p>
      <button>Contact</button>
    </div>
  );
}