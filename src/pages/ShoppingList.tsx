// src/pages/ShoppingList.tsx
import { useEffect, useState } from 'react'
import {
  getShoppingList,
  removeFromShoppingList,
  clearShoppingList,
} from '../services/api'
import { Spinner } from '../components/Spinner'

interface ListItem {
  id: number           // unique ShoppingListItem PK (for React keys)
  product_id: number   // what the remove endpoint expects
  product_name: string
  variant_name: string
  supermarket: string
  quantity: number
}

export default function ShoppingList() {
  const [items, setItems] = useState<ListItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 1) Fetch your list once when the component mounts
  useEffect(() => {
    getShoppingList()
      .then((data) => {
        // backend now returns { shopping_list: [...] }
        setItems(data.shopping_list || [])
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  // 2) Loading / error states
  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>
  }
  if (items === null) {
    return <Spinner />
  }

  // 3) Remove handler: send the right ID, then update UI
  const handleRemove = (productId: number, itemId: number) => {
    removeFromShoppingList(productId).then(() => {
      // locally filter out by the ShoppingListItem PK
      setItems((prev) => prev?.filter((x) => x.id !== itemId) || [])
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Shopping List</h1>

      {items.length === 0 ? (
        <p>Your list is empty.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <strong>{it.product_name}</strong>
                {' '}({it.variant_name}@{it.supermarket}) × {it.quantity}
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleRemove(it.product_id, it.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <button
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={() =>
            clearShoppingList().then(() => setItems([]))
          }
        >
          Clear List
        </button>
      )}
    </div>
  )
}
