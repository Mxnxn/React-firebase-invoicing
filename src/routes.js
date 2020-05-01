import Index from "./Views/Index";
import RandomInvoice from "Views/Invoice/Component/RandomInvoice";
// import Client from "./Views/Client/component/Client";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "fa fa-home text-danger",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/saved/invoice",
    name: "Invoices",
    icon: "fa fa-file text-info",
    component: RandomInvoice,
    layout: "/admin",
  },
];

export default routes;
