import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Route } from "react-router-dom";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import PropTypes from "prop-types";

function MainMenu(props) {
  const StyledButton = styled.button`
    background: #2980B9;
    border-radius:8px;
    display:inline-block;
    cursor:pointer;
    color:#ffffff;
    font-family:Arial;
    font-size:20px;
    font-weight:bold;
    text-decoration:none;
    text-shadow:0px 1px 0px #1f1f1f;
    width: 280px;
    height: 80px;
        `;
  const { user } = props;
  const [tasks, setTasks] = useState([]);
  const db = firebase.firestore();
  const [countUnfinished, setCountUnifinished] = useState(0);
  const [countFinished, setCountFinished] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      db.collection('tasks').where('status', '==', 'Unfinished').where('userEmail', '==', user.email)
        .onSnapshot(snapshot => {
          setCountUnifinished(snapshot.size);
        }
        );
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      db.collection('tasks').where('userEmail', '==', user.email)
        .onSnapshot(snapshot => {
          setCountFinished(snapshot.size);
        }
        );
    };
    fetchData();
  }, []);


  return (

    <React.Fragment>
      <h1>myTime</h1>
      <Route render={({ history }) => (
        <StyledButton onClick={() => { history.push('/mytasks') }} > MyTasks({countUnfinished}/{countFinished})</StyledButton>
      )} />
      <Route render={({ history }) => (
        <p>
          <StyledButton onClick={() => { history.push('/mymind') }} > MyMind</StyledButton>
        </p>
      )} />
    </React.Fragment>
  );
}
export default MainMenu;