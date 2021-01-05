import React, { useState } from "react";
import {useHistory } from "react-router-dom";
import RegisterForm from "../Components/RegisterForm";


function Register(props) {

    const { createEmailUser, signInWithProvider, createUser} = props;
    const history = useHistory();

  const handleSubmit = async (data) => {
    try {
      const user = await createEmailUser(data.email, data.password);
      console.log(user);
    } catch (error) {
      console.log('could not join user', error)
    }

    const addu = {
      ...user
  }
  }

 

  return (
    
    <RegisterForm onSubmit={handleSubmit} 
    onEmailSubmit ={handleSubmit}
    onProviderSignIn = {(provider) => signInWithProvider(provider)}
        buttonText="REGISTER"
    >
    </RegisterForm>

  );
}



export default Register;