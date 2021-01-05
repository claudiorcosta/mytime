import React from "react";
import {useHistory } from "react-router-dom";
import AddTaskForm from "../Components/AddTaskForm";

const AddTask = props => {

    const {user,createTask} = props;
    const history = useHistory();
    
    const handleSubmit = async (task) => {
        const addt = {
            ...task, 
            ...{
              userId: user.uid,
                userEmail: user.email,
                userName: user.displayName,
                status: "Unfinished"
              }
        }
        await createTask (addt);
        history.push('/');
        console.log(addt);
    }




return (
    <>
      <AddTaskForm onSubmit={handleSubmit}  />
    </>
  );
};

AddTask.propTypes = {};

export default AddTask;