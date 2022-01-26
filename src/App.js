import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home"
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import NavBar from "./Components/Navbar";
import Leaderboard from "./Components/Leaderboard";


function App() {
  return (
    <div className="App">
      <NavBar />
        <Router>
          <Routes className='routes'>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/Login' element={<Login/>} />
            <Route exact path='/Profile' element={<Profile/>} />
            <Route exact path='/Leaderboard' element={<Leaderboard/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;