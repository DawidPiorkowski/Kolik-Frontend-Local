import React from 'react';
import { useParams } from 'react-router-dom';
import { useShoppingList } from '../contexts/ShoppingListContext';

const mockProducts = {
  bakery: [
    {
      name: 'White Bread',
      image: '/images/bread.jpg',
      prices: {
        BILLA: 29.9,
        Tesco: 31.5,
        Albert: 28.0,
      },
    },
    {
      name: 'Croissant',
      image: '/images/croissant.jpg',
      prices: {
        BILLA: 21.0,
        Tesco: 20.5,
        Albert: 19.9,
      },
    },
  ],
  dairy: [
    {
      name: 'Milk',
      image: '/images/milk.jpg',
      prices: {
        BILLA: 18.5,
        Tesco: 17.9,
        Albert: 19.0,
      },
    },
    {
      name: 'Cheese',
      image: '/images/cheese.jpg',
      prices: {
        BILLA: 52.0,
        Tesco: 49.5,
        Albert: 50.0,
      },
    },
  ],
};

export default function Compare() {
  const { category } = useParams();
  const { addItem } = useShoppingList();
  const products = mockProducts[category as keyof typeof mockProducts] || [];
  const stores = ['Tesco', 'BILLA', 'Albert'];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 capitalize">{category} Products</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Product</th>
              {stores.map((store) => (
                <th key={store} className="p-3 border">{store}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => {
              const cheapestStore = Object.entries(product.prices).reduce((a, b) =>
                a[1] < b[1] ? a : b
              )[0];

              return (
                <tr key={idx} className="border-t">
                  <td className="p-3 border font-semibold">{product.name}</td>
                  {stores.map((store) => {
                    const isCheapest = store === cheapestStore;
                    return (
                      <td key={store} className="p-3 border space-y-2">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="mx-auto h-16 w-16 object-contain"
                          />
                        )}
                        <div className={`text-sm ${isCheapest ? 'text-green-600 font-bold' : ''}`}>
                          {product.prices[store]} Kč
                        </div>
                        <button
                          onClick={() =>
                            addItem({
                              name: product.name,
                              price: product.prices[store],
                              store,
                              image: product.image,
                            })
                          }
                          className={`mt-1 px-2 py-1 text-xs rounded ${
                            isCheapest
                              ? 'bg-green-600 text-white hover:bg-green-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}
                        >
                          Add to list
                        </button>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
