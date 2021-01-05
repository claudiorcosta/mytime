import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import styled from "styled-components";
import { Route } from "react-router-dom";

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
const StyledLabel = styled.label`
font-family: Quicksand;
font-size:25px;
font-weight: bolder;
`;
const StyledInput = styled.input`
width:300px;
`;
const StyledTextArea = styled.textarea`
width:300px;
font-family: Quicksand;
`;
const StyleTable = styled.table`
width: 35%;
    margin-left: auto;
    margin-right: auto;

`;

function MyTasks(props) {
  const { user } = props;
  const [tasks, setTasks] = useState([]);
  const db = firebase.firestore();
  const [detailsShown, setDetailShown] = useState([]);
  const [countUnfinished, setCountUnifinished] = useState(0);
  const [countFinished, setCountFinished] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      db.collection('tasks').where('status', '==', 'Unfinished').where('userEmail', '==', user.email)
        .onSnapshot(snapshot => {
          setCountUnifinished(snapshot.size),
            setTasks(
              snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()

              }))
            )
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


  const onDelete = (id) => {
    db.collection('tasks').doc(id).delete()
  }

  const onUpdate = (id) => {
    const docRef = db.collection('tasks').doc(id);
    docRef.update({
      status: 'Finished',
    }).then(() => {
      console.log('Task finished with success!');

    }).catch((error) => {
      console.log('Error finishing task:', error);
    })
  }

  const toggleShown = taskName => {
    const shownState = detailsShown.slice();
    const index = shownState.indexOf(taskName);
    if (index >= 0) {
      shownState.splice(index, 1);
      setDetailShown(shownState);
    } else {
      shownState.push(taskName);
      setDetailShown(shownState);
    }
  };

  return (
    <React.Fragment>
      <h1>myTime</h1>
      <div >
        <h2>You have to complete {((countUnfinished/countFinished)*100).toFixed(2)}% of your tasks</h2>
      </div>
      <StyleTable >
        {tasks.map(c =>
          <>
            <tr key={c.id} border="4px">
              <td border="4px"><StyledLabel>{(c.name)}</StyledLabel></td>
              <td><StyledButton onClick={() => toggleShown(c.id)} > Details </StyledButton></td>
            </tr>
            {detailsShown.includes(c.id) && (
              <>
                <tr>
                  <td><StyledLabel>Date to Finish</StyledLabel></td>
                  <td ><StyledInput type="text" name="enddate" value={(c.endDate)} /></td>
                </tr>
                <tr>
                  <td ><StyledLabel>Type</StyledLabel></td>
                  <td ><StyledInput type="text" name="type" value={(c.type)} /></td>
                </tr>
                <tr>
                  <td ><StyledLabel>Description</StyledLabel></td>
                  <td ><StyledTextArea type="text" name="description" value={(c.description)} /></td>
                </tr>
                <tr>
                  <td ><StyledLabel>Status</StyledLabel></td>
                  <td ><StyledInput type="text" name="status" value={(c.status)} /></td>
                </tr>
                <tr>
                  <td ><StyledButton onClick={() => onUpdate(c.id)}>Finished</StyledButton></td>
                  <td><StyledButton onClick={() => onDelete(c.id)} >Delete</StyledButton></td>
                </tr>
              </>
            )}
          </>
        )}
      </StyleTable>
      <StyleTable>
        <tr>
          <td><Route render={({ history }) => (
            <StyledButton onClick={() => { history.push('/tasksdone') }} > Finished Tasks</StyledButton>
          )} /></td>
          <td><Route render={({ history }) => (
            <p>
              <StyledButton onClick={() => { history.push('/addtask') }} > Add Task </StyledButton>
            </p>
          )} /></td>
          <td><Route render={({ history }) => (
            <p>
              <StyledButton onClick={() => { history.goBack() }}> Go Back </StyledButton>
            </p>

          )} /></td>
        </tr>
      </StyleTable>
    </React.Fragment>

  );
};


MyTasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  readTasks: PropTypes.object.isRequired
};



export default MyTasks;