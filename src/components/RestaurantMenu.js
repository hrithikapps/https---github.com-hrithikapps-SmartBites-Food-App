import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CDN_IMG_ID } from "./Constants";
import { Shimmer } from "./Shimmer";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";
import axios, * as others from "axios";

const RestaurantMenu = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    item.hasOwnProperty("qty") ? item.qty++ : (item.qty = 1);
    dispatch(addItem(item));
  };

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setmenuItems] = useState([]);
  let dataArray = [];

  useEffect(() => {
    getRestaurant();
  }, []);

  const getRestaurant = async () => {
    try {
      const response = await axios.get(
        `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5362084&lng=73.8939748&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
      );
      const result = response.data;

      const dataArray2 =
        result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]
          ?.card?.card.itemCards;
      console.log("dataArray2", dataArray2);

      const dataArray1 =
        result?.data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[4]
          .card?.card?.itemCards;
      if (dataArray2) {
        dataArray = [dataArray1, ...dataArray2];
      } else {
        dataArray =
          result.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards[4].card
            .card.itemCards;
      }
      setmenuItems(dataArray);
      setRestaurant(result.data?.cards[2]?.card?.card?.info);
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  if (!restaurant) {
    return <Shimmer />;
  }
  return (
    <>
      <div className="flex flex-col ">
        <div className="flex justify-around p-4 w-4/5 m-auto items-center ">
          <div className="flex flex-row items-center">
            <img
              className="w-52 h-32 rounded-lg"
              src={CDN_IMG_ID + restaurant?.cloudinaryImageId}
              alt="Image"
            />
          </div>
          <div className="ml-3 items-center ">
            <h4 className="text-xl font-bold">{restaurant.name}</h4>
            <h6 className="font-thin">{restaurant.areaName}</h6>
            <p>{restaurant?.cuisines?.join(", ")}</p>
          </div>
          <div>
            <h6 className="font-bold">{restaurant?.avgRating} stars</h6>
            <h6 className="font-thin">{restaurant?.costForTwoMessage}</h6>
          </div>
        </div>
        <div className="flex flex-col w-2/4 m-auto p-4  gap-1">
          {menuItems?.map((mappedCard, index) => {
            if (mappedCard && mappedCard?.card?.info) {
              key = { index };
              const { info } = mappedCard?.card;
              return (
                <div
                  key={info.id}
                  className=" flex flex-row gap-1 p-2  max-h-36 m-3 mb-11  items-center relative bg-slate-50 rounded-lg "
                >
                  <div className="w-3/4">
                    <h5 className="font-semibold">{info?.name}</h5>
                    <p className="font-thin text-xs line-clamp-3">
                      {info?.description}
                    </p>
                    <h4 className="flex flex-row items-center mt-1">
                      <LiaRupeeSignSolid />
                      {isNaN(Math.round(info?.price / 100))
                        ? Math.round(info.defaultPrice / 100)
                        : Math.round(info?.price / 100)}
                    </h4>
                    <button
                      onClick={() => handleAddItem(info)}
                      className="px-3 py-1 rounded-md bg-orange-600 text-white text-center font-thin text-sm hover:bg-orange-700"
                    >
                      Add Item
                    </button>
                  </div>
                  {info?.imageId === undefined ? null : (
                    <img
                      className="w-32 h-24 absolute  rounded-lg right-0 "
                      src={CDN_IMG_ID + info?.imageId}
                      alt="foodImage"
                    />
                  )}
                  <hr className="bg-slate-600" />
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
export default RestaurantMenu;
