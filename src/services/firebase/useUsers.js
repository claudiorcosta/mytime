function useUsers(fstore){
    const ref = fstore().collection('users');
    const createUser = (user) => ref.add(user);
    const readUsers = () => ref.get();
 

    return {createUser, readUsers}
}

export default useUsers;