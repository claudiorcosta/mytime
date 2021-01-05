import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { Route } from "react-router-dom";

const AddTaskForm =props => {


    const addTaskFormSchema = yup.object().shape({
        name: yup.string().required('You must enter a name'),
        endDate: yup.string().required('You must enter a date'),
        type: yup.string().required('You must enter a type'),
        description: yup.string().required('You must enter a description')
    })


    const { register, handleSubmit, errors } = useForm({ resolver: yupResolver(addTaskFormSchema) });
    const { onSubmit } = props;

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

    const StyledLabel = styled.label`
        font-family: Quicksand;
        font-size:25px;
        font-weight: bolder;
    `;

    const StyledErrorLabel = styled.label`
    font-family: Arial, sans-serif;
    color:red;
    font-weight: bolder;
`;

    const StyledTR = styled.tr`
        text-align: left;
    `;
    const StyledSocialIconArea = styled.div`
        display: flex;
        justify-content: center;   
  `;

    const StyledForm = styled.form`
  display: grid;
  justify-content: center;
  text-align: left;
`;

    const onFormSubmit = data => {
        onSubmit({ ...data});
    };
    return (
        <React.Fragment>
            <h1>myTasks</h1>
            <StyledForm onSubmit={handleSubmit(onFormSubmit)}>

                <table>
                    <StyledTR>
                        <td><StyledLabel>Name</StyledLabel></td>
                        <td><input type="text" name="name" ref={register({ required: true })} /> </td>
                    </StyledTR>
                    <tr>
                        <td></td>
                        <td><StyledErrorLabel>{errors.name && errors.name.message}</StyledErrorLabel></td>
                    </tr>
                    <StyledTR>
                        <td><StyledLabel>Date to Finish</StyledLabel></td>
                        <td><input type="date" name="endDate"  ref={register({ required: true })} /></td>
                    </StyledTR>
                    <tr>
                        <td></td>
                        <td><StyledErrorLabel>{errors.endDate && errors.endDate.message}</StyledErrorLabel></td>
                    </tr>
                    <StyledTR>
                        <td><StyledLabel>Type</StyledLabel></td>
                        <td> <input type="text" name="type" ref={register({ required: true })} /> </td>
                    </StyledTR>
                    <tr>
                        <td></td>
                        <td><StyledErrorLabel>{errors.type && errors.type.message}</StyledErrorLabel></td>
                    </tr>
                    <StyledTR>
                        <td><StyledLabel>Description</StyledLabel></td>
                        <td> <textarea type="text" name="description" ref={register({ required: true })} /> </td>
                    </StyledTR>
                    <tr>
                        <td></td>
                        <td><StyledErrorLabel>{errors.description && errors.description.message}</StyledErrorLabel></td>
                    </tr>
      
                        <td> <StyledButton  > Add Task </StyledButton></td>

                        <Route render={({ history }) => (

                            <StyledButton onClick={() => { history.goBack() }} > Go Back </StyledButton>

                        )} />
                    
                </table>

            </StyledForm>
        </React.Fragment>
    );
}

export default AddTaskForm;