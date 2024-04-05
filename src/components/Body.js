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
  const [locationError, setLocationError] = useState(null);
  const [latitude, setLatitude] = useState(18.5679146);
  const [longitude, setLongitude] = useState(73.91434319999999);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [dataArray, setDataArray] = useState([]);
  const [dataArray2, setDataArray2] = useState([]);
  const [dataArray3, setDataArray3] = useState([]);

  useEffect(() => {
    console.log("rendered use effect");
    fetchLocationAndRestaurants();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      //Conditional rendered data for large screens and smaller screens
      renderData();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [screenWidth]);

  useEffect(() => {
    renderData();
  }, [dataArray, dataArray2, dataArray3]);

  //get geoLocation
  const fetchLocationAndRestaurants = () => {
    // Using navigator.geolocation to get user's current position
    if (navigator.geolocation) {
      console.log("+++", navigator);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let { latitude, longitude } = position.coords;
          console.warn("Lat Long", latitude, longitude);
          setLatitude(latitude);
          longitude = `${longitude}9999999`;
          setLongitude(Number(longitude));
          console.log("longitude", longitude);
          getRestaurants(latitude, longitude);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationError(
            "Please enable location access to view nearby restaurants."
          );
          getRestaurants(latitude, longitude);
        }
      );
    } else {
      getRestaurants(latitude, longitude);
      console.error("Geolocation is not supported by this browser.");
      setLocationError("Geolocation is not supported by your browser.");
    }
  };

  //API call to swiggy.com/Swiggy's API
  const getRestaurants = async (latitude, longitude) => {
    console.log("called get restaurant");
    try {
      let data = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );

      // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.5362084&lng=73.8939748&page_type=DESKTOP_WEB_LISTING"
      // "https://www.swiggy.com/dapi/homepage/getCards?lat=18.5362084&lng=73.8939748"
      let response = await data.json();

      console.warn("response", response.data.cards);

      //Swiggy Night API data
      setDataArray(
        response.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      //Swiggy Daylight API Data
      setDataArray2(
        response.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      //Fallback for large Screens
      setDataArray3(
        response.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );

      // setFilteredRestaurant(json?.data?.success?.cards[0]?.favourite?.cards);
      // setAllRestaurants(json?.data?.success?.cards[0]?.favourite?.cards);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    }
  };

  const renderData = () => {
    if (dataArray3) {
      setFilteredRestaurant(dataArray3);
      setAllRestaurants(dataArray3);
    } else if (dataArray) {
      setFilteredRestaurant(dataArray);
      setAllRestaurants(dataArray);
    } else if (dataArray2) {
      setFilteredRestaurant(dataArray2);
      setAllRestaurants(dataArray2);
    }

    console.log("dataArray", dataArray);
    console.log("dataArray2", dataArray2);
    console.log("dataArray3", dataArray3);
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
      <div className="flex justify-center">
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
          className="bg-orange-600 text-white px-5 py-1 items-center rounded-lg font-medium text-lg"
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
      <div className="flex flex-wrap justify-center mb-16">
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
