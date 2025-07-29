import NavBar from "./Navbar.jsx";
import Banner from "./Banner";
import SliderBar from "./SliderBar.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../Redux/actions/Productactions.js";
import Footer from "./Footer/Footer.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { products } = useSelector((state) => state.getProducts);
  const dispatch = useDispatch();

  const [dealProducts, setDealProducts] = useState([]);
  const [topOffers, setTopOffers] = useState([]);
  const [bestDeals, setBestDeals] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("none");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products?.length > 0) {
      setDealProducts(products.filter((p) => p.category === "deal-of-the-day"));
      setTopOffers(products.filter((p) => p.category === "top-offer"));
      setBestDeals(products.filter((p) => p.category === "best-deal"));
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    let updated = [...products];

    if (selectedCategory !== "all") {
      updated = updated.filter((p) => p.category === selectedCategory);
    }

    if (sortOption === "price-asc") {
      updated.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      updated.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updated);
  }, [selectedCategory, sortOption, products]);

  // ✅ Dark Mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? "dark bg-gray-900" : "bg-[#f2f2f2]"}`}>
      <NavBar />

      {/* ✅ Dark Mode Toggle Button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white text-black"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="px-2 py-4">
        <Banner />

        <SliderBar products={dealProducts} title="Deal of the Day" timer={true} />
        <SliderBar products={topOffers} title="Top Offers" timer={false} />
        <SliderBar products={bestDeals} title="Best Deals" timer={false} />

        {/* ✅ FILTER & SORT BAR */}
        <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded mb-6 shadow">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="all">All Categories</option>
            <option value="deal-of-the-day">Deal of the Day</option>
            <option value="top-offer">Top Offers</option>
            <option value="best-deal">Best Deals</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded dark:bg-gray-700 dark:text-white"
          >
            <option value="none">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
        </div>

        {/* ✅ PRODUCT GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product._id}
                to={`/product/${product._id}`}
                className="border p-3 bg-white dark:bg-gray-800 rounded block hover:shadow-lg transition"
              >
                <img
                  src={`http://localhost:3001${product.image}`}
                  alt={product.title}
                  className="h-40 mx-auto object-contain"
                />
                <p className="mt-2 font-semibold dark:text-white">{product.title}</p>
                <p className="text-green-600 font-bold">₹{product.price}</p>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-300">
              No products found.
            </p>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Home;
