import logo from './logo.svg';
import React, {useState} from 'react';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';



firebase.initializeApp(firebaseConfig);

function App() {


  const [user,setUser]= useState({
    isSignedId: false,
    name: '',
    email: '',
    photos: ''
  })



  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSign=()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
     const {displayName,email,photoURL}=res.user;
    
     const signInUser = {
      isSignedId: true,
      name: displayName,
      email: email,
      photos: photoURL
     }
setUser(signInUser)


    })
  .catch(err=>{
    console.log(err);
  })
  }

  const handleOut=()=>{
 firebase.auth().signOut()
 .then(res =>{
 const signOut={
  isSignedId: false,
  name: '',
  email: '',
  photos: ''
 }
 setUser(signOut)
 })
 .catch( err =>{

 })
  }

  const handleChange=(event)=>{
console.log(event.target.name,event.target.value);
if(event.target.name === 'email'){
const isEmailValid = /^[^\s@]+@[^\s@]+$/.test(event.target.value)
console.log(isEmailValid);
}
if(event.target.name === 'password'){
const isPasswordValid = event.target.value.length > 6;
console.log(isPasswordValid);
  }
  }

  const submitHandle=()=>{
    console.log('submit');
  }

  return (
    <div className="App">
     
     {
       user.isSignedId ? <button onClick={handleOut}>SignOUt</button> : <button onClick={handleSign}>Sign In</button>
     }

     {
       user.isSignedId && <div>
          {user.name} <br/>
          {user.email} <br/>
          <img src={user.photos} alt=""/>
          </div>
     }


<br/>

     <form onSubmit={submitHandle}>

     <input type="text" name="email" onChange={handleChange} placeholder="Enter email address" required/>
     <input type="password" name="password" onChange={handleChange} placeholder="Enter password" required/>
     <button>Save</button>
    
     </form>


    </div>
  );
}

export default App;
