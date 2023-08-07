import { RestaurantCards } from "../components/RestaurantCards";
import RestaurantData from "./constants";
import { useState, useEffect } from "react";
import { Shimmer } from "./Shimmer";

const filterData = (searchText, restaturants) => {
  const Data = restaturants.filter((restaurant) => {
    // console.warn(searchText+"SearchText")
    restaurant?.data?.name?.includes(searchText);
    // console.warn(restaurant.info.name);
  });
  console.warn(Data + "Filtered");
  return Data;
};

const Body = () => {
  const [restaturants, setRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  // console.warn(restaturants);

  useEffect(() => {
    getRestaurants();
  }, []);

  //API call to swiggy.com/Swiggy's API

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/homepage/getCards?lat=18.5362084&lng=73.8939748"
    );
    const json = await data.json();
    console.warn(json?.data?.success?.cards[0]?.favourite?.cards);
    setRestaurants(json?.data?.success?.cards[0]?.favourite?.cards);
  }
  //Returning shimmer Component before the data is fetched
  return restaturants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="searchDiv">
        <input
          type="text"
          value={searchText}
          placeholder="Search Restaurant"
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <button
          className="searchButton"
          onClick={() => {
            //Need to filter the data
            const data = filterData(searchText, restaturants);
            //Update the data
            setRestaurants(data);
            console.log(data + "data ");
          }}
        >
          Search
        </button>
      </div>
      <div className="RestaurantCards">
        {restaturants.map((restaurant) => {
          return (
            <RestaurantCards {...restaurant?.data} key={restaurant.data?.id} />
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
