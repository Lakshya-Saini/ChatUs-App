import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import PrivateRoute from "./components/private-route/private-route";
import Main from "./components/layouts/main";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Verify from "./components/auth/verify";
import Chat from "./components/chat/chat";
import AddFriend from "./components/features/add-friend/add-friend";
import AddGroup from "./components/features/add-group/add-group";
import Profile from "./components/features/profile/profile";
import AllNotifications from "./components/features/notifications/all-notifications";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

if (sessionStorage.getItem("jwtToken")) {
  const token = sessionStorage.getItem("jwtToken");
  setAuthToken(token);

  try {
    var decoded = jwt_decode(token, { header: true });
    store.dispatch(setCurrentUser(token));
  } catch (err) {
    console.log(err);
  }

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <ToastContainer
            position="bottom-center"
            autoClose={2000}
            hideProgressBar
            newestOnTop
            closeOnClick
            transition={Slide}
          />
          <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <PrivateRoute
              exact
              path="/verify"
              component={Verify}
            ></PrivateRoute>
            <Main>
              <PrivateRoute exact path="/chat" component={Chat}></PrivateRoute>
              <PrivateRoute
                exact
                path="/add-friend"
                component={AddFriend}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/add-group"
                component={AddGroup}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/profile"
                component={Profile}
              ></PrivateRoute>
              <PrivateRoute
                exact
                path="/all-notifications"
                component={AllNotifications}
              ></PrivateRoute>
            </Main>
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
