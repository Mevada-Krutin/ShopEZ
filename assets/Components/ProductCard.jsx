import React from "react";

const ProductCard = ({ product }) => (
  <div style={{ border: "1px solid #ccc", padding: 10, margin: 10, width: 200 }}>
    <img src={product.image} alt={product.name} width="100%" />
    <h3>{product.name}</h3>
    <p>₹{product.price}</p>
    <p style={{ fontSize: "0.9em", color: "#555" }}>{product.description}</p>
    <button style={{ padding: "5px 10px", background: "#1976d2", color: "#fff", border: "none" }}>
      Add to Cart
    </button>
  </div>
);

export default ProductCard;
