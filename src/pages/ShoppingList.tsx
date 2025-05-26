import { useEffect, useState } from 'react'
import {
  getShoppingList,
  removeFromShoppingList,
  clearShoppingList,
  compareShoppingList,
  getMixedBasket,
  getSupermarketBreakdown,
  addToShoppingList
} from '../services/api'
import { Spinner } from '../components/Spinner'

function getProductImage(variant: string): string | null {
  const map: { [key: string]: string } = {
    'Madeta Jihočeské trvanlivé mléko plnotučné 3,5%': '/logos/madetamilk.png',
    'Milkpol Máslo 82%': '/logos/milkpolbutter.png',
    'Tesco Okurka hadovka': '/logos/okurkatesco.png',
    'Madeta Jihočeské máslo': '/logos/madetamaslo.png',
    'Okurka salátová': '/logos/okurkabilla.png',
    'BILLA BIO Čerstvé mléko plnotučné': '/logos/billacerstveplnotucne.png',
    'Albert Toustový chléb máslový, balený at Albert ': '/logos/alberttoast.png',
    'Tesco Čerstvá vejce M 10 ks': '/logos/tescocv.png',
    'BILLA Premium Čerstvá vejce slepic ve volném výběhu M': '/logos/billacv.png',
    'Rohlík tukový': '/logos/rohliktukovy.png',
    'Tesco Toustový chléb světlý': '/logos/tescotoast.png',
    'BILLA Toustový chléb světlý': '/logos/billatoast.png',
    'Penam Toustový chléb světlý at Albert': '/logos/penamalbert.png',
    'Albert Toustový chléb světlý, balený at Albert': '/logos/albertsvetlytoast.png',
    'Penam Toust světlý at Tesco ': '/logos/penamalbert.png',
    'Ölz Pšeničný toustový chléb at Tesco': '/logos/olz.png',
    'Tesco Toustový chléb máslový at Tesco': '/logos/toastmaslovy.png',
    'Baker Street – Toustový chléb at Billa': '/logos/bakerstreet.png',
    'Ölz Pšeničný toustový chléb at Billa': '/logos/olz.png',
    'Billa Toustový chléb světlý, balený at Billa': '/logos/billatoast.png',
    'BILLA Toustový chléb máslový at Billa': '/logos/billatoastmaslovy.png',
    'Bon Via Bio Okurka at Billa': '/logos/bonvia.png',





  }
  return map[variant] || null
}

function getSupermarketLogo(name: string): string | null {
  const map: { [key: string]: string } = {
    'Tesco': '/logos/tesco logo.jpeg',
    'Albert': '/logos/Albert_Logo.png',
    'Billa': '/logos/billalogo.png',
  }
  return map[name] || null
}

function getProductIcon(name: string): string {
  const map: { [key: string]: string } = {
    'Okurka': '🥒',
    'Butter': '🧈',
    'Whole milk': '🥛',
    'Eggs': '🥚',
    'Toast bread white': '🍞',
    'Cucumber': '🥒',
    'Rohlik': '🥖',
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
  image_url?: string
}

interface SupermarketTotal {
  supermarket: string
  total: number
  all_items_available: boolean
}

export default function ShoppingList() {
  const [items, setItems] = useState<ListItem[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [bestShop, setBestShop] = useState<SupermarketTotal | null>(null)
  const [bestShopBreakdown, setBestShopBreakdown] = useState<MixedItem[]>([])
  const [mixed, setMixed] = useState<MixedItem[]>([])
  const [mixedTotal, setMixedTotal] = useState(0)

  const [showOneShop, setShowOneShop] = useState(false)
  const [showMixed, setShowMixed] = useState(false)
  const [isLoadingDeals, setIsLoadingDeals] = useState(false)
  const [dealsCalculated, setDealsCalculated] = useState(false) 
  

  useEffect(() => {
    getShoppingList()
      .then((data) => {
        setItems(data.shopping_list || [])
      })
      .catch((err) => {
        setError(err.message)
      })

    
  }, [])

  const refreshBestDealCalculations = () => {
    setIsLoadingDeals(true)
    setDealsCalculated(false)
  
    Promise.all([
      compareShoppingList(),
      getMixedBasket()
    ])
      .then(([shopData, mixedData]) => {
        const sorted = shopData.supermarket_totals
          .filter((x: SupermarketTotal) => x.all_items_available)
          .sort((a: SupermarketTotal, b: SupermarketTotal) => a.total - b.total)
  
        const best = sorted[0]
        setBestShop(best)
  
        if (best) {
          getSupermarketBreakdown(best.supermarket).then((res) => {
            setBestShopBreakdown(res.breakdown.items)
          })
        }
  
        setMixed(mixedData.items)
        setMixedTotal(mixedData.total)
      })
      .finally(() => {
        setIsLoadingDeals(false)
        setDealsCalculated(true)
        setShowMixed(false)
        setShowOneShop(false)
      })
  }
  const handleClearBasket = () => {
    clearShoppingList().then(() => {
      setItems([])
      setBestShop(null)
      setBestShopBreakdown([])
      setMixed([])
      setMixedTotal(0)
      setDealsCalculated(false)
      setShowOneShop(false)
      setShowMixed(false)
    })
  }
  const handleRemove = (productId: number, itemId: number) => {
    removeFromShoppingList(productId).then(() => {
      setItems((prev) => prev?.filter((x) => x.id !== itemId) || [])
    })
  }

  const handleQuantityChange = (productId: number, itemId: number, newQty: number) => {
    if (newQty < 1) return
    addToShoppingList({ product_id: productId, quantity: newQty }).then(() => {
      setItems((prev) =>
        prev?.map((x) => (x.id === itemId ? { ...x, quantity: newQty } : x)) || []
      )
      refreshBestDealCalculations()
    })
  }

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>
  if (items === null) return <Spinner />

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🧺 Your Shopping Basket</h1>

     
        {items.length === 0 ? (
          <p className="text-center text-gray-600">Your basket is empty.</p>
        ) : (
          <>
            <ul className="space-y-3">
              {items.map((it) => (
                <li
                  key={it.id}
                  className="flex justify-between items-center border border-gray-300 p-3 rounded shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getProductIcon(it.product_name)}</span>
                    <strong>{it.product_name}</strong>
                    <input
                      type="number"
                      min={1}
                      value={it.quantity}
                      onChange={(e) =>
                        handleQuantityChange(it.product_id, it.id, Number(e.target.value))
                      }
                      className="w-16 ml-3 px-2 py-1 border rounded text-center"
                    />
                  </div>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleRemove(it.product_id, it.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
        
            <div className="mt-4 text-center">
              <button
                onClick={handleClearBasket}
                className="text-sm text-gray-600 hover:text-red-600 underline transition duration-200"
              >
                🗑️ Clear the Basket
              </button>
            </div>
          </>
        )}

      




{/* Best Deal Button */}
{items.length > 0 && !dealsCalculated && !isLoadingDeals && (
  <div className="text-center mt-6">
    <button
      onClick={refreshBestDealCalculations}
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded shadow transition duration-300"
    >
      🔍 Find the Best Deal
    </button>
  </div>
)}

{/* Loading Spinner */}
{isLoadingDeals && (
  <div className="mt-6 text-center text-gray-600">
    <Spinner />
    <p className="mt-2 animate-pulse">Crunching numbers and comparing prices... </p>
  </div>
)}

{/* Render toggles and baskets ONLY after calculation */}
{items.length > 0 && dealsCalculated && !isLoadingDeals && (
  <>
    {/* Toggle Buttons */}
    <div className="mt-6 flex justify-center">
      <div className="inline-flex rounded-full border border-gray-300 bg-white overflow-hidden shadow hover:shadow-md transition-shadow">
        <button
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
            showOneShop ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => {
            setShowOneShop(true)
            setShowMixed(false)
          }}
        >
          One Shop
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 ${
            showMixed ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => {
            setShowMixed(true)
            setShowOneShop(false)
          }}
        >
          Mixed Basket
        </button>
      </div>
    </div>
    {/* One-Shop Basket */}
    {showOneShop && bestShop && bestShopBreakdown.length > 0 && (
      <div className="mt-6 p-6 rounded-lg shadow-md bg-green-100 animate-fade">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
          Best One-Shop Basket: {bestShop.supermarket}
        </h2>
        <ul className="space-y-4">
          {bestShopBreakdown.map((item, i) => (
            <li
              key={i}
              className="bg-white rounded-lg shadow-sm p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center"
            >
              {getProductImage(item.variant) && (
                <img
                  src={getProductImage(item.variant)!}
                  alt={item.variant}
                  className="w-24 h-24 object-contain rounded"
                />
              )}
              <div className="flex flex-col justify-center">
                <p className="font-medium text-sm sm:text-base text-black">
                  {item.quantity} × {item.variant}
                </p>
                <p className="mt-1 font-semibold text-base text-black">
                  {item.total.toFixed(2)} Kč
                </p>
              </div>
              {getSupermarketLogo(item.supermarket) && (
                <img
                  src={getSupermarketLogo(item.supermarket)!}
                  alt={item.supermarket}
                  className="w-20 h-10 object-contain ml-auto"
                />
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-bold text-right text-lg text-black">
          Total: {bestShop.total.toFixed(2)} Kč
        </p>
      </div>
    )}

    {/* Mixed Basket */}
    {showMixed && mixed.length > 0 && (
      <div className="mt-6 p-6 rounded-lg shadow-md bg-gradient-to-br from-[#3b82f6] to-[#6366f1] text-black">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-white">
          Mixed Basket
        </h2>
        <ul className="space-y-4">
          {mixed.map((item, i) => (
            <li
              key={i}
              className="bg-white rounded-lg shadow-sm p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center"
            >
              {getProductImage(item.variant) && (
                <img
                  src={getProductImage(item.variant)!}
                  alt={item.variant}
                  className="w-24 h-24 object-contain rounded"
                />
              )}
              <div className="flex flex-col justify-center">
                <p className="font-medium text-sm sm:text-base text-black">
                  {item.quantity} × {item.variant}
                </p>
                <p className="text-sm text-gray-500">from {item.supermarket}</p>
                <p className="mt-1 font-semibold text-base text-black">
                  {item.total.toFixed(2)} Kč
                </p>
              </div>
              {getSupermarketLogo(item.supermarket) && (
                <img
                  src={getSupermarketLogo(item.supermarket)!}
                  alt={item.supermarket}
                  className="w-20 h-10 object-contain ml-auto"
                />
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 font-bold text-right text-lg text-white">
          Total: {mixedTotal.toFixed(2)} Kč
        </p>
      </div>
    )}

    {/* Savings Message */}
    {bestShop && mixedTotal > 0 && (
      <div className="mt-4 bg-yellow-100 p-4 rounded-lg border-l-4 border-yellow-400 shadow">
        <p className="font-semibold text-yellow-800">
          You save{' '}
          <span className="text-green-700 font-bold">
            {(bestShop.total - mixedTotal).toFixed(2)} Kč
          </span>{' '}
          by choosing the mixed basket!
        </p>
      </div>
    )}
  </>
)}

</div> 
)
}