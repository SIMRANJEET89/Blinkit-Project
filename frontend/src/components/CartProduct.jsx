import { Link } from "react-router-dom";
import { DisplayPriceInRupees } from "../utils/DisplayPriceInRupees";
import { validURLConvert } from "../utils/ValidUrlConvert";
import { priceWithDiscount } from "../utils/PriceWithDiscount";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { useState } from "react";
import toast from "react-hot-toast";

const CartProduct = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const url = `/product/${validURLConvert(data.name)}-${data._id}`;

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      const response = await Axios({
        ...SummaryApi.addToCart,
        data : {
          productId: data?._id,
        },
      });

      const { data : responseData } = response;

      if (responseData.success) {
        toast.success(responseData.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={url}
      className="border py-2 lg:p-4 gap-1 grid lg:gap-3 min-w-36 lg:min-w-52 rounded bg-white"
    >
      <div className="min-h-20 max-h-24 lg:max-h-32 rounded w-full overflow-hidden">
        <img
          src={data.image[0]}
          className="w-full h-full object-scale-down lg:scale-125 "
          alt=""
        />
      </div>
      <div className="flex items-center gap-1">
        <div className="text-xs w-fit px-2 p-1 rounded text-green-600 bg-green-100">
          10 min
        </div>
        <div>
          {Boolean(data.discount) && (
            <p className="text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full">
              {data.discount}% discount
            </p>
          )}
        </div>
      </div>

      <div className="px-1 font-medium text-ellipsis text-sm lg-text-base line-clamp-2">
        {data.name}
      </div>
      <div className="w-fit px-2 text-sm lg:text-base">{data.unit}</div>

      <div className="px-2 lg:px-0 flex items-center justify-between gap-1 lg:gap-3 text-sm lg:text-base">
        <div className="flex items-center gap-1">
          <div className="font-semibold">
            {DisplayPriceInRupees(priceWithDiscount(data.price, data.discount))}
          </div>
        </div>
        <div className="">
          {data.stock == 0 ? (
            <p className="text-red-500 text-sm text-center">Out of stock</p>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-green-700 hover:bg-green-600 text-white px-2 lg:px-4 py-1 rounded"
            >
              Add
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CartProduct;
