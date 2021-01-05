import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import GlobalStyles from "../config/GlobalStyles";

function MyTasksForm(props) {
  const [name] = useState();

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
    width: 158px;
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
  

  return (
    
    <React.Fragment>
         <h1>myTime</h1>
         <GlobalStyles/>

                    <p>
                    <h3>  Name:  </h3><StyledButton > Finished </StyledButton>
                    </p>

                    <Route render={({ history}) => (
     <StyledButton onClick={() => { history.push('/tasksdone')}} > Finished Tasks</StyledButton>
  )} />
  
  <Route render={({ history}) => (
      <p>
     <StyledButton onClick={() => { history.push('/addtask')}} > Add Task </StyledButton>
     </p>
  )} />      
   <Route render={({ history}) => (
      <p>
     <StyledButton onClick={() => { history.goBack()}}> Go Back </StyledButton>
     </p>
  )} />  
            

</React.Fragment>
  );
}

export default MyTasksForm;