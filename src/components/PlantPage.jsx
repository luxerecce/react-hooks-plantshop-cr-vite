import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

const API_URL = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const loadedPlants = data.map((plant) => ({ ...plant, isInStock: true }));
        setPlants(loadedPlants);
      });
  }, []);

  function handleAddPlant(newPlant) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlant),
    })
      .then((response) => response.json())
      .then((createdPlant) => {
        setPlants((currentPlants) => [
          ...currentPlants,
          { ...createdPlant, isInStock: true },
        ]);
      });
  }

  function handleToggleStock(plantId) {
    setPlants((currentPlants) =>
      currentPlants.map((plant) =>
        plant.id === plantId
          ? { ...plant, isInStock: !plant.isInStock }
          : plant
      )
    );
  }

  const visiblePlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={visiblePlants} onToggleStock={handleToggleStock} />
    </main>
  );
}

export default PlantPage;
