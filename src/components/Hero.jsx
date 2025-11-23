import React, { useState, useEffect } from 'react';

const Hero = () => {
    const [text, setText] = useState('');
    const fullText = "Software Developer | Automation Engineer | Cloud Deployment Specialist";
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < fullText.length) {
            const timeout = setTimeout(() => {
                setText((prev) => prev + fullText.charAt(index));
                setIndex((prev) => prev + 1);
            }, 50);
            return () => clearTimeout(timeout);
        }
    }, [index]);

    return (
        <section id="hero" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            // background: 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, var(--bg-dark) 100%)', // Removed for galaxy theme
            overflow: 'hidden',
            position: 'relative'
        }}>
            {/* Grid Background */}
            <div className="grid-bg"></div>

            {/* Background Glow Effect */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, transparent 70%)',
                filter: 'blur(60px)',
                zIndex: 0
            }}></div>


            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <h1 className="animate-slide-up" style={{ fontSize: '4.5rem', marginBottom: '20px', letterSpacing: '-2px' }}>
                    M Prajwal <span className="text-gradient">Kini</span>
                </h1>
                <h3 className="animate-slide-up delay-100" style={{
                    fontSize: '1.5rem',
                    fontWeight: '300',
                    color: 'var(--text-secondary)',
                    marginBottom: '30px',
                    minHeight: '1.6em' // Prevent layout shift
                }}>
                    {text}<span className="cursor">&nbsp;</span>
                </h3>
                <p className="animate-slide-up delay-200" style={{
                    fontSize: '1.2rem',
                    color: '#888',
                    marginBottom: '50px',
                    maxWidth: '600px',
                    margin: '0 auto 50px'
                }}>
                    Building intelligent automation and deployment solutions for the modern web.
                </p>
                <div className="animate-slide-up delay-300" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                    <a href="#projects" className="btn">View Projects</a>
                    <a href="#contact" className="btn btn-outline">Contact Me</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
