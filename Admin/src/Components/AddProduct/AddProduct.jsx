// import React, { useState } from "react";
// import axios from "axios";

// const categoryOptions = {
//   electronics: ["TVs", "Headphones", "Smart Devices", "Cameras", "Speakers"],
//   mobiles: ["Smartphones", "Feature Phones", "Phone Cases", "Chargers"],
//   fashion: ["Clothes", "Bags", "Sunglasses", "Watches"],
//   footwear: ["Sneakers", "Sandals", "Formal Shoes", "Sports Shoes"],
//   jewellery: ["Rings", "Necklaces", "Earrings", "Watches"],
//   beauty: ["Makeup", "Skincare", "Haircare", "Perfumes"],
//   books: ["Novels", "Comics", "Stationery", "Academic Books"],
//   home: ["Cookware", "Decor", "Cleaning Supplies"],
//   furniture: ["Sofas", "Beds", "Tables", "Chairs"],
//   appliances: ["Refrigerators", "Washing Machines", "ACs", "Microwaves"],
//   toys: ["Board Games", "Action Figures", "Puzzles"],
//   sports: ["Gym Equipment", "Yoga Mats", "Sportswear"],
//   grocery: ["Snacks", "Beverages", "Staples"],
//   health: ["Supplements", "Medical Devices", "Fitness Gear"],
//   automotive: ["Car Accessories", "Bike Accessories", "Spare Parts"],
//   computers: ["Laptops", "Monitors", "Storage Devices", "PC Components"],
//   gaming: ["Consoles", "Controllers", "Gaming Accessories"],
// };

// const AddProduct = () => {
//   const [products, setProducts] = useState([
//     {
//       title: "",
//       price: "",
//       discountPrice: "",
//       category: "",
//       subcategory: "",
//       customCategory: "",
//       customSubcategory: "",
//       stock: "",
//       status: "draft",
//       description: "",
//       image: null,
//       preview: null,
//     },
//   ]);

//   const [loading, setLoading] = useState(false);

//   const handleChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedProducts = [...products];
//     updatedProducts[index][name] = value;

//     // Reset subcategory if main category changes
//     if (name === "category") {
//       updatedProducts[index].subcategory = "";
//       updatedProducts[index].customCategory = "";
//       updatedProducts[index].customSubcategory = "";
//     }

//     setProducts(updatedProducts);
//   };

//   const handleImageChange = (index, e) => {
//     const file = e.target.files[0];
//     const updatedProducts = [...products];
//     updatedProducts[index].image = file;
//     updatedProducts[index].preview = file ? URL.createObjectURL(file) : null;
//     setProducts(updatedProducts);
//   };

//   const addAnotherProduct = () => {
//     setProducts([
//       ...products,
//       {
//         title: "",
//         price: "",
//         discountPrice: "",
//         category: "",
//         subcategory: "",
//         customCategory: "",
//         customSubcategory: "",
//         stock: "",
//         status: "draft",
//         description: "",
//         image: null,
//         preview: null,
//       },
//     ]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("admin-token");

//       for (let product of products) {
//         const formData = new FormData();
//         formData.append("title", product.title);
//         formData.append("price", Number(product.price));
//         formData.append("discountPrice", Number(product.discountPrice) || 0);
//         formData.append("stock", Number(product.stock) || 0);

//         // Use custom category if "Others" selected
//         formData.append(
//           "category",
//           product.category === "others" ? product.customCategory : product.category
//         );

//         // Use custom subcategory if "Others" selected
//         formData.append(
//           "subcategory",
//           product.category === "others" ? product.customSubcategory : product.subcategory
//         );

//         formData.append("status", product.status);
//         formData.append("description", product.description);
//         if (product.image) formData.append("image", product.image);

//         await axios.post("http://localhost:3001/api/products", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//       }

//       alert("✅ All products added successfully!");

//       // Reset form
//       setProducts([
//         {
//           title: "",
//           price: "",
//           discountPrice: "",
//           category: "",
//           subcategory: "",
//           customCategory: "",
//           customSubcategory: "",
//           stock: "",
//           status: "draft",
//           description: "",
//           image: null,
//           preview: null,
//         },
//       ]);
//     } catch (error) {
//       console.error("❌ Error adding products:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Error adding products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-4">
//       <h2 className="text-2xl font-bold text-gray-700">Add Multiple Products</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         {products.map((product, index) => {
//           const subcategories =
//             product.category && product.category !== "others"
//               ? categoryOptions[product.category]
//               : [];

//           return (
//             <div key={index} className="p-4 border border-gray-300 rounded-md space-y-4">
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Product Title"
//                 value={product.title}
//                 onChange={(e) => handleChange(index, e)}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               />

//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={product.price}
//                 onChange={(e) => handleChange(index, e)}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 min={1}
//                 required
//               />

//               <input
//                 type="number"
//                 name="discountPrice"
//                 placeholder="Discount Price (optional)"
//                 value={product.discountPrice}
//                 onChange={(e) => handleChange(index, e)}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 min={0}
//               />

//               {/* Main Category */}
//               <select
//                 name="category"
//                 value={product.category}
//                 onChange={(e) => handleChange(index, e)}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               >
//                 <option value="">Select Category</option>
//                 {Object.keys(categoryOptions).map((cat) => (
//                   <option key={cat} value={cat}>
//                     {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                   </option>
//                 ))}
//                 <option value="others">Others</option>
//               </select>

//               {/* Custom Category */}
//               {product.category === "others" && (
//                 <input
//                   type="text"
//                   name="customCategory"
//                   placeholder="Enter custom category"
//                   value={product.customCategory || ""}
//                   onChange={(e) => handleChange(index, e)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                   required
//                 />
//               )}

//               {/* Subcategory */}
//               {subcategories.length > 0 && (
//                 <select
//                   name="subcategory"
//                   value={product.subcategory}
//                   onChange={(e) => handleChange(index, e)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                   required
//                 >
//                   <option value="">Select Subcategory</option>
//                   {subcategories.map((sub, idx) => (
//                     <option key={idx} value={sub}>
//                       {sub}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               {/* Custom Subcategory */}
//               {product.category === "others" && (
//                 <input
//                   type="text"
//                   name="customSubcategory"
//                   placeholder="Enter custom subcategory"
//                   value={product.customSubcategory || ""}
//                   onChange={(e) => handleChange(index, e)}
//                   className="w-full p-2 border border-gray-300 rounded"
//                   required
//                 />
//               )}

//               <input
//                 type="number"
//                 name="stock"
//                 placeholder="Stock Quantity"
//                 value={product.stock}
//                 onChange={(e) => handleChange(index, e)}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 min={0}
//                 required
//               />

//               <select
//                 name="status"
//                 value={product.status}
//                 onChange={(e) => handleChange(index, e)}
//                 className="w-full p-2 border border-gray-300 rounded"
//               >
//                 <option value="draft">Draft</option>
//                 <option value="published">Published</option>
//               </select>

//               <textarea
//                 name="description"
//                 placeholder="Product description..."
//                 value={product.description}
//                 onChange={(e) => handleChange(index, e)}
//                 rows="4"
//                 className="w-full p-2 border border-gray-300 rounded resize-none"
//               />

//               {/* File Upload */}
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImageChange(index, e)}
//                 required
//                 className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
//                   file:rounded-full file:border-0 file:text-sm file:font-semibold 
//                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//               />

//               {product.preview && (
//                 <img
//                   src={product.preview}
//                   alt="Preview"
//                   className="h-40 object-contain mt-2"
//                 />
//               )}
//             </div>
//           );
//         })}

//         <button
//           type="button"
//           onClick={addAnotherProduct}
//           className="w-full py-2 px-4 rounded text-white bg-blue-600 hover:bg-blue-700"
//         >
//           + Add Another Product
//         </button>

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full py-2 px-4 rounded text-white ${
//             loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
//           }`}
//         >
//           {loading ? "Adding..." : "Submit All Products"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


// ✅ NEW CODE

import React, { useState } from "react";
import axios from "axios";

const categoryOptions = {
  electronics: ["TVs", "Headphones", "Smart Devices", "Cameras", "Speakers"],
  mobiles: ["Smartphones", "Feature Phones", "Phone Cases", "Chargers"],
  fashion: ["Clothes", "Bags", "Sunglasses", "Watches"],
  footwear: ["Sneakers", "Sandals", "Formal Shoes", "Sports Shoes"],
  jewellery: ["Rings", "Necklaces", "Earrings", "Watches"],
  beauty: ["Makeup", "Skincare", "Haircare", "Perfumes"],
  books: ["Novels", "Comics", "Stationery", "Academic Books"],
  home: ["Cookware", "Decor", "Cleaning Supplies"],
  furniture: ["Sofas", "Beds", "Tables", "Chairs"],
  appliances: ["Refrigerators", "Washing Machines", "ACs", "Microwaves"],
  toys: ["Board Games", "Action Figures", "Puzzles"],
  sports: ["Gym Equipment", "Yoga Mats", "Sportswear"],
  grocery: ["Snacks", "Beverages", "Staples"],
  health: ["Supplements", "Medical Devices", "Fitness Gear"],
  automotive: ["Car Accessories", "Bike Accessories", "Spare Parts"],
  computers: ["Laptops", "Monitors", "Storage Devices", "PC Components"],
  gaming: ["Consoles", "Controllers", "Gaming Accessories"],
};

const AddProduct = () => {
  const [products, setProducts] = useState([
    {
      title: "",
      price: "",
      discountPrice: "",
      category: "",
      subcategory: "",
      customCategory: "",
      customSubcategory: "",
      stock: "",
      status: "draft",
      description: "",
      image: null,
      preview: null,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedProducts = [...products];
    updatedProducts[index][name] = value;

    if (name === "category") {
      updatedProducts[index].subcategory = "";
      updatedProducts[index].customCategory = "";
      updatedProducts[index].customSubcategory = "";
    }

    setProducts(updatedProducts);
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("Image size must be less than 2MB");
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[index].image = file;
    updatedProducts[index].preview = file ? URL.createObjectURL(file) : null;
    setProducts(updatedProducts);
  };

  const addAnotherProduct = () => {
    setProducts([
      ...products,
      {
        title: "",
        price: "",
        discountPrice: "",
        category: "",
        subcategory: "",
        customCategory: "",
        customSubcategory: "",
        stock: "",
        status: "draft",
        description: "",
        image: null,
        preview: null,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    for (let p of products) {
      if (p.price <= 0) {
        alert("Price must be greater than 0");
        return;
      }
      if (p.discountPrice < 0) {
        alert("Discount must be 0 or greater");
        return;
      }
      if (p.stock < 0) {
        alert("Stock must be 0 or greater");
        return;
      }
      if (!p.image) {
        alert("Please upload an image for all products");
        return;
      }
    }

    setLoading(true);
    setUploadStatus([]);

    try {
      const token = localStorage.getItem("admin-token");

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        setUploadStatus((prev) => [...prev, `Uploading "${product.title}"...`]);

        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("price", Number(product.price));
        formData.append("discountPrice", Number(product.discountPrice) || 0);
        formData.append("stock", Number(product.stock) || 0);
        formData.append(
          "category",
          product.category === "others" ? product.customCategory : product.category
        );
        formData.append(
          "subcategory",
          product.category === "others" ? product.customSubcategory : product.subcategory
        );
        formData.append("status", product.status);
        formData.append("description", product.description);
        formData.append("image", product.image);

        await axios.post("http://localhost:3001/api/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });

        setUploadStatus((prev) => [...prev, `"${product.title}" uploaded successfully!`]);
      }

      setShowSuccess(true);
      setProducts([
        {
          title: "",
          price: "",
          discountPrice: "",
          category: "",
          subcategory: "",
          customCategory: "",
          customSubcategory: "",
          stock: "",
          status: "draft",
          description: "",
          image: null,
          preview: null,
        },
      ]);
    } catch (error) {
      console.error(error);
      alert("❌ Error adding products. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-md relative">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Add Products
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {products.map((product, index) => {
          const subcategories =
            product.category && product.category !== "others"
              ? categoryOptions[product.category]
              : [];

          return (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-8 p-6 border border-gray-200 rounded-xl hover:shadow-lg transition"
            >
              <div className="space-y-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Product Title"
                  value={product.title}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min={1}
                    required
                  />
                  <input
                    type="number"
                    name="discountPrice"
                    placeholder="Discount Price (optional)"
                    value={product.discountPrice}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    min={0}
                  />
                </div>

                <select
                  name="category"
                  value={product.category}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {Object.keys(categoryOptions).map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                  <option value="others">Others</option>
                </select>

                {product.category === "others" && (
                  <>
                    <input
                      type="text"
                      name="customCategory"
                      placeholder="Custom Category"
                      value={product.customCategory || ""}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <input
                      type="text"
                      name="customSubcategory"
                      placeholder="Custom Subcategory"
                      value={product.customSubcategory || ""}
                      onChange={(e) => handleChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </>
                )}

                {subcategories.length > 0 && (
                  <select
                    name="subcategory"
                    value={product.subcategory}
                    onChange={(e) => handleChange(index, e)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub, idx) => (
                      <option key={idx} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                )}

                <input
                  type="number"
                  name="stock"
                  placeholder="Stock Quantity"
                  value={product.stock}
                  onChange={(e) => handleChange(index, e)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min={0}
                  required
                />

                <textarea
                  name="description"
                  placeholder="Description..."
                  value={product.description}
                  onChange={(e) => handleChange(index, e)}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e)}
                  className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
                    file:rounded-full file:border-0 file:text-sm file:font-semibold 
                    file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
                {product.preview && (
                  <img
                    src={product.preview}
                    alt="Preview"
                    className="h-40 object-contain mt-4 rounded-lg shadow-sm"
                  />
                )}
              </div>
            </div>
          );
        })}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={addAnotherProduct}
            className="flex-1 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition font-medium"
          >
            + Add Another Product
          </button>

          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 rounded-lg text-white font-medium ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            } transition flex items-center justify-center gap-2`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            )}
            {loading ? "Adding..." : "Submit All Products"}
          </button>
        </div>
      </form>

      {/* Upload Status */}
      {uploadStatus.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner space-y-1">
          {uploadStatus.map((msg, idx) => (
            <p key={idx} className="text-gray-700 text-sm">
              {msg}
            </p>
          ))}
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center shadow-lg">
            <h3 className="text-2xl font-semibold text-green-600 mb-4">✅ Success!</h3>
            <p className="text-gray-700 mb-6">All products added successfully!</p>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddProduct;

