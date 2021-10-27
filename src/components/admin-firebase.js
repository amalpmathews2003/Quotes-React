import { initializeApp } from "firebase/app";
import { getFirestore,setDoc,doc , deleteDoc } from "firebase/firestore";
const firebaseConfig = {
      apiKey: "AIzaSyC8u-tO86sDJxz1oInHPqgAE_f86WCLuFw",
      authDomain: "lateral-command-256823.firebaseapp.com",
      databaseURL: "https://lateral-command-256823.firebaseio.com",
      projectId: "lateral-command-256823",
      storageBucket: "lateral-command-256823.appspot.com",
      messagingSenderId: "832224831258",
      appId: "1:832224831258:web:48bec8b4a91a27e60e6ea3",
      measurementId: "G-FLBKNZ8GJC"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addQuote2User(quote,uid,email,name)
{     
      console.log(quote,uid,email,name)
      await setDoc(doc(db,"User",uid),{
            Email:email,
            Name:name,
            Quote:quote,
            Uid:uid
      })
      console.log('user added')
      await deleteDoc(doc(db,'Stageing',uid))
      
}

export {addQuote2User}