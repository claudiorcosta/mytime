import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import styled from "styled-components";
import { Route } from "react-router-dom";

function MyMind(props) {

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
        
        const { user } = props;
        const [tasks, setTasks] = useState([]);
        const db = firebase.firestore();
        const [detailsShown, setDetailShown] = useState([]);
      
      
        useEffect(() => {
          const fetchData = async () => {
            db.collection('mymind')
              .onSnapshot(snapshot =>
                setTasks(
                  snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
      
                  }))
                )
              );
          };
          fetchData();
        }, []);

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
    <h1>myMind</h1>
    <StyleTable >
      {tasks.map(c =>
       <>
        <tr  key={c.id} border = "4px">
          <td  border = "4px"><StyledLabel>{(c.id)}</StyledLabel></td>
          <td><StyledButton onClick={() => toggleShown(c.id)} > Details </StyledButton></td>
          </tr>
          {detailsShown.includes(c.id) && (
            <>
          <tr>
          <td><StyledLabel>{(c.step1)}</StyledLabel></td>
            </tr>
          <tr>
          <td><StyledLabel>{(c.step2)}</StyledLabel></td>
          </tr>
          <tr>
          <td><StyledLabel>{(c.step3)}</StyledLabel></td>
          </tr>
          <tr>
           
          </tr>
       </>
        )}
        </>
         )}
         <Route render={({ history}) => (
      <p>
     <StyledButton onClick={() => { history.goBack()}} > Go Back </StyledButton>
     </p>
  )} /> 
      </StyleTable>
  </React.Fragment>
    
   
  );
}

export default MyMind;