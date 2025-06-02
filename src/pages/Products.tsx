// src/components/Products.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  listAllProducts,
  searchProducts,
  getProductsByCategory,
  addToShoppingList,
} from '../services/api';
import { Spinner } from '../components/Spinner';

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  amount: number;           // e.g. 1
  unit: string;             // e.g. "L"
  category_name: string;    // e.g. "Dairy"
}

function getProductImage(name: string): string | null {
  const map: { [key: string]: string } = {
    'Whole milk': '/logos/milkicon.png',
    'Butter': '/logos/buttericon.png',
    'Eggs size M': '/logos/eggicon.png',
    'Toast bread white': '/logos/toasticon.png',
    'Cucumber': '/logos/cucumbericon.png',
    'Rohlik': '/logos/rohlikicon.png',
  };
  return map[name] || null;
}

// Custom hook to encapsulate product-fetching logic
function useProducts(searchTerm: string, categoryId: number | null) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        let data: Product[];

        if (searchTerm.trim()) {
          data = await searchProducts(searchTerm.trim());
        } else if (categoryId !== null) {
          // API returns { category: string; products: Product[] }
          const resp = await getProductsByCategory(categoryId);
          data = resp.products;
        } else {
          data = await listAllProducts();
        }

        if (!cancelled) {
          // Always set an array (even if empty)
          setProducts(Array.isArray(data) ? data : []);
        }
      } catch (err: any) {
        if (!cancelled) {
          setError(err.message || 'Failed to load products');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [searchTerm, categoryId]);

  return { products, loading, error };
}

// Reusable product card component
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const image = getProductImage(product.name);
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);

  const handleAdd = async () => {
    try {
      await addToShoppingList({ product_id: product.id, quantity });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch {
      alert('Failed to add product.');
    }
  };

  return (
    <div className="border p-4 rounded shadow-sm flex flex-col items-center text-center bg-gray-50 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      {image && (
        <img
          src={image}
          alt={product.name}
          className="w-16 h-16 mb-3 object-contain"
        />
      )}
      <h2 className="font-medium text-lg mb-1">{product.name}</h2>
      <p className="text-sm text-gray-600 mb-2">
        {product.amount} {product.unit} • <em>{product.category_name}</em>
      </p>

      <div className="flex items-center justify-center gap-2 mt-auto">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, +e.target.value || 1))}
          className="w-16 px-2 py-1 border rounded text-center"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-2 rounded shadow transition"
        >
          Add
        </button>
      </div>

      {success && (
        <div className="text-green-600 text-sm mt-2">Added to cart!</div>
      )}
    </div>
  );
};

// Main products page
const ProductsPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { products, loading, error } = useProducts(searchTerm, selectedCategory);

  // Load categories once
  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err: any) {
        console.error('Failed to load categories', err);
      }
    }
    fetchCategories();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // no-op: the searchTerm state already updated onChange
  };

  const handleCategorySelect = (id: number) => {
    setSelectedCategory(prev => (prev === id ? null : id));
    // Clear search when switching category
    setSearchTerm('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-6 flex items-center gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder=" Search products..."
          className="px-4 py-2 w-full max-w-md rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-full bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`px-4 py-2 text-sm rounded-full font-medium shadow-sm border transition
              ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid / Empty / Error / Loading */}
      {loading ? (
        <div className="flex justify-center py-10">
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-red-500 mb-4">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="underline">
            Retry
          </button>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="py-10 text-center text-gray-600">
              <p className="text-xl font-medium">No products found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
