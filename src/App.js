import React from "react"; import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoginState from "./contexts/login/LoginState";
import Navbar from "./components/navbar/Navbar";
import Home from './components/home/Home';
import About from './components/about/About';
import Signup from "./components/signup/Signup";
import Login from "./components/signup/Login";
function App() {
  return (
    <div>
      <LoginState>
        <Router>
        <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
        </Router>
      </LoginState>
    </div>
  );
}

export default App;
