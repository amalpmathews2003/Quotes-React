import { useEffect,useState } from "react";
import { getStagingQuotes } from "./firebase";
import {addQuote2User} from './admin-firebase'
function StagingQuotes(){
      const [quotes,setQuotes]=useState([])
      useEffect(()=>{
            getStagingQuotes()
            .then(res=>{
                  setQuotes(res)
            })
      },[])
      return(
            <div>
                  <ul>
                  {quotes.map((quote,index)=> (<li key={index}>A
                        <ul>
                        <li>{quote.Name}</li> 
                        <li>{quote.Quote}</li>
                        <li>{quote.Email}</li>
                        <li>{quote.Uid}</li>
                        <button onClick={()=>addQuote2User(quote.Quote,quote.Uid,quote.Email,quote.Name)}>Confirm</button>
                        </ul>
                  </li>))}
                  </ul>
            </div>
      )
}

export {StagingQuotes}