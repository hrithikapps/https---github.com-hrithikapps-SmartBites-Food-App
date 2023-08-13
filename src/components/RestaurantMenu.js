import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CDN_IMG_ID } from "./Constants";
import { Shimmer } from "./Shimmer";

const RestaurantMenu = () => {
  const { id } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setmenuItems] = useState(null);
  // const useEffect=(()=>{
  //   const {restaurantInfo,menu}=
  // },restaurant)

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
      <div className="restaurantMenuPage">
        <div className="filteredRestaurantCard">
          <h3>Restaurant id: {id}</h3>

          <img src={CDN_IMG_ID + restaurant.cloudinaryImageId} alt="Image" />
          <h4>{restaurant.name}</h4>
          <h6>{restaurant.areaName}</h6>
          <p>{restaurant?.cuisines?.join(", ")}</p>
          <div>
            <h6>Cost For Two: {restaurant?.costForTwoMessage}</h6>
            <h6>{restaurant?.avgRating} stars</h6>
          </div>
        </div>
        <div className="dishes">
          {menuItems?.map((m) => {
            console.log(m);

            return m.map((insideMenu) => {
              return (
                <div className="menuItems">
                  {insideMenu?.imageId === undefined ? null : (
                    <img
                      src={CDN_IMG_ID + insideMenu?.imageId}
                      alt="foodImage"
                    />
                  )}

                  <h5>{insideMenu?.name}</h5>
                  <h4>{insideMenu?.price / 100}</h4>
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

// map/card/info
