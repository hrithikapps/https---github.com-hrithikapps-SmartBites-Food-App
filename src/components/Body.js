import { RestaurantCards } from "../components/RestaurantCards";
// import RestaurantData from "./constants";
import { useState, useEffect } from "react";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/Helper";
import useOnline from "../utils/useOnline";

const Body = () => {
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [allRestaturants, setAllRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    getRestaurants();
  }, []);

  //API call to swiggy.com/Swiggy's API

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/homepage/getCards?lat=18.5362084&lng=73.8939748"
    );
    const json = await data.json();
    console.log(json);
    // console.log(json?.data?.success?.cards[0]?.favourite?.cards);
    setFilteredRestaurant(json?.data?.success?.cards[0]?.favourite?.cards);
    setAllRestaurants(json?.data?.success?.cards[0]?.favourite?.cards);
  }

  const isOnline = useOnline();
  if (!isOnline)
    return (
      <h1>
        🔴 OOPS ! Something went wrong, Please check your internet connection
      </h1>
    );

  //Not rendering the component (Early Return)
  if (!allRestaturants) {
    return null;
  }

  //Returning shimmer Component before the data is fetched
  return allRestaturants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="flex justify-center ">
        <input
          type="text"
          value={searchText}
          placeholder="Search Restaurant"
          className="px-2 rounded-lg bg-inherit border-slate-300 bg-slate-50"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="bg-[#dd6555] text-white px-5 py-1 items-center rounded-lg font-medium text-lg"
          onClick={() => {
            //Need to filter the data
            let newData = filterData(searchText, allRestaturants);
            //Update the data
            setFilteredRestaurant(newData);
          }}
        >
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRestaurant.map((restaurant) => {
          return (
            <Link
              to={"./restaurant/" + restaurant.data?.id}
              key={restaurant?.data?.id}
            >
              <RestaurantCards {...restaurant?.data} />
            </Link>
          );
        })}
        {/* <RestaurantCards {...RestaurantData[0].info} />;
        <RestaurantCards {...RestaurantData[1].info} />;
        <RestaurantCards {...RestaurantData[2].info} />; */}
      </div>
    </>
  );
};
export default Body;
