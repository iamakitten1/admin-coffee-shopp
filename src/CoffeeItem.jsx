export function CoffeeItem({ id, title, price, description }) {
  return (
    <li>
      <p>
        {id}
      </p>
      <p>
        {title}
      </p>
      <p>
        {price}
      </p>
      <p>
        {description}
      </p>
      {/* <button onClick={() => deleteTodo(id)} className="btn btn-danger">
          Delete
        </button> */}
    </li>
  )
}