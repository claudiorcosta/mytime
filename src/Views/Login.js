import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Form from "../Components/LoginForm";



const StyledLink = styled(Link)`
  text-align: center;
`;

const Login = (props) => {

  const {signInEmailUser, signInWithProvider} = props;
  const [serverErrorMessage, setServerErrorMessage] = useState('')

  const handleEmailSubmit = async data => {
    try {
        const {email, password} = data;
        await signInEmailUser(email,password);
    } catch(e) {
       setServerErrorMessage(e.message);
    }
  }


    return (
              
                <Form
                onEmailSubmit ={handleEmailSubmit}
                serverErrorMessage = {serverErrorMessage}
                onProviderSignIn = {(provider) => signInWithProvider(provider)}
                    buttonText="LOGIN"
                >
                  
                </Form>
           
      
    );
}

Login.propTypes = {
    signInEmailUser: PropTypes.func.isRequired,
    signInWithProvider: PropTypes.func.isRequired
};

export default Login;