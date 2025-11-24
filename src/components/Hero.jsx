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
        } else {
            const timeout = setTimeout(() => {
                setIndex(0);
                setText('');
            }, 5000);
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

            <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <h2 className="animate-slide-up" style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                    letterSpacing: '2px',
                    color: 'var(--accent-primary)',
                    marginBottom: '20px'
                }}>
                    HELLO, I'M
                </h2>
                <h1 className="animate-slide-up delay-100" style={{
                    fontSize: 'clamp(3rem, 10vw, 6rem)',
                    fontWeight: '800',
                    marginBottom: '20px',
                    lineHeight: 1.1,
                    background: 'linear-gradient(to right, #fff, #a5a5a5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    M PRAJWAL KINI
                </h1>
                <div className="animate-slide-up delay-200" style={{
                    fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                    color: 'var(--text-secondary)',
                    marginBottom: '40px',
                    minHeight: '60px'
                }}>
                    I am a <span className="text-gradient">{text}</span>
                    <span className="cursor"></span>
                </div>
                <div className="animate-slide-up delay-300" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <a href="#projects" className="btn">View My Work</a>
                    <a href="#contact" className="btn btn-outline">Contact Me</a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
