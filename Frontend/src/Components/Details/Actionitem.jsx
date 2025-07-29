import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useContext, useState } from "react";
import { DataContext } from "../../Context/DataProvider";
import { addToCart } from "../../Redux/actions/cartActions";
import LoginDialog from "../Login/Loginialog";
import { FaShoppingCart, FaBolt } from "react-icons/fa";

const ActionItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { account } = useContext(DataContext);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const { id } = product;

  const addItemToCart = () => {
    if (account) {
      dispatch(addToCart(product._id, quantity));
      navigate("/cart");
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="min-w-[40%] pt-10 pl-16 lg:pt-5 lg:pl-10 sm:pl-10 sm:pt-5">
      <div className="p-4">
        <img
          src={`http://localhost:3001${product.image}`}
          alt={product.title || "Product"}
          className="w-60 h-60 mx-1.0"
        />

        {/* ✅ Product Title */}
        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          {product.title}
        </h2>

        {/* ✅ Product Price */}
        <p className="text-xl font-bold text-green-600 mt-2">
          ₹{product.price}
        </p>
      </div>

      <div className="flex space-x-2 mt-4">
        <button
          onClick={addItemToCart}
          className="flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded w-1/2 sm:w-1/2"
        >
          <FaShoppingCart className="h-5 w-5 mr-2" />
          Add to Cart
        </button>

        <Link
          to={account ? "/Payment" : "#"}
          onClick={() => !account && setOpen(true)}
          className={`flex items-center justify-center text-white font-semibold py-3 rounded w-1/2 sm:w-1/2 ${
            account
              ? "bg-orange-600 hover:bg-orange-700"
              : "bg-orange-600 cursor-pointer"
          }`}
        >
          <FaBolt className="h-5 w-5 mr-2" />
          Buy Now
        </Link>
      </div>

      <LoginDialog open={open} setopen={setOpen} />
    </div>
  );
};

export default ActionItem;
