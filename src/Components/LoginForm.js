import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

function LoginForm(props) {
    const loginFormSchema = yup.object().shape({
        email: yup.string().email('Email is not valid').required('Please enter an email'),
        password: yup.string().required('Password is required')
    })

    const[displayEmail, setDisplayEmail] = useState(true);
    const { buttonText, onSubmit, onProviderSignIn } = props;
    const { register, handleSubmit, errors } = useForm({resolver: yupResolver(loginFormSchema)});
    const onInternalSubmit = data => onSubmit(data);

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
    width: 135px;
    height: 37px;
    
    
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
    {!displayEmail && <Button onClick={handleClick} text="Email" />}

        { displayEmail && 
           ( <form onSubmit = {handleSubmit(onSubmit)}>
               <h3>Here you will be able to manage all your tasks and find the steps that are known to help people to achieve a healthy mental health</h3>
               <h3>Social Network Login:</h3>
                    <StyledSocialIconArea>
                <SocialIcon network="facebook" onClick={() => onProviderSignIn("facebook")} />
                <SocialIcon network="google" onClick={() => onProviderSignIn("google")} />
            </StyledSocialIconArea>
            </form>)
            
}
</React.Fragment>
  );
}

export default LoginForm;