import React, { useState, useEffect } from "react";
import GlobalStyles from "./config/GlobalStyles";
import Header from "./Components/Header";
import useAuth from "./services/firebase/useAuth";
import useTasks from "./services/firebase/useTasks";
import firebase from "firebase/app";
import 'firebase/auth'; 
import 'firebase/firestore';
import firebaseConfig from "./config/firebase";  

import { Switch, Route, useLocation, Redirect, useHistory } from "react-router-dom";

import Login from "./Views/Login";

import MainMenu from "./Views/MainMenu";
import MyTasks from "./Views/MyTasks";
import MyMind from "./Views/MyMind";
import TasksDone from "./Views/TasksDone";
import AddTask from "./Views/AddTask";


function Protected({ authenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function App() {

  const location = useLocation();



  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);

  }

  const { isAuthenticated, createEmailUser, user, signOut, signInWithEmail, signInWithProvider } = useAuth(firebase.auth);
  const {createTask} = useTasks(firebase.firestore);

  const history = useHistory();

  const handleClick = e => {
    setMenuOpen(!menuOpen);
  };


  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
      return;
    }
    return;
  }, [isAuthenticated])

  return (
    <div>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header onClick={handleClick} signOut={signOut} user={user} />
      )}

      <GlobalStyles />
      <div>
        <Switch>
        <Protected authenticated={isAuthenticated} exact path="/">
            <MainMenu user={user} />
          </Protected>
          <Route path="/login">
            <Login signInWithEmail={signInWithEmail} signInWithProvider={signInWithProvider} />
          </Route>
          <Protected authenticated={isAuthenticated} path="/mytasks">
            <MyTasks  user={user}/>
          </Protected>
          <Protected authenticated={isAuthenticated} path="/mymind">
            <MyMind />
          </Protected>
          <Protected authenticated={isAuthenticated} path="/tasksdone">
            <TasksDone user={user} />
          </Protected>
          <Protected authenticated={isAuthenticated} path="/addtask">
            <AddTask createTask = {createTask} user={user}/>
          </Protected>
        </Switch>
      </div>
    </div>
  );

}

export default App;
