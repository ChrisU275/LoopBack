// src/components/MarketplaceCard.js
import React from "react";

export default function MarketplaceCard({ item, position, onClick }) {
  return (
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        border: "1px solid black",
        padding: "10px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {item.name}
    </div>
  );
}
