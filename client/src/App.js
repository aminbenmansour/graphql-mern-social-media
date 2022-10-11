import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import "semantic-ui-css/semantic.min.css";
import './App.css';

import MenuBar from "./Components/MenuBar";

import Home from "./Pages/Home"
import Login from "./Pages/Login"
import Register from "./Pages/Register"

function App() {
  return (
    <Router>
      <MenuBar />
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Routes>
    </Router>
  );
}

export default App;
