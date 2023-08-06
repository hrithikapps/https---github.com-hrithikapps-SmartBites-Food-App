// import RestaurantData from "..components/Constants";
import { CDN_IMG_ID } from "./constants";

export const RestaurantCards = ({
  name,
  cloudinaryImageId,
  cuisines,
  avgRating,
  costForTwo,
}) => {
  return (
    <div className="cards">
      <img
        className="cardImg"
        alt={name}
        src={CDN_IMG_ID + cloudinaryImageId}
      />

      <h4>{name}</h4>
      <p className="cuisines">{cuisines?.join(", ")}</p>
      <div className="ratingsAndCostForTwo">
        <h5>{avgRating} stars</h5>
        <h6>{costForTwo}</h6>
      </div>
    </div>
  );
};
