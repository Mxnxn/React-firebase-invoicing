import AddClient from "./Views/Client/component/AddClient";
import AddMaterial from "./Views/Material/component/AddMaterial";
import UserProfileIndex from "Views/UserProfile/component/UserProfileIndex";

var more_routes = [
  {
    path: "/addclients",
    name: "Add Clients",
    icon: "fa fa-plus-square text-danger",
    component: AddClient,
    layout: "/admin",
  },

  {
    path: "/addmaterials",
    name: "Add Material",
    icon: "fa fa-plus-square text-info",
    component: AddMaterial,
    layout: "/admin",
  },
  {
    path: "/userprofile",
    name: "User Profile",
    icon: "fa fa-cog text-success",
    component: UserProfileIndex,
    layout: "/admin",
  },
];

export default more_routes;
