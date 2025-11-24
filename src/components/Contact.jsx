import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact">
            <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                <h2 className="animate-slide-up">Get In <span className="text-gradient">Touch</span></h2>
                <p className="animate-slide-up delay-100" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '50px' }}>
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                </p>

                <div className="animate-slide-up delay-200" style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center', width: '100%' }}>
                    <a href="mailto:mprajwalkini01@gmail.com" className="btn" style={{
                        minWidth: '200px',
                        fontSize: '1.1rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        width: '100%',
                        maxWidth: '300px'
                    }}>
                        <FaEnvelope /> Email Me
                    </a>
                    <div style={{ marginTop: '20px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <a href="https://www.linkedin.com/in/m-prajwal-kini-885037221/" target="_blank" rel="noopener noreferrer" style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 20px',
                            background: 'var(--glass-bg)',
                            borderRadius: '50px',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <FaLinkedin size={20} /> LinkedIn
                        </a>
                        <a href="https://github.com/MPrajwalKini" target="_blank" rel="noopener noreferrer" style={{
                            fontSize: '1.1rem',
                            color: 'var(--text-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '10px 20px',
                            background: 'var(--glass-bg)',
                            borderRadius: '50px',
                            border: '1px solid var(--glass-border)'
                        }}>
                            <FaGithub size={20} /> GitHub
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
