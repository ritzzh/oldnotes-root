import './App.css';
import {useSelector } from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './layout/navbar/Navbar';
import Login from './components/authentication/Login';
import Profile from './components/users/Profile';
import DrawBoard from './components/notes/createNotes/drawNotes/DrawBoard';
import SignUp from './components/authentication/SignUp';
import Home from './components/home/Home';
import Notes from './components/notes/createNotes/uploadNotes/Notes';
import Search from './components/notes/searchNotes/Search';


// const baseURL = `http://localhost:4000`
const baseURL = `https://oldnotesbackend.vercel.app`

function App() {
  const {logged} = useSelector((state)=>state.user)

  
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path='*' element={<Home/>}></Route>
          <Route exact path='/Login' element={
          <Login 
            baseURL={baseURL}
          />
          }>
          </Route>
          <Route exact path='/SignUp' element={
          <SignUp
            baseURL={baseURL}
          />
          }>
          </Route>
          {logged && <Route exact path='/Search' baseURL={baseURL} element={<Search/>}></Route>}
          {logged && <Route exact path='/Notes' baseURL={baseURL} element={<Notes></Notes>}></Route>}
          {logged && <Route exact path='/Profile' element={<Profile 
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
