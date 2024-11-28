import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const productsdata = [
  {
    id: 1,
    title: "Product 1",
    description: "Description 1",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu_MSTDWG7qQYhRcsVlhxJNMAlXeOdyDsl6g&s",
  },
  {
    id: 2,
    title: "Product 2",
    description: "Description 2",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzvqlOdBP5NgFqHc3nWtRvoy13J9z2E1EAg&s",
  },
  {
    id: 3,
    title: "Product 3",
    description: "Description 3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzvqlOdBP5NgFqHc3nWtRvoy13J9z2E1EAg&s",
  },
  {
    id: 4,
    title: "Product 4",
    description: "Description 3",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlzvqlOdBP5NgFqHc3nWtRvoy13J9z2E1EAg&s",
  },
];

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: null,
    title: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      setProducts(productsdata);
      localStorage.setItem("products", JSON.stringify(productsdata));
    }
  }, []);

  const saveToLocalStorage = (updatedProducts) => {
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    const updatedProducts = products.map((prod) =>
      prod.id === currentProduct.id ? currentProduct : prod
    );
    saveToLocalStorage(updatedProducts);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const updatedProducts = products.filter((prod) => prod.id !== id);
    saveToLocalStorage(updatedProducts);
  };

  return (
    <div className="min-h-screen py-6 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Products Page</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
         <>
        <a href={`/product/${product.id}`} >
         <div key={product.id}
            className="bg-white p-4 shadow-md border border-gray-500 rounded-md flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover mb-4"
            />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(product)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
         </a>
         </>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-md w-96">
            <h2 className="text-lg font-bold mb-4">Edit Product</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={currentProduct.title}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, title: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Description</label>
              <textarea
                value={currentProduct.description}
                onChange={(e) =>
                  setCurrentProduct({
                    ...currentProduct,
                    description: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-md"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Image URL</label>
              <input
                type="text"
                value={currentProduct.image}
                onChange={(e) =>
                  setCurrentProduct({ ...currentProduct, image: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
