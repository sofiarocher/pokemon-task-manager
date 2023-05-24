import Nav from './components/Nav'
import Tasks from './components/Tasks'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Nav /> 
        <Routes>  
          <Route exact path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
