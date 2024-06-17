import React, { lazy, useEffect } from "react";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkToken } from "./Slice/AuthSlice";
import Loading from "./Loading/Loading";
import { toast } from "react-toastify";

const Wrapper = lazy(() => import("./Pages/Layout/Wrapper/Wrapper"));
const DashBoard = lazy(() => import("./Pages/CMS/UserDashBoard/DashBoard"));
const Products = lazy(() => import("./Pages/CMS/Products/Products"));
const Login = lazy(() => import("./Pages/Auth/Login/Login"));
const Registration = lazy(() =>
  import("./Pages/Auth/Registration/Registration")
);
const Create = lazy(() => import("./Pages/CMS/Create/Create"));
const SingleProduct = lazy(() =>
  import("./Pages/CMS/SingleProduct/SingleProduct")
);
const Update = lazy(() => import("./Pages/CMS/Update/Update"));

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  function PrivateRoute({ children }) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <>
        <Navigate to="/login" />
        {toast.error("Please Login First either you cannot access")}
      </>
    );
  }

  const publicRouteName = [
    {
      path: "/login",
      Component: <Login />,
    },
    {
      path: "/regis",
      Component: <Registration />,
    },
  ];

  const privateRouteName = [
    {
      path: "/create",
      Component: <Create />,
    },
    {
      path: "/products",
      Component: <Products />,
    },
    {
      path: "/details/:id",
      Component: <SingleProduct />,
    },
    {
      path: "/update/:id",
      Component: <Update />,
    },
    {
      path: "/",
      Component: <DashBoard />,
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Wrapper>
          <Routes>
            {publicRouteName.map((route, index) => (
              <Route
                key={index}
                exact
                path={route.path}
                element={route.Component}
              />
            ))}
            {privateRouteName.map((route, index) => (
              <Route
                key={index}
                exact
                path={route.path}
                element={<PrivateRoute>{route.Component}</PrivateRoute>}
              />
            ))}
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </Suspense>
  );
}
