import React from 'react';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Cursor from './components/Cursor';
import ParticlesBackground from './components/ParticlesBackground';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css'; // We can keep this for App-specific styles if needed, or remove if unused.

function App() {
  return (
    <div className="app">
      <Cursor />
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
