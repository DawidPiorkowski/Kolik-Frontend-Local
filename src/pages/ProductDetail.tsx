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
        setBestDeal(bestResp.best_variant)

        // 1) sort cheapest → expensive
        const sorted = allVarsResp.variants
          .slice()
          .sort((a: Variant, b: Variant) => Number(a.price) - Number(b.price))

        // 2) dedupe by supermarket, taking cheapest per market
        const seen = new Set<string>()
        const unique = sorted.filter((v: Variant) => {
          if (seen.has(v.supermarket)) return false
          seen.add(v.supermarket)
          return true
        })

        setVariants(unique)

        // 3) default-select first
        if (unique.length > 0) {
          setSelectedVariant(unique[0].id)
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to load product')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
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
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      {product.description && (
        <p className="mb-4 text-gray-700">{product.description}</p>
      )}

      {bestDeal && (
        <div className="p-3 mb-4 bg-green-100 rounded">
          <strong>Cheapest:</strong>{' '}
          Kč{Number(bestDeal.price).toFixed(2)} at{' '}
          {bestDeal.supermarket}
        </div>
      )}

      <div className="mb-4">
        <h2 className="font-medium mb-2">Choose a supermarket:</h2>
        {variants.map((v) => (
          <label
            key={v.id}
            className={`flex items-center mb-2 p-2 rounded border transition ${
              bestDeal && bestDeal.supermarket === v.supermarket && bestDeal.price === v.price
                ? 'bg-green-50 border-green-400'
                : 'border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="variant"
              value={v.id}
              checked={selectedVariant === v.id}
              onChange={() => setSelectedVariant(v.id)}
              className="mr-2"
            />
            <span>
              <strong>{v.supermarket}</strong> — Kč{Number(v.price).toFixed(2)}
            </span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label htmlFor="quantity" className="font-medium block mb-1">
          Quantity:
        </label>
        <input
          id="quantity"
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, +e.target.value || 1))}
          className="border rounded px-2 py-1 w-24"
        />
      </div>

      <button
        onClick={handleAdd}
        disabled={adding}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {adding ? 'Adding…' : 'Add to List'}
      </button>

      {success && (
        <div className="mt-3 text-green-600">
          Added to your shopping list!
        </div>
      )}
    </div>
  )
}
