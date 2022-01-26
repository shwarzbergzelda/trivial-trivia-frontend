import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home"
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Category from "./Components/Category";



function App() {
  return (
    <div className="App">
      <nav className='app--nav'>
        <Router>
          <Routes className='routes'>
            <Route exact path='/' element={<Home/>} />
            <Route exact path='/Login' element={<Login/>} />
            <Route exact path='/Profile' element={<Profile/>} />
            <Route exact path='/Category' element={<Category/>} />
          </Routes>
        </Router>
      </nav>
    </div>
  );
}

export default App;
