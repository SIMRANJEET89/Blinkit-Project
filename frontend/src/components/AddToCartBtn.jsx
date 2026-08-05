import SummaryApi from "../common/SummaryApi";
import { useGlobalContext } from "../Provider/GlobalProvider";
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { FaMinus,  FaPlus  } from "react-icons/fa";




const AddToCartBtn = ({ data }) => {
  const { fetchCartItem } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const cartItem = useSelector((state) => state.cartItem.cart);
  const [isAvailableCart, setIsAvailableCart] = useState(false);
  const [qty,setQty] = useState(0)


  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addToCart,
        data: {
          productId: data?._id,
        },
      });

      const { data: responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
        if (fetchCartItem) {
          fetchCartItem();
        }
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  // checkin this item in cart or not
  useEffect(() => {
    const checkingItem = cartItem.some(
      (item) => item.productId._id === data._id,
    );
    setIsAvailableCart(checkingItem);

    const product = cartItem.find(item => item.productId._id === data._id)
    setQty(product?.quantity)

  }, [data, cartItem]);

  return (
    <div>
      {isAvailableCart ? (
        <div>
          <button><FaMinus/></button>
          <p>{qty}</p>
          <button><FaPlus/></button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-green-700 hover:bg-green-600 text-white px-2 lg:px-4 py-1 rounded"
        >
          {loading ? <Loading /> : "ADD"}
        </button>
      )}
    </div>
  );
};

export default AddToCartBtn;
