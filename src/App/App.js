import React, { useEffect } from "react";

import InvoiceLayout from "../Layout/Component/InvoiceLayout";
import AdminLayout from "../Layout/Component/AdminLayout";
import AuthLayout from "../Layout/Component/AuthLayout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { firebase } from "FirebaseAuth/Firebase";
import PreClientComponents from "../Views/Client/component/PreClientComponents";
import AddEntry from "../Views/ClientEntry/component/AddEntry";
import EditEntry from "Views/ClientEntry/component/EditEntry";
import PreSheetComponents from "../Views/Sheet/component/PreSheetComponent";
import AddEntryBySheet from "Views/Sheet/component/AddEntryBySheet";
import EditEntrySheet from "Views/Sheet/component/EditEntry";
import ErrorPage from "Views/Error/component/ErrorPage";

// import Loader from "global/Loader/Loader";

// const initialState = false;

export default function App() {
  const [uid, setUid] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [stateChanged, setStateChange] = React.useState(false);
  const [darkMode] = React.useState(
    window.localStorage.getItem("mode")
      ? window.localStorage.getItem("mode")
      : "false"
  );

  useEffect(function () {
    function lol() {
      firebase.isInitialized((user) => {
        if (user) {
          setUid(user.uid);
          setEmail(user.email);
          setStateChange(true);
        } else {
          setStateChange(false);
        }
      });
    }
    lol();
  }, []);

  const onSuccessfulStateChange = () => {
    return (
      <>
        <Route
          path="/admin"
          render={(props) => (
            <AdminLayout {...props} {...{ email: email, uid: uid }} />
          )}
        />
        <Route
          path="/client/:id"
          exact
          render={(props) => (
            <PreClientComponents
              {...props}
              {...{ uid: uid, darkModeFlag: darkMode }}
            />
          )}
        />
        <Route
          path="/sheet/:id"
          exact
          render={(props) => (
            <PreSheetComponents
              {...props}
              {...{ uid: uid, darkModeFlag: darkMode }}
            />
          )}
        />
        <Route
          exact
          path="/error"
          render={(props) => <ErrorPage {...props} />}
        />
        <Route
          exact
          path="/client/:uid/:id/entry/new"
          render={(props) => <AddEntry {...props} />}
        />
        <Route
          exact
          path="/sheet/:id/entry/new/:date"
          render={(props) => <AddEntryBySheet {...props} />}
        />
        <Route
          exact
          path="/client/:uid/:id/edit"
          render={(props) => <EditEntry {...props} />}
        />
        <Route
          exact
          path="/sheet/:uid/:id/edit"
          render={(props) => <EditEntrySheet {...props} />}
        />
        <Route
          exact
          path="/invoice"
          render={(props) => <InvoiceLayout {...props} />}
        />
      </>
    );
  };

  const onFailStateChange = () => {
    return <Route path="/auth" render={(props) => <AuthLayout {...props} />} />;
  };

  return (
    <BrowserRouter>
      <Switch>
        {stateChanged === false ? (
          onFailStateChange()
        ) : (
          <>
            {onSuccessfulStateChange()}
            <Route
              exact
              path="/"
              render={() => <Redirect to="/admin/index" />}
            />
            <Route
              exact
              path="/admin"
              render={() => <Redirect to="/admin/index" />}
            />
            <Route
              exact
              path="/client"
              render={() => <Redirect to="/admin/index" />}
            />
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
