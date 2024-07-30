import { useState, useEffect } from "react";
import { CoffeeItemForm } from "./CoffeeItemForm";
import "./App.css";
import { ItemList } from "./ItemList";
import { CrudApiClient } from "./New";


export default function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = 'https://crudapi.co.uk/api/v1/task'; // Use environment variable
  const apiKey = '6nUq1qfYxY_K9lm87LG446qWF3RcKYZQIuIBa0ajxEKISkM_lg'; // Use environment variable
  const client = new CrudApiClient (apiKey)

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await client.getTasks()
        console.log(response);
        // const response = await fetch(apiUrl, {
        //   headers: {
        //     Authorization: `Bearer ${apiKey}`,
        //   },
        // });

        // if (!response.ok) {
        //   throw new Error(`HTTP error! Status: ${response.status}`);
        // }

        // const data = await response.json();
        // console.log("Fetched data:", data);
        const data = response

        if (Array.isArray(data.items)) {
          setItems(data.items);
        } else {
          setItems([]);
          console.warn("Expected items array, but got:", data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const addItem = async (formData) => {
    try {
      console.log("Sending data:", JSON.stringify(formData));
      console.log(formData);
      
      const response = await client.createTask(formData)

      // const response = await fetch(apiUrl, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${apiKey}`,
      //   },
      //   body,
      // });
  
      // if (!response.ok) {
      //   let errorMessage = `HTTP error! Status: ${response.status}`;
      //   try {
      //     const errorData = await response.json();
      //     errorMessage += `. ${errorData.message || "Unknown error"}`;
      //     console.error("API Error Details:", errorData);
      //   } catch {
      //     errorMessage += ". Unknown error (no details provided)";
      //   }
      //   throw new Error(errorMessage);
      // }
  
      const data =  response;

      console.log("Received data:", data);
  
      if (data) {
        setItems(prevItems => [...prevItems, data]);
      } else {
        throw new Error("Unexpected response format");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setError(error.message);
    }
  };
  

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
