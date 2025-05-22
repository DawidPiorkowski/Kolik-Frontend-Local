import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = ['Bakery', 'Dairy', 'Snacks', 'Drinks'];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Choose a Category</h1>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((cat) => (
          <div
            key={cat}
            className="cursor-pointer bg-blue-100 hover:bg-blue-200 p-4 rounded shadow text-center"
            onClick={() => navigate(`/compare/${cat.toLowerCase()}`)}
          >
            {cat}
          </div>
        ))}
      </div>
    </div>
  );
}
