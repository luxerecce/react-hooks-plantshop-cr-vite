import React from "react";

function PlantCard({ plant, onToggleStock }) {
  const inStock = plant.isInStock !== false;

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      <button className={inStock ? "primary" : ""} onClick={() => onToggleStock(plant.id)}>
        {inStock ? "In Stock" : "Out of Stock"}
      </button>
    </li>
  );
}

export default PlantCard;
