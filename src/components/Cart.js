import React from "react";
import { CDN_IMG_ID } from "./Constants";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { removeItem } from "../utils/cartSlice";
import { handleDecrement } from "../utils/cartSlice";
import { handleIncrement } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <>
      <h2 className="flex justify-center text-sm font-bold">
        This is Cart Page
      </h2>
      <button
        onClick={() => handleClearCart()}
        className=" flex absolute right-32 top-32 text-white bg-orange-600 p-1 pl-2 pr-2 rounded-md"
      >
        Clear Cart
      </button>
      <div className="m-10 flex  flex-col">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-center  w-3/6">
            <div>
              {item.imageId == undefined ? null : (
                <img
                  className="w-28 h-24 rounded-md"
                  src={CDN_IMG_ID + item.imageId}
                  alt="Food Image"
                />
              )}
            </div>
            <div className="flex flex-wrap flex-col pl-4">
              <p className="font-semibold text">{item.name}</p>
              <h2 className="text-xs font-thin text-slate-600">
                {item.category}{" "}
              </h2>
              <p className="font-semibold ">
                {isNaN(item.price / 100)
                  ? item.defaultPrice / 100
                  : item.price / 100}
              </p>
              <div className="flex justify-between">
                <div className=" flex justify-center align-middle">
                  <button
                    onClick={() => dispatch(handleDecrement(item))}
                    type="button"
                    className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 font-bold rounded-md text-xl  px-4 py-1 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
                  >
                    -
                  </button>
                  <div className="m-auto pl-1 pr-2"> {item.qty} </div>
                  <button
                    onClick={() => dispatch(handleIncrement(item))}
                    type="button"
                    className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 font-bold rounded-md text-xl px-4 py-1 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => dispatch(removeItem(item))}
                  type="button"
                  className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 rounded-md text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="flex flex-col w-3/12 border-black min-h-fit">
          <h3 className="font-semibold">Order Summary</h3>
          <hr className="h-px my-8 bg-gray-200 border-0 "></hr>
        </div>
      </div>
    </>
  );
};
export default Cart;
