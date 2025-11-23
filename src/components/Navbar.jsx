import React, { useState, useEffect } from 'react';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            padding: '20px 0',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
            backdropFilter: scrolled ? 'blur(10px)' : 'none',
            borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#fff' }}>
                    MPK<span style={{ color: 'var(--accent-primary)' }}>.</span>
                </a>
                <div style={{ display: 'flex', gap: '30px' }}>
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
