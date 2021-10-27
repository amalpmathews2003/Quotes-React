import { initializeApp } from "firebase/app";
import { getFirestore, collection,getDocs,addDoc,setDoc,doc,query,limit,where} from 'firebase/firestore';
import { getAuth,GoogleAuthProvider , signInWithPopup} from "firebase/auth";
import { Quotes } from "./quotes";

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
const userCollection = collection(db, 'User');
//console.log(userCollection)
    
//Authentication
const auth = getAuth();
const signInWithGoogle=async ()=>{
      console.log('aaa' )
      const provider = new GoogleAuthProvider();
      
      signInWithPopup(auth, provider)
      
}

const getUser =async(uid)=>{
      const q=query(collection(db,'User'),where('Uid',"==",uid))
      const querySnaphot=await getDocs(q);
      let user_data
      querySnaphot.forEach(doc=>{
            user_data=doc.data()
      })
      console.log(user_data)
      return user_data
}
const isAdmin=async (uid)=>{
      const q=query(collection(db,'Admins'),where('uid','==',uid))
      const querySnaphot=await getDocs(q);
      let user_data
      querySnaphot.forEach(doc=>{
            user_data=doc.data()
      })
      return user_data
}
//geting quotes

async function getQuotes(){
      const q=query(userCollection,limit(20))
      const quotes=await getDocs(q)
 
      const quoteList=quotes.docs.map(doc=>doc.data())
      
      return quoteList
}
async function getStagingQuotes(){
      const q=query(collection(db,'Stageing'))
      const quotes=await getDocs(q)
 
      const quoteList=quotes.docs.map(doc=>doc.data())
     // console.log(quoteList)
      return quoteList
}

// getQuotes(userCollection)
// .then(result=>{
//       quotes=result
//       return quotes
// })
// .then(quotes=>
//       console.log(quotes)
// )


//     adding quotes
// async function addQuote(name,email,quote,validated=false,admin=false){
//       const Quote =await addDoc(userCollection,{
//             Name:name,
//             Email:email,
//             Quote:quote,
//             Validated:validated,
//             Admin:admin
//       })
//       console.log(Quote.id)
//       return Quote.id
// }
//addQuote("amaltest",'amal@gmail,com','test1')
async function addQuote2(quote,uid,email,name)
{     
      console.log(quote,uid,email,name)
      const Quote =await setDoc(doc(db,"Stageing",uid),{
            Email:email,
            Name:name,
            Quote:quote,
            Uid:uid
      })
}
//addQuote(userCollection,"Test","test@gmail.com","test's quote")

const logout =()=>{
      auth.signOut()
}
//addQuote2()
export {signInWithGoogle,auth,logout,getQuotes,addQuote2,getUser,getStagingQuotes,isAdmin}

