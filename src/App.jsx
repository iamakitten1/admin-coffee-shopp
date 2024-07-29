

import { useState, useEffect } from "react";
import { CoffeeItemForm } from "./CoffeeItemForm";
import "./App.css";
import { ItemList } from "./ItemList";

export default function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = "https://crudapi.co.uk/api/v1/item";
  const apiKey = "5cHvC0XfvliDWRh8NRPoPR20hdvbOBOCuxShio-lH2TFSEVZbg"; // Replace with your actual API key

  // Fetch items from the API
  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Add a new item
  const addItem = async (formData) => {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const newItem = await response.json();
      setItems([...items, newItem]);
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete an item
  const deleteItem = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <CoffeeItemForm onSubmit={addItem} />
      <h1 className="header">Coffee Items</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ItemList items={items} onDelete={deleteItem} />
      )}
    </>
  );
}

  