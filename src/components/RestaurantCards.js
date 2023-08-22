// import RestaurantData from "..components/Constants";
import { CDN_IMG_ID } from "./Constants";
import { AiFillStar } from "react-icons/ai";

export const RestaurantCards = ({
  name,
  cloudinaryImageId,
  cuisines,
  avgRating,
  costForTwo,
}) => {
  return (
    <div className="w-56  p-2 flex flex-col min-h-full flex-wrap cursor-pointer hover:shadow-md rounded-xl m-2 max-h-80 mb-0">
      <img
        className="w-full h-32 rounded-md hover:shadow-lg"
        alt={name}
        src={CDN_IMG_ID + cloudinaryImageId}
      />

      <h4 className="text-lg mt-2 font-semibold">{name}</h4>
      <p className="text-xs mt-1  text-slate-600 font-thin">
        {cuisines?.slice(0, 6)?.join(", ")}
      </p>
      <div className="flex justify-between m-3 bottom-0">
        <h5 className="text-sm font-semibold flex justify-center items-center">
          {avgRating} <AiFillStar />
        </h5>
        <h6 className="text-sm  "> {costForTwo}</h6>
      </div>
    </div>
  );
};
