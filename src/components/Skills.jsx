import React from 'react';
import { FaPython, FaRobot, FaSnowflake, FaDatabase, FaServer, FaSync, FaCloud, FaCogs } from 'react-icons/fa';

const SkillCategory = ({ title, skills, delay }) => (
    <div className="glass-card animate-slide-up" style={{
        padding: '30px',
        animationDelay: `${delay}s`,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>{title}</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {skills.map((skill, index) => (
                <div key={index} style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease'
                }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.borderColor = 'var(--accent-primary)';
                        e.currentTarget.querySelector('.skill-icon').style.color = 'var(--accent-primary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.querySelector('.skill-icon').style.color = 'inherit';
                    }}>
                    <span className="skill-icon" style={{ fontSize: '1.1rem', transition: 'color 0.2s' }}>{skill.icon}</span>
                    {skill.name}
                </div>
            ))}
        </div>
    </div>
);

const Skills = () => {
    const categories = [
        {
            title: "Development",
            skills: [
                { name: 'Python', icon: <FaPython /> },
                { name: 'API Integration', icon: <FaServer /> }
            ]
        },
        {
            title: "Data & Cloud",
            skills: [
                { name: 'Snowflake', icon: <FaSnowflake /> },
                { name: 'IDMC (Informatica)', icon: <FaDatabase /> },
                { name: 'Cloud Deployment', icon: <FaCloud /> }
            ]
        },
        {
            title: "DevOps & Automation",
            skills: [
                { name: 'Automation', icon: <FaRobot /> },
                { name: 'CI/CD Pipelines', icon: <FaSync /> },
                { name: 'Data Operations', icon: <FaCogs /> }
            ]
        }
    ];

    return (
        <section id="skills">
            <div className="container">
                <h2 className="animate-slide-up" style={{ textAlign: 'center', marginBottom: '60px' }}>Technical <span className="text-gradient">Skills</span></h2>
                <div className="bento-grid">
                    {categories.map((category, index) => (
                        <SkillCategory key={index} title={category.title} skills={category.skills} delay={index * 0.1} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
