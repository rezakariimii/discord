import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { auth } from "./components/authentication/firebase";
import Login from "./components/authentication/Login";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import { login, logout, selectUser } from "./features/user/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            email: authUser.email,
            displayName: authUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <Fragment>
          <Sidebar />
          <Chat />
        </Fragment>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
