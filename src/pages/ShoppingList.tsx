import { useEffect, useState } from 'react'
import {
  getShoppingList,
  removeFromShoppingList,
  clearShoppingList,
  compareShoppingList,
  getMixedBasket,
  getSupermarketBreakdown,
} from '../services/api'
import { Spinner } from '../components/Spinner'

function getProductIcon(name: string): string {
  const map: { [key: string]: string } = {
    'Okurka': '🥒',
    'Butter': '🧈',
    'Whole milk': '🥛',
    'Eggs': '🥚',
    'Toast bread': '🍞',
    'Cucumber': '🥒',
  }
  return map[name] || '🛒'
}

interface ListItem {
  id: number
  product_id: number
  product_name: string
  variant_name: string
  supermarket: string
  quantity: number
}

interface MixedItem {
  product: string
  variant: string
  supermarket: string
  price: number
  quantity: number
  total: number
}

interface SupermarketTotal {
  supermarket: string
  total: number
  all_items_available: boolean
}

export default function ShoppingList() {
  const [items, setItems] = useState<ListItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [totals, setTotals] = useState<SupermarketTotal[]>([])
  const [mixed, setMixed] = useState<MixedItem[]>([])
  const [mixedTotal, setMixedTotal] = useState(0)
  const [bestShop, setBestShop] = useState<string | null>(null)
  const [oneShopItems, setOneShopItems] = useState<MixedItem[]>([])
  const [oneShopTotal, setOneShopTotal] = useState<number>(0)

  const [showDealOptions, setShowDealOptions] = useState(false)
  const [showOneShop, setShowOneShop] = useState(false)
  const [showMixed, setShowMixed] = useState(false)

  useEffect(() => {
    getShoppingList()
      .then((data) => {
        setItems(data.shopping_list || [])
      })
      .catch((err) => {
        setError(err.message)
      })

    compareShoppingList()
      .then((data) => {
        const sorted = data.supermarket_totals
          .filter((x: SupermarketTotal) => x.all_items_available)
          .sort((a: SupermarketTotal, b: SupermarketTotal) => a.total - b.total)
        setTotals(sorted)
        setBestShop(sorted[0]?.supermarket || null)

        // Fetch breakdown for best one-shop
        if (sorted[0]?.supermarket) {
          getSupermarketBreakdown(sorted[0].supermarket).then((res) => {
            setOneShopItems(res.breakdown.items)
            setOneShopTotal(res.breakdown.total)
          })
        }
      })

    getMixedBasket()
      .then((data) => {
        setMixed(data.items)
        setMixedTotal(data.total)
      })
  }, [])

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>
  }
  if (items === null) {
    return <Spinner />
  }

  const handleRemove = (productId: number, itemId: number) => {
    removeFromShoppingList(productId).then(() => {
      setItems((prev) => prev?.filter((x) => x.id !== itemId) || [])
    })
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Shopping Basket</h1>

      {items.length === 0 ? (
        <p>Your basket is empty.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div>
                <strong>{getProductIcon(it.product_name)} {it.product_name}</strong> × {it.quantity} <br />
                <span className="text-sm text-gray-600">{it.variant_name} @ {it.supermarket}</span>
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
          onClick={() => clearShoppingList().then(() => setItems([]))}
        >
          Clear Basket
        </button>
      )}

      {/* MAIN: Best Deal Button */}
      <div className="mt-6">
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={() => setShowDealOptions(!showDealOptions)}
        >
          Show Best Deal
        </button>
      </div>

      {/* Option buttons */}
      {showDealOptions && (
        <div className="mt-4 space-x-2">
          <button
            className="px-3 py-1 bg-purple-500 text-white rounded"
            onClick={() => {
              setShowOneShop(!showOneShop)
              setShowMixed(false)
            }}
          >
            One Shop
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded"
            onClick={() => {
              setShowMixed(!showMixed)
              setShowOneShop(false)
            }}
          >
            Mixed Basket
          </button>
        </div>
      )}

      {/* One Shop Breakdown */}
      {showOneShop && bestShop && (
        <div className="mt-4 bg-green-100 p-4 rounded">
          <h2 className="font-bold text-lg">🏬 Best One-Shop Basket: {bestShop}</h2>
          <ul className="space-y-1 mt-2">
            {oneShopItems.map((item, i) => (
              <li key={i}>
                ✅ {item.quantity} × {item.product} – {item.total.toFixed(2)} Kč
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: {oneShopTotal.toFixed(2)} Kč</p>
        </div>
      )}

      {/* Mixed Basket */}
      {showMixed && mixed.length > 0 && (
        <div className="mt-4 bg-blue-100 p-4 rounded">
          <h2 className="font-bold text-lg">🛒 Mixed Basket</h2>
          <ul className="space-y-1 mt-2">
            {mixed.map((item, i) => (
              <li key={i}>
                ✅ {item.quantity} × {item.product} from {item.supermarket} – {item.total.toFixed(2)} Kč
              </li>
            ))}
          </ul>
          <p className="mt-2 font-semibold">Total: {mixedTotal.toFixed(2)} Kč</p>
        </div>
      )}
    </div>
  )
}
