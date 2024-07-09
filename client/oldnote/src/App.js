import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Login from './components/profile/Login';
import { useState } from 'react';
import Profile from './components/profile/Profile';
import DrawBoard from './components/draw/DrawBoard';
import SignUp from './components/profile/SignUp';
import Home from './components/home/Home';
import Notes from './components/notes/Notes';
import Search from './components/search/Search';


// const baseURL = `http://localhost:4000/`
const baseURL = `https://oldnotes-root-backend.onrender.com`

function App() {
  const [username, setUsername] = useState('');
  const [logged,setLog] = useState(false);
  
  return (
    <div>
      <Router>
        <Navbar logged={logged} setLog={setLog}></Navbar>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='Login' element={
          <Login
            username={username}
            setUsername={setUsername}
            logged={logged} 
            setLog={setLog}
            baseURL={baseURL}
          />
          }>
          </Route>
          <Route exact path='/SignUp' element={
          <SignUp
            logged={logged} 
            setLog={setLog}
            baseURL={baseURL}
            username={username}
            setUsername={setUsername}
          />
          }>
          </Route>
          {logged && <Route exact path='/Search' element={<Search/>}></Route>}
          {logged && <Route exact path='/Notes' element={<Notes></Notes>}></Route>}
          {logged && <Route exact path='/Profile' element={<Profile
            setUsername={setUsername}
            username={username}
            logged={logged} 
            setLog={setLog}
            baseURL={baseURL}
          />
          }>
          </Route>}
          {logged && <Route exact path='/DrawBoard' element={<DrawBoard/>}></Route>}
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
