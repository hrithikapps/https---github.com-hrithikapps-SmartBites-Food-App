import { RestaurantCards } from "../components/RestaurantCards";
import RestaurantData from "./constants";
import { useState } from "react";

// const filterData = (searchText, restaturants) => {
//   const Data = restaturants.filter(
//     (restaurant) => restaurant.info.name.includes(searchText)
//     // console.warn(restaurant.info.name);
//   );
//   console.warn(Data + "Filtered");
//   return Data;
// };

function filterData(searchText, restaturants) {
  return restaturants.filter((res) => {
    res.info.name.includes(searchText);
    console.warn(searchText);
    // console.warn(searchText + " Search Text");
  });
  //   console.warn(newData);
  //   return newData;
}

const Body = () => {
  const [restaturants, setRestaurants] = useState(RestaurantData);
  const [searchText, setSearchText] = useState("");
  return (
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
          }}
        >
          Search
        </button>
      </div>
      <div className="RestaurantCards">
        {restaturants.map((restaurant) => {
          return (
            <RestaurantCards {...restaurant.info} key={restaurant.info.id} />
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
