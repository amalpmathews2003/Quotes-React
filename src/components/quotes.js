import { useEffect, useState } from 'react'
import {getQuotes} from './firebase'
function Quotes(){
      const [quotes,setQuotes]=useState([])
      useEffect(()=>{
            getQuotes()
            .then(res=>{
                  setQuotes(res)
                  //console.log('a')
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
                        {quote.Admin?<li>True</li>:<li>False</li>}
                        {quote.Validated?<li>True</li>:<li>False</li>}
                        </ul>
                  </li>))}
                  </ul>
            </div>
      )
}

export {Quotes}