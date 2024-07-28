import { CoffeeItem } from "./CoffeeItem"

export function ItemList({ items}) {
  return (
    <ul className="list">
      {items.map((item) => <CoffeeItem {...item} key={items.id} /> ) }
    </ul>
  )
}