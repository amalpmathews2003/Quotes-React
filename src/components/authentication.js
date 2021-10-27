import { getAuth,GoogleAuthProvider , signInWithPopup } from "firebase/auth";
const auth = getAuth();
const signInWithGoogle=async ()=>{
      
      const provider = new GoogleAuthProvider();
      
      signInWithPopup(auth, provider)
      
}
const logout =()=>{
      auth.signOut()
}
export {signInWithGoogle,logout,auth}