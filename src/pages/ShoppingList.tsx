import React from 'react';
import { useShoppingList } from '../contexts/ShoppingListContext';

export default function ShoppingList() {
  const { list, updateQuantity, removeItem } = useShoppingList();

  const total = list.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Shopping List</h1>

      {list.length === 0 ? (
        <p className="text-gray-600">No items yet. Add some from the Compare page!</p>
      ) : (
        <>
          <ul className="space-y-4 mb-8">
            {list.map((item, idx) => (
              <li
                key={idx}
                className="border rounded p-4 shadow flex flex-col md:flex-row justify-between items-center gap-4"
              >
                {/* Image (if available) */}
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600 text-sm">
                    Store: {item.store} | Price: {item.price.toFixed(2)} Kč
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor={`qty-${idx}`} className="text-sm">
                    Qty:
                  </label>
                  <input
                    id={`qty-${idx}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(idx, parseInt(e.target.value) || 1)}
                    className="w-16 p-1 border rounded text-center"
                  />
                </div>

                <button
                  onClick={() => removeItem(idx)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="text-right text-xl font-bold">
            Total: {total.toFixed(2)} Kč
          </div>
        </>
      )}
    </div>
  );
}
