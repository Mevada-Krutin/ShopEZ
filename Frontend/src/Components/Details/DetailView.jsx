import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../Redux/actions/Productactions.js";
import ActionItem from "./Actionitem";
import ProductDetails from "./ProductDetail";

const DetailView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { loading, product } = useSelector((state) => state.getProductDetails);

  useEffect(() => {
    if (!product || product._id !== id) {
      dispatch(getProductDetails(id)); // ✅ Fetch product
    }
  }, [dispatch, id, product]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 mt-14 min-h-screen">
      {product && Object.keys(product).length > 0 ? (
        <div className="bg-white flex flex-wrap mx-auto max-w-7xl p-4 md:p-6">
          {/* Left Part: Image & Buttons */}
          <div className="lg:w-1/3 md:w-1/3 sm:w-8/12 w-full px-4">
            <ActionItem product={product} />
          </div>

          {/* Right Part: Product Details */}
          <div className="lg:w-2/3 md:w-2/3 sm:w-8/12 w-full mt-12 lg:mt-0 px-4">
            <ProductDetails product={product} /> {/* ✅ Show details */}
          </div>
        </div>
      ) : (
        <p className="text-center mt-10">Product not found</p>
      )}
    </div>
  );
};

export default DetailView;
