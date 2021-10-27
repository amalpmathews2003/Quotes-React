//import './App.css';
import React, { Component, useEffect, useState } from 'react';
import { auth, signInWithGoogle, logout, addQuote2, getUser } from './components/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Quotes } from './components/quotes';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { AdminPage } from './components/admin';

function App() {
  const [user] = useAuthState(auth)
  const [quote, setQuote] = useState("")

  function onInputChange(e) {
    setQuote(e.target.value)
  }
  function onButtonClick(e) {
    if(user)
    {
      addQuote2(quote, user.uid, user.email, user.displayName);
      console.log('quote added for staging')
    }
    
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">

        <br />
        <br />
        
        <Switch>
          <Route exact path="/">
          <Link to="/admin"><button>Admin</button></Link>
        <br />
        <div className="input-box">
          <label>Input</label>
          <input type="text" onChange={onInputChange}></input>
          <button onClick={onButtonClick}>Submit</button>
        </div>
        <br /><br /><br />
        {user ? (
          <>
            <label>{user.email}</label><br />
            <label>{user.displayName}</label><br />
            <label>{user.uid}</label><br />
            <img src={user.photoURL} alt="user" /><br />
            <button onClick={logout}>Logout</button>

          </>
        ) :
          (<button onClick={signInWithGoogle}>Login with google</button>)}

        <br />
        <Quotes />
          </Route>
          <Route exact path="/admin">
            <AdminPage user={user}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
