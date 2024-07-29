import { useState } from "react";

export function CoffeeItemForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      price: '',
      description: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="title">Coffee</label>
        <input
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          type="text"
          id="title"
        />
        <input
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          type="text"
          id="price"
        />
        <input
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          type="text"
          id="description"
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}
