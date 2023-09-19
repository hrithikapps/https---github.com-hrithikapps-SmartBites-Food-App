import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { CartMenu } from "./cartMenu";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <>
      <div className="m-10">
        <h2>This is Cart Page</h2>
        <button
          onClick={() => handleClearCart()}
          className="bg-red-500 p-1 rounded-md"
        >
          Clear Cart
        </button>
        {cartItems.map((item) => (
          <div className="k" key={item.id}>
            <CartMenu {...item} key={item.id} />
          </div>
        ))}
        <div className="flex flex-col w-3/12 border-black min-h-fit">
          <h3 className="font-semibold">Order Summary</h3>
          <hr class="h-px my-8 bg-gray-200 border-0 "></hr>
        </div>
      </div>
    </>
  );
};
export default Cart;
