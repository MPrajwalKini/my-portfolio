import React from 'react';
import { FaTimes, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectModal = ({ project, onClose }) => {
    if (!project) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000,
            opacity: 1,
            transition: 'opacity 0.3s ease'
        }} onClick={onClose}>
            <div style={{
                width: '90%',
                maxWidth: '800px',
                maxHeight: '90vh',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--glass-border)',
                borderRadius: '24px',
                padding: '40px',
                position: 'relative',
                overflowY: 'auto',
                boxShadow: '0 0 50px rgba(0, 242, 255, 0.1)',
                animation: 'fadeIn 0.3s ease-out'
            }} onClick={(e) => e.stopPropagation()}>

                <button onClick={onClose} style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    transition: 'color 0.3s'
                }}
                    onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                    onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                    <FaTimes />
                </button>

                <span style={{
                    color: 'var(--accent-primary)',
                    fontSize: '0.9rem',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '10px'
                }}>
                    {project.type}
                </span>

                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '20px',
                    lineHeight: 1.1,
                    background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    {project.title}
                </h2>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' }}>
                    {project.tags.map((tag, i) => (
                        <span key={i} style={{
                            fontSize: '0.8rem',
                            color: 'var(--text-primary)',
                            background: 'rgba(255, 255, 255, 0.05)',
                            padding: '6px 12px',
                            borderRadius: '50px',
                            border: '1px solid var(--glass-border)'
                        }}>
                            {tag}
                        </span>
                    ))}
                </div>

                <div style={{
                    color: 'var(--text-secondary)',
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    marginBottom: '40px'
                }}>
                    {project.description}
                    <br /><br />
                    <p>
                        This project demonstrates advanced concepts in {project.tags.join(', ')}.
                        It was built to solve real-world problems and showcase efficient coding practices.
                    </p>
                </div>

                <div style={{ display: 'flex', gap: '20px' }}>
                    {project.repoUrl ? (
                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaGithub /> View Code
                        </a>
                    ) : (
                        <button className="btn" style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                            Private Repository
                        </button>
                    )}

                    {/* Placeholder for Live Demo if available in future */}
                    {/* <button className="btn btn-outline">Live Demo</button> */}
                </div>

            </div>
        </div>
    );
};

export default ProjectModal;
