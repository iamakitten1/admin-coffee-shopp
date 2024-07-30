export function CoffeeItem({ id, title, price, description }) {
  return (
    <li>
      <p> {title} </p>
      <p> {price} </p>
      <p> {description} </p>
      
    </li>
  )
}