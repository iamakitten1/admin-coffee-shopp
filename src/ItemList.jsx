
import { CoffeeItem } from "./CoffeeItem";

export function ItemList({ items, onDelete }) {
  if (!Array.isArray(items)) {
    return null; // Or some fallback UI
  }

  return (
    <ul className="list">
      {items.map((item) => (
        <CoffeeItem {...item} key={item.id} onDelete={onDelete} />
      ))}
    </ul>
  );
}
