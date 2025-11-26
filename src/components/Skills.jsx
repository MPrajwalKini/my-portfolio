import React, { useState } from 'react';
import { FaPython, FaReact, FaNodeJs, FaDatabase, FaCloud, FaRobot, FaCode, FaServer, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiSnowflake, SiPostgresql } from 'react-icons/si';

const SkillCard = ({ skill }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                border: '2px solid var(--glass-border)',
                borderRadius: '16px',
                padding: '20px 15px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isHovered ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
                boxShadow: isHovered
                    ? '0 8px 32px rgba(0, 242, 255, 0.3), 0 0 0 1px rgba(0, 242, 255, 0.1)'
                    : '0 4px 20px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Animated background gradient on hover */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(0, 242, 255, 0.1) 0%, transparent 70%)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.4s',
                pointerEvents: 'none',
                animation: isHovered ? 'pulse-glow 2s infinite' : 'none'
            }} />

            {/* Icon */}
            <div style={{
                fontSize: '2.5rem',
                color: 'var(--text-primary)',
                transition: 'all 0.3s',
                filter: isHovered ? 'drop-shadow(0 0 10px var(--accent-primary))' : 'none',
                transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
                zIndex: 1
            }}>
                {skill.icon}
            </div>

            {/* Skill Name */}
            <h3 style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: isHovered ? 'var(--accent-primary)' : 'var(--text-primary)',
                margin: 0,
                transition: 'color 0.3s',
                zIndex: 1,
                textAlign: 'center'
            }}>
                {skill.name}
            </h3>
        </div>
    );
};

const SkillCategory = ({ category, isExpanded, onToggle }) => {
    return (
        <div style={{
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)',
            borderRadius: '20px',
            overflow: 'hidden',
            transition: 'all 0.3s'
        }}>
            {/* Category Header */}
            <div
                onClick={onToggle}
                style={{
                    padding: '20px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isExpanded ? 'var(--skill-hover-bg)' : 'transparent',
                    transition: 'all 0.3s',
                    borderBottom: isExpanded ? '1px solid var(--glass-border)' : 'none',
                    position: 'relative'
                }}
            >
                {/* Icon */}
                <div style={{
                    fontSize: '1.5rem',
                    color: 'var(--accent-primary)',
                    transition: 'transform 0.3s',
                    transform: isExpanded ? 'scale(1.1)' : 'scale(1)',
                    marginBottom: '10px'
                }}>
                    {category.icon}
                </div>

                {/* Title and Skill Count */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px'
                }}>
                    <h3 style={{
                        fontSize: '1.1rem',
                        margin: 0,
                        color: 'var(--text-primary)',
                        fontWeight: '600',
                        lineHeight: '1.3',
                        textAlign: 'center'
                    }}>
                        {category.title}
                    </h3>
                    <p style={{
                        fontSize: '0.8rem',
                        margin: 0,
                        color: 'var(--text-secondary)',
                        lineHeight: '1.2',
                        textAlign: 'center'
                    }}>
                        {category.skills.length} skills
                    </p>
                </div>

                {/* Chevron Icon */}
                <div style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: isExpanded ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)',
                    fontSize: '1.2rem',
                    color: 'var(--accent-primary)',
                    transition: 'transform 0.3s'
                }}>
                    <FaChevronDown />
                </div>
            </div>

            {/* Expandable Content */}
            <div style={{
                maxHeight: isExpanded ? '1000px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: isExpanded ? '20px' : '0 20px'
            }}>
                <div
                    className="skill-cards-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                        gap: '15px',
                        opacity: isExpanded ? 1 : 0,
                        transition: 'opacity 0.3s'
                    }}
                >
                    {category.skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            style={{
                                animation: isExpanded ? `slideUp 0.4s ease-out ${index * 0.05}s both` : 'none'
                            }}
                        >
                            <SkillCard skill={skill} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const Skills = () => {
    const [expandedCategories, setExpandedCategories] = useState([0]); // First category expanded by default

    const categories = [
        {
            title: 'Frontend Development',
            icon: <FaCode />,
            skills: [
                { name: 'JavaScript', icon: <SiJavascript /> },
                { name: 'Tailwind CSS', icon: <SiTailwindcss /> }
            ]
        },
        {
            title: 'Backend Development',
            icon: <FaServer />,
            skills: [
                { name: 'Python', icon: <FaPython /> },
                { name: 'API Design', icon: <FaServer /> }
            ]
        },
        {
            title: 'Data & Cloud',
            icon: <FaCloud />,
            skills: [
                { name: 'Snowflake', icon: <SiSnowflake /> },
                { name: 'SQL', icon: <SiPostgresql /> },
                { name: 'Cloud Services', icon: <FaCloud /> },
                { name: 'Database', icon: <FaDatabase /> }
            ]
        },
        {
            title: 'Emerging Technologies',
            icon: <FaRobot />,
            skills: [
                { name: 'Automation', icon: <FaCode /> }
            ]
        }
    ];

    const toggleCategory = (index) => {
        setExpandedCategories(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    return (
        <section id="skills" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            padding: '100px 0'
        }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 className="animate-slide-up" style={{ marginBottom: '15px' }}>
                        Technical <span className="text-gradient">Skills</span>
                    </h2>
                    <p style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Click on a category to expand and explore my skills
                    </p>
                </div>

                <div
                    className="skills-categories-grid"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
                        gap: '25px',
                        maxWidth: '1200px',
                        margin: '0 auto'
                    }}
                >
                    {categories.map((category, index) => (
                        <div
                            key={category.title}
                            className="animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <SkillCategory
                                category={category}
                                isExpanded={expandedCategories.includes(index)}
                                onToggle={() => toggleCategory(index)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
