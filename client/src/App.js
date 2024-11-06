import './App.css';
import {useSelector } from 'react-redux';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Login from './components/profile/Login';
import Profile from './components/profile/Profile';
import DrawBoard from './components/draw/DrawBoard';
import SignUp from './components/profile/SignUp';
import Home from './components/home/Home';
import Notes from './components/notes/Notes';
import Search from './components/search/Search';


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
