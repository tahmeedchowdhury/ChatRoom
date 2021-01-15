import React,{useState} from 'react';
import Post from './Post';
import {Button} from 'antd';
import "../css/Login.css";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [user,setUser] = useState();
  const [isloggedin, setIsloggedin] = useState(false);
  
  //handler functions
  function handleChange1(event) {
    setUsername(event.target.value);
  };

  function handleChange2(event) {
    setPassword(event.target.value);
  };

  async function handleRegister(event) {
    event.preventDefault();
    const data = {username, password};
    const formsettings= {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    };
    fetch("/register",formsettings).then(response => response.json()).then((response) => {
      if(response == false) {
        alert("Sorry that username is taken. Please try again.");
      }
      else {
        alert("Congratulations! You've successfully registered. You may log in now.");
      }
    })
  };


  async function handleSubmit(event) {
    event.preventDefault();
    const data = {username, password};
    const formsettings= {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'},
      body: JSON.stringify(data)
    };
  await fetch("/login", formsettings).then((res) => res.json()).then((res) => {
    if(res == null) {
      console.log("this is not a user");
      alert("Sorry, the username or password was incorrect. Please try again");
    }
    else {
      setUser(res);
      setIsloggedin(true);

    }
 });

  };
//Logout function
function handleLogOut(event) {
  setIsloggedin(false);
}

  //code for showing login info
  var Logger;

   if(isloggedin == false) {
    Logger = <form onSubmit = {handleSubmit} id="form">
        <label htmlFor="username" id="Username">Username : </label>
        <input type="text" id="username" value = {username}  onChange={handleChange1}></input>
        <label htmlFor="password" id="Password">Password : </label>
        <input type="password" id="password" value={password} onChange={handleChange2}></input>
        <Button form = "form" htmlType="submit" id="login-button">Log in</Button>
        <Button htmltype="submit" id="register-button" onClick={handleRegister}>Register</Button>
        <h1 id="log-text">Please Log In. If you don't have an account, fill in the information and click Register</h1>

      </form>   
  }
    else {
      Logger = 
       <div id="Logout-Button">
        <h1 id="welcome-message"> Welcome, {user.username}</h1>
        <Button type="submit" onClick = {handleLogOut} id="logout-button">Log Out</Button>
        <Post user={user.username}></Post>
      </div>
    };



  return (
    <div className="App">
      {Logger}
    </div>
  );
}
export default Login;