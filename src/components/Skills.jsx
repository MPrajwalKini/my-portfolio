import React from 'react';
import { FaPython, FaRobot, FaSnowflake, FaDatabase, FaServer, FaSync, FaCloud, FaCogs } from 'react-icons/fa';

const Skills = () => {
    const skills = [
        { name: 'Python', icon: <FaPython /> },
        { name: 'Automation', icon: <FaRobot /> },
        { name: 'Snowflake', icon: <FaSnowflake /> },
        { name: 'IDMC (Informatica)', icon: <FaDatabase /> },
        { name: 'API Integration', icon: <FaServer /> },
        { name: 'CI/CD Pipelines', icon: <FaSync /> },
        { name: 'Cloud Deployment', icon: <FaCloud /> },
        { name: 'Data Operations', icon: <FaCogs /> }
    ];

    return (
        <section id="skills" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="animate-slide-up" style={{ textAlign: 'center', marginBottom: '60px' }}>Technical <span className="text-gradient">Skills</span></h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
                    {skills.map((skill, index) => (
                        <div key={index} className="animate-slide-up" style={{
                            background: 'var(--bg-dark)',
                            padding: '18px 30px',
                            borderRadius: '100px',
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            border: '1px solid #222',
                            transition: 'var(--transition)',
                            cursor: 'default',
                            animationDelay: `${index * 0.05}s`,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 242, 255, 0.1)';
                                e.currentTarget.querySelector('.skill-icon').style.color = 'var(--accent-primary)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = '#222';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                                e.currentTarget.querySelector('.skill-icon').style.color = 'inherit';
                            }}
                        >
                            <span className="skill-icon" style={{ fontSize: '1.2rem', transition: 'color 0.3s' }}>{skill.icon}</span>
                            {skill.name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
