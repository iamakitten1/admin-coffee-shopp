import { useState } from "react"


const CoffeItem = () => {
  const[ formData, setFormData] = useState ({
    id: 0 ,
    title: '',
    price: 2 ,
    description: '',
  });
}
const handleChange = (e) => {
  const { id,  value } = e.target;
  setFormData({
    ...formData,
    [id]: value,
  });
};








export function NewTodoForm({ onSubmit }) {
  const [id, setId] = useState("")
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")

  function handleSubmit(e) {
    e.preventDefault()
    if (id === "") return

    onSubmit(id)

    setId("")
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item"> Coffee </label>
        <input
          value={id}
          onChange={e => setId(e.target.value)}
          type="text"
          id="item"  
        />
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          id="item" 
        />
         <input
          value={price}
          onChange={e => setPrice(e.target.value)}
          type="text"
          id="item" 
        />
         <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          type="text"
          id="item" 
        />
      </div>
      <button className="btn">Add</button>
    </form>
  )
}