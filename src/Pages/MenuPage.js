import React, { useEffect } from "react";
import NavBar from "../Components/NavBar";
import Categories from "../Components/Categories";
import Items from "../Components/Items";
import { useLocation, useParams } from "react-router-dom";
import Heading from "../Components/Heading";
import useFetch from "../hooks/useFetch";
import Loader from "../Components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { getMeals } from "../Features/MealsSlice";

const MenuPage = () => {
  const location = useLocation();
  const { loading, data } = useFetch("/categories");

  useEffect(() => {
    dispatch(getMeals(1));
  }, []);
  const dispatch = useDispatch();

  const meals = useSelector((state) => state.meals);

  return (
    <div
      className="w-full"
      style={{
        minHeight: "100vh",
      }}
    >
      {location.pathname === "/order-from-menu" && (
        <Heading title={"Order Meals"} />
      )}
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-[#232323] h-full flex justify-between">
          <div className="xxs:w-[80%] xs:w-[30%] md:w-[20%] h-[100vh] overflow-y-scroll scrollbar-hide border-r border-[#FFDD83]">
            <Categories arr={data?.data} />
          </div>
          {meals.loading ? (
            <Loader />
          ) : (
            <div className="xs:w-[70%] md:w-[80%] h-[100vh] overflow-y-scroll scrollbar-hide">
              {meals?.meals?.data?.length > 0 && (
                <Items arr={meals.meals.data[0].relationship.meals} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuPage;
