import { useState } from "react"




export function CoffeeItemForm({ onSubmit }) {
    const[ formData, setFormData] = useState ({
      id: '',
      title: '',
      price: '',
      description: '',
    });
  const handleChange = (e) => {
    const { id,  value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  

  function handleSubmit(e) {
    e.preventDefault ()
    onSubmit(formData);
    setFormData({
      id: '',
      title: '',
      price:  '',
      description: '',})
  }
  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item"> Coffee </label>
        <input
        placeholder="ID"
          value={formData.id}
          onChange={ handleChange}
          type="text"
          id="id"  
        />
        <input
        placeholder="TITLE"
          value={formData.title}
          onChange={ handleChange}
          type="text"
          id="title" 
        />
         <input
         placeholder="PRICE"
          value={formData.price}
          onChange={ handleChange}
          type="text"
          id="price" 
        />
         <input
         placeholder="DESCRIPTION"
          value={formData.description}
          onChange={ handleChange}
          type="text"
          id="description" 
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}