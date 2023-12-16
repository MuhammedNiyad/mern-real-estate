import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const currentUser = useSelector((state) => state.user);

    // console.log("currentUser:", currentUser);
    return currentUser? <Outlet /> : <Navigate to='/sign-in' />;
}


/* "Outlet" -->  component is used to define where child 
routes should be rendered within a parent route component. 
It is particularly useful when you have nested routes and
want to specify where the content of the child routes should be displayed. */

/* "Navigate" -->  component is used for imperative navigation. 
It provides a way to programmatically navigate to a different 
location in your application. You can use it to navigate in 
response to user actions, button clicks, form submissions, 
or any other logic that requires moving to a different route. */