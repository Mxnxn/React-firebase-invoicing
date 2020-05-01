import Login from "./Views/Auth/Login/component/Login";
import Register from "./Views/Auth/Register/component/Register";
var auth_routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-danger",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-danger",
    component: Register,
    layout: "/auth"
  }
];

export default auth_routes;
