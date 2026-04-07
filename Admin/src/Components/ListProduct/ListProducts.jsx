import React, { useEffect, useState } from "react";
import axios from "axios";

const ListProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [updatedData, setUpdatedData] = useState({ title: "", price: "", stock: 0 });

  const [filters, setFilters] = useState({
    category: "all",
    sort: "none",
    search: "",
  });

  const token = localStorage.getItem("admin-token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
      setFilteredProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter, search, and sort
  useEffect(() => {
    let updated = [...products];

    // Filter by category
    if (filters.category !== "all") {
      updated = updated.filter((p) => p.category === filters.category);
    }

    // Search by title
    if (filters.search) {
      updated = updated.filter((p) =>
        p.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Sort
    if (filters.sort === "price-asc") updated.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price-desc") updated.sort((a, b) => b.price - a.price);
    else if (filters.sort === "stock-asc") updated.sort((a, b) => a.stock - b.stock);
    else if (filters.sort === "stock-desc") updated.sort((a, b) => b.stock - a.stock);

    setFilteredProducts(updated);
  }, [filters, products]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  const startEdit = (product) => {
    setEditProduct(product._id);
    setUpdatedData({ title: product.title, price: product.price, stock: product.stock || 0 });
  };

  const handleUpdateChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const updateProduct = async (id) => {
    try {
      await axios.put(`http://localhost:3001/api/products/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.map((p) => (p._id === id ? { ...p, ...updatedData } : p)));
      setEditProduct(null);
    } catch (err) {
      console.error("Update error:", err);
      alert(err.response?.data?.message || "Failed to update product");
    }
  };

  if (loading) return <p className="text-center mt-6">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      {/* Filters: category, sort, search */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange({ category: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="top-offer">Top Offer</option>
          <option value="deal-of-the-day">Deal of the Day</option>
          <option value="Electronics">Electronics</option>
          <option value="Furniture">Furniture</option>
          <option value="Shoes">Shoes</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => handleFilterChange({ sort: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="none">Sort By</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="stock-asc">Stock: Low → High</option>
          <option value="stock-desc">Stock: High → Low</option>
        </select>

        <input
          type="text"
          placeholder="Search by title..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
          className="border p-2 rounded w-full md:w-1/3"
        />
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Title</th>
            <th className="p-3 border">Category</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Stock</th>
            <th className="p-3 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="p-3 border">
                  <img
                    src={product.image.startsWith("http") ? product.image : `http://localhost:3001${product.image}`}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-3 border">
                  {editProduct === product._id ? (
                    <input
                      type="text"
                      name="title"
                      value={updatedData.title}
                      onChange={handleUpdateChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    product.title
                  )}
                </td>
                <td className="p-3 border">{product.category}</td>
                <td className="p-3 border">
                  {editProduct === product._id ? (
                    <input
                      type="number"
                      name="price"
                      value={updatedData.price}
                      onChange={handleUpdateChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    `₹${product.price}`
                  )}
                </td>
                <td className="p-3 border">
                  {editProduct === product._id ? (
                    <input
                      type="number"
                      name="stock"
                      value={updatedData.stock}
                      onChange={handleUpdateChange}
                      className="border p-1 rounded w-full"
                    />
                  ) : (
                    product.stock
                  )}
                </td>
                <td className="p-3 border flex gap-2">
                  {editProduct === product._id ? (
                    <>
                      <button
                        onClick={() => updateProduct(product._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditProduct(null)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(product)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4">
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListProducts;
