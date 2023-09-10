import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import MenuPage from "./Pages/MenuPage";
import NavBar from "./Components/NavBar";
import MenuItemDetails from "./Pages/MenuItemDetails";
import NewOrdersPage from "./Pages/NewOrdersPage";
import TableNumberPage from "./Pages/TableNumberPage";
import OrderDetails from "./Pages/OrderDetails";
import Header from "./Components/Header";
import Cart from "./Pages/Cart";
import Tables from "./Pages/Tables";
import { Error } from "./Pages/Error";
import { ErrorBoundary } from "react-error-boundary";
import { Rating } from "react-simple-star-rating";
import NourRating from "./Components/NourRating";

function App() {
  const location = useLocation();
  return (
    <>
      {location.pathname.includes("order") ? <NavBar /> : <Header />}
      <ErrorBoundary
        FallbackComponent={Error}
        onError={() => {
          console.log("Error Hapend");
        }}
      >
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route exact path="/order-from-menu" element={<MenuPage />} />
            <Route
              exact
              path={`/order-item/:id`}
              element={<MenuItemDetails />}
            />
            <Route exact path={`/order-cart`} element={<Cart />} />
            <Route exact path={`/error`} element={<Error />} />

            <Route exact path={`/tables`} element={<Tables />} />

            <Route path="/Orders" Component={NewOrdersPage}></Route>

            <Route path="/add-order" Component={TableNumberPage}></Route>

            <Route path="/menu" Component={MenuPage}></Route>
            <Route
              path="/menuItemDetails/:id"
              element={<MenuItemDetails show={true} />}
            ></Route>

            <Route path="/orderDetails" Component={OrderDetails}></Route>
          </Routes>
        </div>
      </ErrorBoundary>
    </>
  );
}

export default App;
