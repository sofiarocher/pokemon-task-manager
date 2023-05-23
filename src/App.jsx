import Nav from './components/Nav'
import Tasks from './components/Tasks'
import OurPokemons from './components/OurPokemons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
      
      <Router>
        <Nav />
        <Routes>  
          <Route exact path="/tasks" element={<Tasks />} />
          <Route path="/ourpokemons" element={<OurPokemons/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
