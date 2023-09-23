// import { CDN_IMG_ID } from "./Constants";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { removeItem } from "../utils/cartSlice";

// // const cartItems = useSelector((store) => store.cart.items);
// const dispatch = useDispatch();
// // //function to remove item & update the cart
// // const handleRemove = () => {
//   // dispatch(removeItem());
// // };

// export const CartMenu = ({
//   name,
//   id,
//   defaultPrice,
//   category,
//   imageId,
//   price,
// }) => {
//   return (
//     <>
//       <div className="flex justify-center  w-3/6">
//         <div>
//           {imageId == undefined ? null : (
//             <img
//               className="w-28 h-24 rounded-md"
//               src={CDN_IMG_ID + imageId}
//               alt="Food Image"
//             />
//           )}
//         </div>
//         <div className="flex flex-wrap flex-col pl-4">
//           <p className="font-semibold text">{name}</p>
//           <h2 className="text-xs font-thin text-slate-600">{category} </h2>
//           <p className="font-semibold ">
//             {isNaN(price / 100) ? defaultPrice / 100 : price / 100}
//           </p>
//           <div className="flex justify-between">
//             <div className="">
//               <button
//                 type="button"
//                 className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 font-bold rounded-md text-xl  px-4 py-1 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
//               >
//                 -
//               </button>

//               <button
//                 type="button"
//                 className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 font-bold rounded-md text-xl px-4 py-1 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
//               >
//                 +
//               </button>
//             </div>
//             <button
//               onClick={() => dispatch(removeItem({ id }))}
//               type="button"
//               className="text-orange-600 hover:text-white border border-orange-600 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-600 rounded-md text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-orange-600 dark:text-orange-600 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-600"
//             >
//               Remove
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
