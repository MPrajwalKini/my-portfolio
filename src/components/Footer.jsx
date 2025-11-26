import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = ({ theme }) => {
    return (
        <footer style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            padding: '40px 0',
            textAlign: 'center',
            borderTop: '1px solid var(--glass-border)',
            marginTop: '60px'
        }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '20px' }}>
                    <a href="https://github.com/MPrajwalKini" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', transition: 'color 0.3s' }} className="social-icon">
                        <FaGithub />
                    </a>
                    <a href="https://www.linkedin.com/in/m-prajwal-kini-885037221/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', transition: 'color 0.3s' }} className="social-icon">
                        <FaLinkedin />
                    </a>
                    <a href="mailto:mprajwalkini01@gmail.com" style={{ color: 'var(--text-secondary)', fontSize: '1.5rem', transition: 'color 0.3s' }} className="social-icon">
                        <FaEnvelope />
                    </a>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    &copy; {new Date().getFullYear()} M Prajwal Kini. Built with React & {theme === 'galaxy' ? 'Galaxy' : 'Solar'} Vibes.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
