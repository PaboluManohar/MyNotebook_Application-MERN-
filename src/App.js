import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { About } from "./components/About";
import {Navbar} from "./components/Navbar";
 import NoteState from "./context/notes/noteState";
import { Alert } from "./components/Alert";
import { LogIn } from "./components/LogIn";
import { Signup } from "./components/Signup";
import { AlertState } from './context/alert/alertState';


function App() {
  return (
    <>
     <AlertState>
    <NoteState>
     
      <BrowserRouter>
        <Navbar />
        <div style={{height:"43px",width:"100%",padding:"0px"}} className="container-fluid"><Alert  message="This is amazing React course" /></div>
        <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/login" element={<LogIn/>}/>
          <Route path="/signup" element={<Signup/>}/>
 

        </Routes>
        </div>
      </BrowserRouter>
      </NoteState>
      </AlertState>

    </>
  );
}

export default App;
