import React, { useState, useEffect } from 'react';
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ProjectModal from './ProjectModal';

const ProjectCard = ({ project, index, isMobile, onSelect }) => {
    return (
        <div className="glass-card project-card-link"
            onClick={() => onSelect(project)}
            style={{
                width: isMobile ? '100%' : '300px',
                height: isMobile ? 'auto' : '420px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: isMobile ? '20px' : '25px',
                background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                boxShadow: '0 0 20px rgba(0, 242, 255, 0.05)',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
            }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '800', color: 'var(--number-color)', lineHeight: 1 }}>0{index + 1}</span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        {project.repoUrl ? (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    fontSize: isMobile ? '1.2rem' : '1.4rem',
                                    color: 'var(--text-secondary)',
                                    transition: 'color 0.3s'
                                }}
                                onMouseEnter={(e) => e.target.style.color = 'var(--accent-primary)'}
                                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                            >
                                <FaGithub />
                            </a>
                        ) : (
                            <span style={{ fontSize: '0.7rem', color: 'var(--private-tag-color)', border: '1px solid var(--private-tag-border)', padding: '4px 8px', borderRadius: '4px', letterSpacing: '1px' }}>PRIVATE</span>
                        )}
                    </div>
                </div>
                <h3 style={{ fontSize: isMobile ? '1.3rem' : '1.5rem', marginBottom: '10px', lineHeight: 1.1, wordWrap: 'break-word', overflowWrap: 'break-word', color: 'var(--text-primary)' }}>{project.title}</h3>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-primary)', display: 'block', marginBottom: '15px', wordWrap: 'break-word' }}>{project.type}</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: isMobile ? '0.8rem' : '0.85rem', lineHeight: 1.6, marginBottom: '15px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>{project.description}</p>
            </div>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {project.tags.map((tag, i) => (
                    <span key={i} style={{
                        fontSize: '0.7rem',
                        color: 'var(--text-primary)',
                        background: 'var(--tag-bg)',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        border: '1px solid var(--tag-border)'
                    }}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
};

const Projects = () => {
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startRotation, setStartRotation] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    // Minimum swipe distance (in px)
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null); // Reset touch end
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            rotate('right'); // Swipe left -> Go next (right)
        } else if (isRightSwipe) {
            rotate('left'); // Swipe right -> Go prev (left)
        }
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const projects = [
        {
            title: 'Jarvis Assistant 3.12v',
            type: 'AI Voice Assistant',
            description: 'A powerful, AI-enhanced personal voice assistant for Windows. Features robust local command processing, AI fallback, and smooth Jarvis-style voice responses. Fully compatible with Python 3.12.',
            tags: ['Python 3.12', 'AI', 'Automation', 'Windows'],
            repoUrl: null
        },
        {
            title: 'DocConvert',
            type: 'Privacy Utility',
            description: 'Local, privacy-focused document and PDF utility built with Python and Flask. Convert, merge, and sign documents locally with no cloud uploads.',
            tags: ['Python', 'Flask', 'Privacy', 'Local'],
            repoUrl: null
        },
        {
            title: 'UPaiMonitor',
            type: 'Android App',
            description: 'UPI Transaction Monitor Android Application. Tracks and monitors UPI transactions with a user-friendly mobile interface.',
            tags: ['Kotlin', 'Android', 'Finance', 'Mobile'],
            repoUrl: 'https://github.com/MPrajwalKini/UPaiMonitor'
        },
        {
            title: 'URL Shortener Vercel',
            type: 'Web Application',
            description: 'A URL shortener website and PWA built with Vercel serverless functions, MongoDB, and NodeJS. Efficient and scalable link management.',
            tags: ['NodeJS', 'MongoDB', 'PWA', 'Serverless'],
            repoUrl: 'https://github.com/MPrajwalKini/lenk.cf'
        },
        {
            title: 'YouTube Downloader',
            type: 'Web Application',
            description: 'Local YouTube video downloader and trimmer with Flask backend. Download and trim videos privately without cloud uploads.',
            tags: ['Python', 'Flask', 'yt-dlp', 'FFmpeg'],
            repoUrl: 'https://github.com/MPrajwalKini/youtube-downloader-local'
        }
    ];

    // Group projects into faces (2 per face) for desktop
    const projectsPerFace = 2;
    const faces = [];
    for (let i = 0; i < projects.length; i += projectsPerFace) {
        faces.push(projects.slice(i, i + projectsPerFace));
    }

    const totalFaces = faces.length;
    const anglePerFace = 360 / totalFaces;
    const radius = 500;

    const handleMouseDown = (e) => {
        if (isMobile) return;
        setIsDragging(true);
        setStartX(e.pageX);
        setStartRotation(rotation);
    };

    const handleMouseMove = (e) => {
        if (!isDragging || isMobile) return;
        const deltaX = e.pageX - startX;
        setRotation(startRotation + deltaX * 0.3);
    };

    const handleMouseUp = () => {
        if (isMobile) return;
        setIsDragging(false);
        const snappedRotation = Math.round(rotation / anglePerFace) * anglePerFace;
        setRotation(snappedRotation);
    };

    const rotate = (direction) => {
        if (isMobile) {
            // Mobile: simple card navigation
            if (direction === 'left') {
                setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
            } else {
                setCurrentIndex((prev) => (prev + 1) % projects.length);
            }
        } else {
            // Desktop: 3D carousel
            const newRotation = rotation + (direction === 'left' ? anglePerFace : -anglePerFace);
            setRotation(newRotation);
        }
    };

    return (
        <section id="projects" style={{ overflow: 'hidden' }}>
            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

            <div className="container" style={{ perspective: isMobile ? 'none' : '2500px' }}>
                <h2 className="animate-slide-up" style={{ textAlign: 'center', marginBottom: '60px' }}>Featured <span className="text-gradient">Projects</span></h2>

                {isMobile ? (
                    // Mobile: Simple card view
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '420px',
                        padding: '20px 0',
                        touchAction: 'pan-y' // Allow vertical scrolling but capture horizontal swipes
                    }}
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchMove}
                        onTouchEnd={onTouchEnd}
                    >
                        <ProjectCard
                            project={projects[currentIndex]}
                            index={currentIndex}
                            isMobile={true}
                            onSelect={setSelectedProject}
                        />
                    </div>
                ) : (
                    // Desktop: 3D Carousel
                    <div
                        style={{
                            position: 'relative',
                            height: '500px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: isDragging ? 'grabbing' : 'grab',
                            transformStyle: 'preserve-3d'
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            transformStyle: 'preserve-3d',
                            transform: `rotateY(${rotation}deg)`,
                            transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.2, 0, 0.2, 1)'
                        }}>
                            {faces.map((faceProjects, faceIndex) => {
                                const angle = anglePerFace * faceIndex;
                                return (
                                    <div
                                        key={faceIndex}
                                        className="project-face"
                                        style={{
                                            position: 'absolute',
                                            left: '50%',
                                            top: '50%',
                                            width: '640px',
                                            height: '420px',
                                            transform: `translate(-50%, -50%) rotateY(${angle}deg) translateZ(${radius}px)`,
                                            display: 'flex',
                                            gap: '40px',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        {faceProjects.map((project, i) => (
                                            <ProjectCard
                                                key={i}
                                                project={project}
                                                index={faceIndex * projectsPerFace + i}
                                                isMobile={false}
                                                onSelect={setSelectedProject}
                                            />
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }} className="animate-slide-up delay-300">
                    <button onClick={() => rotate('left')} className="btn btn-outline" style={{ padding: '10px 20px' }}>
                        <FaChevronLeft />
                    </button>
                    <button onClick={() => rotate('right')} className="btn btn-outline" style={{ padding: '10px 20px' }}>
                        <FaChevronRight />
                    </button>
                </div>

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                        {isMobile ? 'Use arrows to navigate projects' : 'Drag or use arrows to rotate the carousel'}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Projects;
