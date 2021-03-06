import "regenerator-runtime/runtime";
import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import EventRegistration from "./components/EventRegistration";
import UserRegistration from "./components/UserRegistration";
import { StateContext, ActionContext } from "./hooks";
import Header from "./components/Header";
import Modal from "./components/Modal/Modal";
import EventSingle from "./components/EventSingle/EventSingle";
import DonationRegistration from "./components/DonationRegistration";
import DonationSingle from "./components/DonationSingle";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import DonationHome from "./components/DonationHome";
import EventHome from "./components/EventHome";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const App = ({ contract, currentUser, nearConfig, wallet }) => {
  const { loadNearConfig, setModalConfig, setUserDetails } = React.useContext(
    ActionContext
  );
  useEffect(() => {
    console.log(contract);
    loadNearConfig(contract, currentUser, nearConfig, wallet);
    if (contract && currentUser) {
      console.log(currentUser.accountId);
      contract
        .getUserBySender({ currentUser: currentUser.accountId.toString() })
        .then((user) => {
          console.log(user);
          if (!user.isRegistered) {
            setModalConfig(true, { type: "registration" });
          } else {
            if (localStorage.getItem("userEncCreds") !== null) {
              setModalConfig(true, { type: "user-encryption" });
            }
          }
          setUserDetails(user);
        });
    }
    // setModalConfig(true, { type: "user-encryption" })
  }, [contract, currentUser, nearConfig, wallet]);

  return (
    <div className="App">
      <Router>
        <ReactNotification />
        <Header />
        <Modal />
        <Route path="/" exact render={() => <Home />} />
        <Route path="/events" exact render={() => <EventHome />} />
        <Route path="/donations" exact render={() => <DonationHome />} />
        <Route path="/events/:id" exact render={() => <EventSingle />} />
        <Route path="/donations/:id" exact render={() => <DonationSingle />} />
        <Route
          path="/event-registration"
          exact
          render={() => <EventRegistration />}
        />
        <Route
          path="/events/:id/create-donation"
          exact
          render={() => <DonationRegistration />}
        />
        <Route
          path="/user-registration"
          exact
          render={() => <UserRegistration />}
        />
      </Router>
    </div>
  );
};

export default App;
