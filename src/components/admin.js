import { useEffect, useState } from "react"
import {auth} from './firebase'
import {isAdmin} from "./firebase"
import {StagingQuotes} from './stageQuotes'
import { useAuthState } from 'react-firebase-hooks/auth'
import  { Redirect } from 'react-router-dom'

function AdminPage({user}){
      const [uid,setUid]=useState("")
      
      const [Admin,setisAdmin]=useState(false)
      const [loading,setLoading]=useState(false)
      useEffect(()=>{
            setLoading(true)
            if(user)
            {
                  isAdmin(user.uid)
                  .then(res=>{
                        setUid(user.uid) 
                        try{
                              setisAdmin(res.isAdmin)
                        }
                        catch(e)
                        {
                              console.log(e)
                        }
                        setLoading(false)
                  })
            
      }

      },[user])
      function onInputChange(e) {
            setUid(e.target.value)
          }
      return(
            <div>

                  {/* <input type="text" value={uid} onChange={onInputChange}/>
                 
                  <br/>
                  {uid}<br/> */}
                  {user ? (
          <>
            <label>{user.email}</label><br />
            <label>{user.displayName}</label><br />
            <label>{user.uid}</label><br />
            <img src={user.photoURL} alt="user" /><br />
            

          </>
        ) :
          (<button>Login with google</button>)}
                  <br/> <br/> <br/> <br/> <br/> <br/>
                  {loading?<>Loading</>:<>{Admin?
                  <>Admin
                  <StagingQuotes/>
                  </>
                  :<>Not Admin
                  You dont have acces
                  </>}</>}
                  <br/>
                  
            </div>
      )
}

export {AdminPage}