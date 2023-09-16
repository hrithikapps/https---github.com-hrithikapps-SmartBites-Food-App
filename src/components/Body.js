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
    console.log("rendered use effect ");
    getRestaurants();
  }, []);

  //API call to swiggy.com/Swiggy's API

  const getRestaurants = async () => {
    console.log("called get restaurant");
    let data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5679146&lng=73.91434319999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5362084&lng=73.8939748&page_type=DESKTOP_WEB_LISTING"
    // "https://www.swiggy.com/dapi/homepage/getCards?lat=18.5362084&lng=73.8939748"
    let response = await data.json();

    // console.log("fetched" + json.data?.cards[3]?.card?.card?.gridElements);


    //Swiggy Daylight API Data
    const dataArray2 =
      response.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;


    //Swiggy Night API data
    const dataArray =
      response.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    // console.log(json?.data?.success?.cards[0]?.favourite?.cards);

    //Conditional Rendering of data from API
    if (dataArray !== undefined) {
      setFilteredRestaurant(dataArray);
      setAllRestaurants(dataArray);
    } else {
      setFilteredRestaurant(dataArray2);
      setAllRestaurants(dataArray2);
    }

    // setFilteredRestaurant(json?.data?.success?.cards[0]?.favourite?.cards);
    // setAllRestaurants(json?.data?.success?.cards[0]?.favourite?.cards);
    console.log(dataArray2);
  };

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
              to={"./restaurant/" + restaurant.info?.id}
              key={restaurant?.info?.id}
            >
              <RestaurantCards {...restaurant?.info} />
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
