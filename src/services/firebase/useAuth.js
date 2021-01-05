import { useState} from "react";

    const useAuth =(fbAuth) => {

   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [user, setUser] = useState({});
   const createEmailUser = (email, password) => fbAuth().createUserWithEmailAndPassword(email, password);
   const signInEmailUser = (email, password) => fbAuth().signInWithEmailAndPassword(email, password);
   const signOut =() => fbAuth().signOut();
   const googleProvider = new fbAuth.GoogleAuthProvider();
   const facebookProvider = new fbAuth.FacebookAuthProvider();
  
  
   fbAuth().onAuthStateChanged(user=> {
       if(user){
           setIsAuthenticated(true);
           setUser(user);
           return
       }
       setIsAuthenticated(false);
   });

   const signInWithProvider = (provider) => {
       switch (provider){
           case "google":
                fbAuth().signInWithRedirect(googleProvider);
                break;
            case "facebook":
                fbAuth().signInWithRedirect(facebookProvider);
                break;
            
                default:
                    throw new Error("unsupported provider")
       }
   }
   return {isAuthenticated, createEmailUser, signInEmailUser,user, signOut, signInWithProvider};
   
    }

export default useAuth;