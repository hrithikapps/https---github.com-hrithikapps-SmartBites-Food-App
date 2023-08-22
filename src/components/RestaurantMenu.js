import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CDN_IMG_ID } from "./Constants";
import { Shimmer } from "./Shimmer";
import { LiaRupeeSignSolid } from "react-icons/lia";

const RestaurantMenu = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setmenuItems] = useState(null);

  useEffect(() => {
    getRestaurants();
  }, []);

  getRestaurants = async () => {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5362084&lng=73.8939748&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
    );
    // const data = await fetch(
    //   `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5362084&lng=73.8939748&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
    // );
    // const data = await fetch(
    //   `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.5362084&lng=73.8939748&restaurantId=${id}`
    // );
    const result = await data.json();
    // console.log(result.data.cards);
    // console.log(result.data.cards[0].card.card.info);
    setRestaurant(result.data?.cards[0]?.card?.card?.info);
    // const menu = result?.data?.cards[2]?.groupedCard.cardGroupMap.REGULAR.cards;
    const menu =
      result?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        .map((c) => c.card?.card)
        .filter((x) => {
          return (
            x["@type"] ==
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
          );
        });

    // console.log(menu);
    const item = menu?.map((x) => x.itemCards.map((y) => y.card.info));

    // console.log(item);
    setmenuItems(item);
  };
  if (!restaurant) {
    return <Shimmer />;
  }
  return (
    <>
      <div className="flex flex-col ">
        <p>Restaurant id: {id}</p>
        <div className="flex justify-around p-4 w-4/5 m-auto items-center ">
          <div className="flex flex-row items-center">
            <img
              className="w-56 h-40 rounded-lg"
              src={CDN_IMG_ID + restaurant?.cloudinaryImageId}
              alt="Image"
            />
          </div>
          <div className="ml-3 items-center ">
            <h4 className="text-2xl font-bold">{restaurant.name}</h4>
            <h6 className="font-thin">{restaurant.areaName}</h6>
            <p>{restaurant?.cuisines?.join(", ")}</p>
          </div>
          <div>
            <h6 className="font-bold">{restaurant?.avgRating} stars</h6>
            <h6 className="font-thin">{restaurant?.costForTwoMessage}</h6>
          </div>
        </div>
        <div className="flex flex-col w-2/4 m-auto p-4  gap-1">
          {menuItems?.map((m) => {
            console.log(m);
            {
              key = menuItems?.id;
            }

            return m.map((insideMenu) => {
              return (
                <div className=" flex flex-row gap-1 p-2  max-h-36 m-3  items-center relative bg-slate-50 rounded-lg ">
                  <div className="w-3/4">
                    <h5 className="font-bold">{insideMenu?.name}</h5>
                    <p className="font-thin text-xs">
                      {insideMenu?.description}
                    </p>
                    <h4 className="flex flex-row items-center mt-1">
                      <LiaRupeeSignSolid />
                      {Math.round(insideMenu?.price / 100)}
                    </h4>
                  </div>
                  {insideMenu?.imageId === undefined ? null : (
                    <img
                      className="w-32 h-24 absolute  rounded-lg right-0 "
                      src={CDN_IMG_ID + insideMenu?.imageId}
                      alt="foodImage"
                    />
                  )}
                  <hr className="bg-slate-600" />
                </div>
              );
              // return <p>{insideMenu?.name}</p>;
            });
          })}
        </div>
      </div>
    </>
  );
};
export default RestaurantMenu;
