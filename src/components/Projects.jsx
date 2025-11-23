import React, { useRef } from 'react';
import { FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    return (
        <div
            ref={cardRef}
            className="glass-card animate-slide-up"
            style={{
                padding: '40px',
                animationDelay: `${index * 0.1}s`,
                transition: 'transform 0.1s ease-out',
                transformStyle: 'preserve-3d'
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', transform: 'translateZ(20px)' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: 0 }}>{project.title}</h3>
                <span style={{
                    fontSize: '0.75rem',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    color: 'var(--text-secondary)',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>{project.type}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '1.1rem', transform: 'translateZ(10px)' }}>{project.description}</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', transform: 'translateZ(15px)' }}>
                {project.tags.map((tag, i) => (
                    <span key={i} style={{
                        fontSize: '0.9rem',
                        color: 'var(--accent-primary)',
                        background: 'rgba(0, 242, 255, 0.05)',
                        border: '1px solid rgba(0, 242, 255, 0.2)',
                        padding: '6px 14px',
                        borderRadius: '20px'
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Projects = () => {
    const projects = [
        {
            title: 'Docconverter',
            description: 'A document conversion automation tool designed to streamline file processing workflows.',
            tags: ['Python', 'Automation', 'File Processing'],
            type: 'Private Repository'
        },
        {
            title: 'Jarvis Assistant 3.12v',
            description: 'An advanced AI assistant project built with Python 3.12, featuring voice recognition and task automation capabilities.',
            tags: ['Python 3.12', 'AI', 'Automation'],
            type: 'Private Repository'
        }
    ];

    return (
        <section id="projects">
            <div className="container">
                <h2 className="animate-slide-up" style={{ textAlign: 'center' }}>Featured <span className="text-gradient">Projects</span></h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                    gap: '30px',
                    marginBottom: '60px',
                    marginTop: '40px'
                }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
                <div style={{ textAlign: 'center' }} className="animate-slide-up delay-300">
                    <a href="https://github.com/MPrajwalKini?tab=repositories" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
                        <FaGithub /> View More on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Projects;
