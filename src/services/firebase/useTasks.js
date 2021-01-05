
function useTasks(fstore){
    
    const ref = fstore().collection('tasks');
    const createTask = (task) => ref.add(task);
    
    return {createTask};
}

export default useTasks;