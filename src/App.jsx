import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home'
import Notes from "./pages/Notes";
import NoteDetail from "./pages/NoteDetail";
import Navbar from "./components/Navbar";


const App = () => {
  return (
    <Router>
     <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/notes' element={<Notes/>}/>
      <Route path='/notes/:id' element={<NoteDetail/>}/>
      
    </Routes>
    </Router>
  )
}

export default App