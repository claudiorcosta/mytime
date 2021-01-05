import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import GlobalStyles from "../config/GlobalStyles";

function TasksDone(props) {

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
  width: 120px;
  height: 47px;
      `;
  const StyledLink = styled(Link)`
      color: red;
  font-family: helvetica;
  text-decoration: none;
      `;
  const StyledErrorLabel = styled.label`
      font-family: Arial, sans-serif;
      color:red;
      font-weight: bolder;
      margin: 1% 0 4% 0;
  `;
  const StyledSocialIconArea = styled.div`
  display: flex;
  justify-content: center;   
  `;
  const StyledLabel = styled.label`
  font-family: Quicksand;
  font-size:25px;
  font-weight: bolder;
  `;
  const StyledForm = styled.form`
  display: grid;
  justify-content: center;
  text-align: left;
  `;
  const StyledInput = styled.input`
  width:200px;
  `;

  const {user } = props;
  const [allTasks, setAllTasks] = useState([]);



  useEffect(() => {
    const getAllTasks = async () => {
      const db = firebase.firestore()
      const readTasks = await db.collection('tasks').where('status', '==', 'Finished').where('userEmail', '==', user.email).get();
      let tasks = [];
      readTasks.forEach(c => tasks.push({ ...c.data(), ...{ id: c.id } }));
        setAllTasks(tasks);
      }
    getAllTasks();
  }, []);

  return (
    <React.Fragment>
      <h1>myTime</h1>
      <GlobalStyles />
      <StyledForm >
        <table>
        <th><StyledLabel>Name</StyledLabel></th>
        <th><StyledLabel>Date to Finish</StyledLabel></th>
        <th><StyledLabel>Type</StyledLabel></th>
        <th><StyledLabel>Description</StyledLabel></th>
        <th><StyledLabel>Status</StyledLabel></th>
          {allTasks.map(c =>
            <tr >
              <td><StyledLabel><StyledInput type="text" name="name" value={(c.name)} /></StyledLabel></td>
              <td><StyledLabel><StyledInput type="text" name="enddate" value={(c.endDate)}/></StyledLabel></td>
              <td><StyledLabel><StyledInput type="text" name="type" value={(c.type)}/></StyledLabel></td>
              <td><StyledLabel><StyledInput type="text" name="description" value={(c.description)}/></StyledLabel></td>
              <td><StyledLabel><StyledInput type="text" name="status" value={(c.status)}/></StyledLabel></td>
            </tr>
          )}
          <tr>
            <td></td>
            <td><Route render={({ history }) => (
          <StyledButton onClick={() => { history.push('/mytasks') }} > Unfinished Tasks</StyledButton>
        )} /></td>
            <td><Route render={({ history }) => (
          <p>
            <StyledButton onClick={() => { history.goBack() }}> Go Back </StyledButton>
          </p>
        )} /></td>
          </tr>
        </table>

      </StyledForm>
    </React.Fragment>

  );
};
export default TasksDone;