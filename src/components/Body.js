import { RestaurantCards } from "../components/RestaurantCards";
// import RestaurantData from "./constants";
import { useState, useEffect } from "react";
import { Shimmer } from "./Shimmer";
import { Link } from "react-router-dom";

const filterData = (searchText, allRestaturants) => {
  console.log(allRestaturants);
  const data = allRestaturants.filter((restaurant) => {
    const resName = restaurant?.data?.name
      ?.toLowerCase()
      .includes(searchText.toLowerCase());
    return resName;
  });
  // console.log(data + " inside filter data");
  return data;
};

// function filterData(searchText, restaurant) {
//   const filterData = restaurant.filter((restaurants) =>
//     restaurants?.data.name?.toLowerCase().includes(searchText.toLowerCase())
//   );
//   return filterData;
// }

const Body = () => {
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [allRestaturants, setAllRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");
  // console.log("Consoling");

  useEffect(() => {
    getRestaurants();
  }, []);

  //API call to swiggy.com/Swiggy's API

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/homepage/getCards?lat=18.5362084&lng=73.8939748"
    );
    const json = await data.json();
    // console.warn(json?.data?.success?.cards[0]?.favourite?.cards);
    setFilteredRestaurant(json?.data?.success?.cards[0]?.favourite?.cards);
    setAllRestaurants(json?.data?.success?.cards[0]?.favourite?.cards);
  }

  //Not rendering the component (Early Return)
  if (!allRestaturants) {
    return null;
  }

  //Returning shimmer Component before the data is fetched
  return allRestaturants.length === 0 ? (
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
            let newData = filterData(searchText, allRestaturants);
            //Update the data
            setFilteredRestaurant(newData);
          }}
        >
          Search
        </button>
      </div>
      <div className="RestaurantCards">
        {filteredRestaurant.map((restaurant) => {
          return (
            <Link to={"./restaurant/"+restaurant.data?.id } key={restaurant?.data?.id}>
            <RestaurantCards {...restaurant?.data}  />
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
