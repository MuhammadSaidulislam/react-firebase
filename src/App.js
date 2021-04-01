import logo from './logo.svg';
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';



firebase.initializeApp(firebaseConfig);

function App() {


  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSign=()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res=>{
     const {displayName,email}=res.user;
     console.log(displayName,email);
    })
  
  }

  return (
    <div className="App">
     <button onClick={handleSign}>save</button>
    </div>
  );
}

export default App;
