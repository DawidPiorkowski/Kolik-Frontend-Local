import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  listAllProducts,
  searchProducts,
  getProductsByCategory,
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

// Custom hook to encapsulate product fetching logic
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
        if (searchTerm) {
          data = await searchProducts(searchTerm);
        } else if (categoryId) {
          // API returns { category: string; products: Product[] }
          const resp = await getProductsByCategory(categoryId);
          data = resp.products;
        } else {
          data = await listAllProducts();
        }
        if (!cancelled) {
          setProducts(data);
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
const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <div className="border p-4 rounded shadow-sm flex flex-col">
    <h2 className="font-medium text-lg mb-1">{product.name}</h2>
    <p className="text-sm text-gray-600 mb-2">
      {product.amount} {product.unit} &middot; <em>{product.category_name}</em>
    </p>
    <div className="mt-auto">
      <Link to={`/products/${product.id}`} className="text-blue-600 hover:underline">
        View Details
      </Link>
    </div>
  </div>
);

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
    // searchTerm is already updated on input change
  };

  const handleCategorySelect = (id: number) => {
    setSelectedCategory(prev => (prev === id ? null : id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Products</h1>

      {/* Search */}
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="border rounded px-2 py-1 w-64"
        />
        <button type="submit" className="ml-2 px-3 py-1 border rounded hover:bg-gray-100">
          Search
        </button>
      </form>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto mb-4">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategorySelect(cat.id)}
            className={`px-3 py-1 rounded-full border transition-colors
              ${selectedCategory === cat.id ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
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
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
