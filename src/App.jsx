import Nav from './components/Nav'
import Tasks from './components/Tasks'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import backgroundVideo from "./assets/background.mp4"
import './App.css'
import Home from './components/Home';
import { useEffect, useRef } from 'react';


function App() {
  const appContainerStyles = {
    position: 'relative',
    minHeight: '100vh',
    background: `url(${backgroundVideo})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  const videoStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    zIndex: -1,
  };

  return (
    <div style={appContainerStyles}>
      <video ref={videoRef} style={videoStyles} autoPlay muted loop playsInline>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App