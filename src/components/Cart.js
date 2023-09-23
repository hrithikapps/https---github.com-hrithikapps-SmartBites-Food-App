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

  const price = cartItems.reduce((acc, curr) => {
    return acc + curr.qty * (curr.price / 100);
  }, 0);

  return (
    <>
      <h2 className="flex justify-evenly text-lg font-bold">Cart</h2>
      <button
        onClick={() => handleClearCart()}
        className=" flex absolute right-40 top-20 text-white bg-orange-600 p-1 pl-2 pr-2 rounded-md hover:bg-orange-700"
      >
        Clear Cart
      </button>
      <div className="m-10 flex  flex-row justify-around">
        <div className=" w-45% align-left max-h-fit min-h-fit  bg-slate-50 rounded-lg ">
          {" "}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-stretch gap-3 flex-wrap "
            >
              <div>
                {item.imageId == undefined ? null : (
                  <img
                    className="w-28 h-24 rounded-md"
                    src={CDN_IMG_ID + item.imageId}
                    alt="Food Image"
                  />
                )}
              </div>
              <div className="flex flex-wrap flex-col">
                <p className=" flex flex-wrap text-sm">{item.name}</p>
                <h2 className="text-xs font-thin text-slate-600">
                  {item.category}{" "}
                </h2>
                <p className="font-semibold ">
                  {isNaN(item.price / 100)
                    ? item.defaultPrice / 100
                    : item.price / 100}
                </p>
                <div className="flex gap-52 justify-items-stretch  ">
                  <div className=" flex justify-center align-middle">
                    <button
                      onClick={() => dispatch(handleDecrement(item))}
                      type="button"
                      className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-1 focus:outline-none focus:ring-orange-600 font-bold rounded-md text-xl  px-4 py-0 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
                    >
                      -
                    </button>
                    <div className="m-auto pl-1 pr-2"> {item.qty} </div>
                    <button
                      onClick={() => dispatch(handleIncrement(item))}
                      type="button"
                      className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-1 focus:outline-none focus:ring-orange-600 font-bold rounded-md text-xl px-4 py-1 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => dispatch(removeItem(item))}
                    type="button"
                    className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-1 focus:outline-none focus:ring-orange-600 rounded-md text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-3/12 shadow-md  min-h-fit">
          <h3 className="font-semibold align-middle flex justify-center ">
            Order Summary
          </h3>
          <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
          <div
            className="flex flex-col
           justify-stretch p-5"
          >
            <div className="flex justify-between text-xs text-gray-800">
              <p>
                Price({" "}
                {cartItems.reduce((acc, item) => {
                  return acc + item.qty;
                }, 0)}{" "}
                Items )
              </p>
              <p className="font-bold">{price ? price : null}</p>
            </div>
            <div className="flex justify-between text-xs text-gray-700">
              <p>Discount 10%</p>
              <p className="font-bold">
                {" "}
                {price ? Math.round(0.1 * price * 100) / 100 : null}
              </p>
            </div>
            <div className="flex justify-between text-xs text-gray-700">
              <p>Delivery Charges 5%</p>
              <p className="font-bold">
                {price ? Math.round(0.05 * price * 100) / 100 : null}
              </p>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
            <div className="flex justify-between text-xs text-gray-700">
              <p className="font-bold text-sm">Total Amount</p>
              <p className="font-bold text-orange-500 text-base">
                {price ? price - (0.05 * price + 0.1 * price) : null}
              </p>
            </div>
            <hr className="h-px my-2 bg-gray-200 border-0 "></hr>
            <button className="bg-orange-500 py-1 px-3 font-semibold mt-5  text-white rounded-md">
              {" "}
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cart;
