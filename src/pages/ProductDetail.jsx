import React from "react";
import { useParams, useNavigate } from "react-router-dom";

// Sample product data (reuse or import from your data file)
const productsData = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu_MSTDWG7qQYhRcsVlhxJNMAlXeOdyDsl6g&s",
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description 2",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzvqlOdBP5NgFqHc3nWtRvoy13J9z2E1EAg&s",
  },
  {
    id: 3,
    title: "Product 3",
    description: "Description 3",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzvqlOdBP5NgFqHc3nWtRvoy13J9z2E1EAg&s",
  },
];

const ProductDetail = () => {
  const { id } = useParams(); // Get product ID from the URL
  const navigate = useNavigate();

  // Find the product with the matching ID
  const product = productsData.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-red-500">Product not found!</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex flex-col items-center">
      <button
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
        onClick={() => navigate(-1)} // Go back to the previous page
      >
        Back
      </button>
      <div className="w-full max-w-2xl p-4 shadow-md border rounded-md">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
