// All listings
import ListingCard from "../components/ListingCard";

const sampleListings = [
  { id: 1, title: "Used Bike", type: "Donate", community: "Calgary NW" },
  { id: 2, title: "Books for Trade", type: "Exchange", community: "Calgary SE" },
  { id: 3, title: "Repair: Broken Chair", type: "Repair", community: "Calgary NE" },
];

export default function Marketplace() {
  return (
    <div style={{ padding: "20px" }}>
      <h2>Marketplace</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        {sampleListings.map(listing => (
          <ListingCard key={listing.id} listing={listing} />
        ))}
      </div>
    </div>
  );
}