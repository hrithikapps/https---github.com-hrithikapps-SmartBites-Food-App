import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Body from "./src/components/Body";
import Header from "./src/components/Header";
import Footer from "./src/components/Footer";
import Cart from "./src/components/Cart";
import Error from "./src/components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import RestaurantMenu from "./src/components/RestaurantMenu";
import { Shimmer } from "./src/components/Shimmer";
import { Provider } from "react-redux";
import store from "./src/utils/store";
// import Profile from "./src/components/Profile";
// import About from "./src/components/About";
// import ContactUs from "./src/components/ContactUs";
//Lazy Loading 
//Chunking 
//Dynamic Import 
//on demand Loading / Code Splitting
const Profile = lazy(() => import("./src/components/Profile"));
const ContactUs = lazy(() => import("./src/components/ContactUs"));
const About = lazy(() => import("./src/components/About"));

const AppLayout = () => {
  return (
    <Provider store={store}>
      <Header />
      {/* All the children will go into the outlet according to the routes */}
      <Outlet />
      <Footer />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<Shimmer />}>
            <About/>
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: (
              <Suspense fallback={<Shimmer />}>
                <Profile />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "/contactUs",
        element: (
          <Suspense fallback={<Shimmer/>}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
