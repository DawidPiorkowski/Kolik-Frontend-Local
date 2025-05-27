// src/pages/ProductDetail.tsx
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  getProductDetail,
  getAllVariants,
  getBestDeal,
  addToShoppingList,
} from '../services/api'
import { Spinner } from '../components/Spinner'

// ========== Image Mapping Helper ==========
function getProductImage(name: string): string | null {
  const map: { [key: string]: string } = {
    'Whole milk': '/logos/milkicon.png',
    'Butter': '/logos/buttericon.png',
    'Eggs size M': '/logos/eggicon.png',
    'Toast bread white': '/logos/toasticon.png',
    'Cucumber': '/logos/cucumbericon.png',
    'Rohlik': '/logos/rohlikicon.png',
  }
  return map[name] || null
}

// ========== Interfaces ==========
interface ProductDetailResponse {
  id: number
  name: string
  description?: string
}

interface Variant {
  id: number
  name: string
  price: string
  supermarket: string
}

interface AllVariantsResponse {
  generic_product: string
  amount: string
  unit: string
  variants: Variant[]
}

interface BestDealResponse {
  product: string
  amount: string
  unit: string
  best_variant: Variant
}

// ========== Component ==========
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [product, setProduct] = useState<ProductDetailResponse | null>(null)
  const [variants, setVariants] = useState<Variant[]>([])
  const [bestDeal, setBestDeal] = useState<Variant | null>(null)

  const [selectedVariant, setSelectedVariant] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const prodResp = await getProductDetail(Number(id))
        const allVarsResp = await getAllVariants(Number(id))
        const bestResp = await getBestDeal(Number(id))

        if (cancelled) return

        setProduct(prodResp)

        const sorted = allVarsResp.variants
          .slice()
          .sort((a: Variant, b: Variant) => Number(a.price) - Number(b.price))

        const seen = new Set<string>()
        const unique = sorted.filter((v: Variant) => {
          if (seen.has(v.supermarket)) return false
          seen.add(v.supermarket)
          return true
        })

        setVariants(unique)
        setBestDeal(bestResp.best_variant)

        if (bestResp.best_variant) {
          setSelectedVariant(bestResp.best_variant.id)
        }
      } catch (err: any) {
        if (!cancelled) setError(err.message || 'Failed to load product')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [id])

  const handleAdd = async () => {
    if (selectedVariant === null) return
    setAdding(true)
    setError(null)
    try {
      await addToShoppingList({
        product_id: Number(id),
        variant_id: selectedVariant,
        quantity,
      })
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setAdding(false)
    }
  }

  if (loading) return <Spinner />
  if (error) return <div className="p-4 text-red-600">Error: {error}</div>
  if (!product) return <div className="p-4">Product not found.</div>

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-xl shadow p-6 space-y-4 border border-gray-200">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-blue-600 hover:underline"
      >
        ← Back to Products
      </button>

      {/* Product Image */}
      {getProductImage(product.name) && (
        <div className="flex justify-center">
          <img
            src={getProductImage(product.name)!}
            alt={product.name}
            className="w-28 h-28 object-contain mb-2"
          />
        </div>
      )}

      {/* Title & Description */}
      <h1 className="text-2xl font-bold text-center">{product.name}</h1>
      {product.description && (
        <p className="text-gray-700 text-center">{product.description}</p>
      )}

      {/* Best Deal */}
      {bestDeal && (
        <div className="p-3 bg-green-100 text-green-800 text-sm rounded text-center">
          <strong>Cheapest:</strong>{' '}
          Kč{Number(bestDeal.price).toFixed(2)} at {bestDeal.supermarket}
        </div>
      )}

      {/* Variant Selection */}
      <div>
        <h2 className="font-medium mb-2">Choose a supermarket:</h2>
        {variants.map((v) => (
          <label
            key={v.id}
            className={`flex items-center gap-3 p-3 mb-2 border rounded-lg cursor-pointer transition 
              ${selectedVariant === v.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}
              ${bestDeal && bestDeal.supermarket === v.supermarket && bestDeal.price === v.price ? 'ring-2 ring-green-400' : ''}`}
          >
            <input
              type="radio"
              name="variant"
              value={v.id}
              checked={selectedVariant === v.id}
              onChange={() => setSelectedVariant(v.id)}
              className="accent-blue-500"
            />
            <div>
              <strong>{v.supermarket}</strong>
              <div className="text-sm text-gray-600">Kč{Number(v.price).toFixed(2)}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Quantity Input */}
      <div>
        <label htmlFor="quantity" className="font-medium block mb-1">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, +e.target.value || 1))}
          className="w-20 px-3 py-2 border rounded shadow-sm"
        />
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        disabled={adding}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition disabled:opacity-50"
      >
        {adding ? 'Adding…' : 'Add to List'}
      </button>

      {/* Success Message */}
      {success && (
        <div className="text-green-600 text-center mt-2">
          Added to your shopping list!
        </div>
      )}
    </div>
  )
}