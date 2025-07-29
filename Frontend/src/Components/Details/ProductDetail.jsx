import { FaTags } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/actions/cartActions";
import axios from "axios";

const GetProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

  const handleAddToCart = () => {
    dispatch(addToCart(product._id, 1)); // Add to Redux Cart
     navigate("/cart");
  };

  const handleBuyNow = async () => {
    try {
      const fakeUserId = "66d000abc111222333444555"; // Replace with real user auth later

      const response = await axios.post("http://localhost:3001/api/orders", {
        productId: product._id,
        userId: fakeUserId,
        quantity: 1,
        address: "Test Address",
      });

      console.log("✅ Order placed:", response.data);

      // Navigate to success page with order data
      navigate("/checkout-success", { state: { order: response.data.order } });
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("Failed to place order");
    }
  };

  return (
    <div className="text-sm text-gray-800">
      <h1 className="text-lg font-medium">{product.title.longTitle}</h1>

      <p className="text-gray-500 mt-1">8 Rating & 1 Review</p>

      {/* Buttons */}

      <h2 className="mt-6 font-semibold text-base">Available Offers</h2>
      <div className="text-sm mt-2 space-y-2">
        <p className="flex items-start">
          <FaTags className="text-green-600 mt-1 mr-2" />
          Bank Offer : 10% off up to ₹749 on HDFC Bank Credit Card Transactions. T&C
        </p>
        <p className="flex items-start">
          <FaTags className="text-green-600 mt-1 mr-2" />
          Bank Offer : 5% Unlimited Cashback on Flipkart Axis Bank Credit Card. T&C
        </p>
        <p className="flex items-start">
          <FaTags className="text-green-600 mt-1 mr-2" />
          Bank Offer : 10% off up to ₹1,250 on HDFC Bank Credit Card Transactions. Min Txn Value: ₹7,499. T&C
        </p>
        <p className="flex items-start">
          <FaTags className="text-green-600 mt-1 mr-2" />
          Special Price : Get extra 88% off (price inclusive of cashback/coupon). T&C
        </p>
      </div>

      <table className="table-auto mt-6 w-full border-t border-gray-200">
        <tbody className="divide-y divide-gray-100">
          <tr className="align-top">
            <td className="w-32 text-gray-500 py-2">Delivery</td>
            <td className="py-2 font-medium">
              Delivery by {date.toDateString()} | ₹40
            </td>
          </tr>
          <tr className="align-top">
            <td className="w-32 text-gray-500 py-2">Warranty</td>
            <td className="py-2">No Warranty</td>
          </tr>
          <tr className="align-top">
            <td className="w-32 text-gray-500 py-2">Seller</td>
            <td className="py-2">
              <span className="text-blue-600 font-medium">SuperComNet</span>
              <p>GST invoice available</p>
              <p>View more Sellers starting from</p>
            </td>
          </tr>
          <tr className="align-top">
            <td className="w-32 text-gray-500 py-2">Description</td>
            <td className="py-2">{product.description}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default GetProductDetails;
