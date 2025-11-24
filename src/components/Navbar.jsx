import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState('galaxy');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'galaxy';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-theme', savedTheme);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'galaxy' ? 'solar' : 'galaxy';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '20px 0',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            background: scrolled || isOpen ? 'var(--bg-dark)' : 'transparent',
            backdropFilter: scrolled || isOpen ? 'blur(10px)' : 'none',
            borderBottom: scrolled || isOpen ? '1px solid var(--glass-border)' : 'none'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)', zIndex: 1001 }}>
                    MPK<span style={{ color: 'var(--accent-primary)' }}>.</span>
                </a>

                {/* Desktop Menu */}
                <div className="desktop-menu" style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                    {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} style={{
                            color: 'var(--text-secondary)',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent-primary)'}
                            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                        >
                            {item}
                        </a>
                    ))}
                    <button onClick={toggleTheme} style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--accent-primary)',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        {theme === 'galaxy' ? <FaSun /> : <FaMoon />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 1001 }}>
                    <button className="mobile-menu-btn" onClick={toggleTheme} style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--accent-primary)',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        display: 'block' // Always show on mobile too
                    }}>
                        {theme === 'galaxy' ? <FaSun /> : <FaMoon />}
                    </button>
                    <div className="mobile-menu-btn" onClick={toggleMenu} style={{ fontSize: '1.5rem', color: 'var(--text-primary)', cursor: 'pointer' }}>
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <div className={`mobile-menu ${isOpen ? 'open' : ''}`} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: 'var(--mobile-menu-bg)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '40px',
                    transition: 'transform 0.3s ease-in-out',
                    transform: isOpen ? 'translateY(0)' : 'translateY(-100%)',
                    zIndex: 1000
                }}>
                    {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                        <a key={item} href={`#${item.toLowerCase()}`} onClick={toggleMenu} style={{
                            color: 'var(--text-primary)',
                            fontSize: '2rem',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '2px'
                        }}>
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
