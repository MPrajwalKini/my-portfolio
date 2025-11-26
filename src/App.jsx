import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import ParticlesBackground from './components/ParticlesBackground';
import MusicPlayer from './components/MusicPlayer';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Agent from './components/Agent';
import './App.css'; // We can keep this for App-specific styles if needed, or remove if unused.

function App() {
  const [activeModal, setActiveModal] = React.useState('none'); // 'none', 'agent', 'music'
  const [theme, setTheme] = React.useState('galaxy');

  React.useEffect(() => {
    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'galaxy';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'galaxy' ? 'solar' : 'galaxy';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleAgent = () => {
    setActiveModal(prev => prev === 'agent' ? 'none' : 'agent');
  };

  const toggleMusic = () => {
    setActiveModal(prev => prev === 'music' ? 'none' : 'music');
  };

  return (
    <div className="app">
      <Cursor />
      <ParticlesBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer theme={theme} />
      <MusicPlayer
        isOpen={activeModal === 'music'}
        onToggle={toggleMusic}
      />
      <Agent
        isOpen={activeModal === 'agent'}
        onToggle={toggleAgent}
      />
    </div>
  );
}

export default App;
