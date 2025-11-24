import React from 'react';

const About = () => {
    return (
        <section id="about" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container">
                <h2 className="animate-slide-up" style={{ marginBottom: '40px' }}>About <span className="text-gradient">Me</span></h2>
                <div className="glass-card animate-slide-up delay-100" style={{ padding: '40px', fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    <p style={{ marginBottom: '20px' }}>
                        I am a passionate <strong style={{ color: 'var(--text-primary)' }}>Software Developer</strong> and <strong style={{ color: 'var(--text-primary)' }}>Automation Engineer</strong> with a strong focus on building efficient, scalable solutions.
                        My expertise lies in creating robust automation workflows and managing complex cloud deployments.
                    </p>
                    <p style={{ marginBottom: '20px' }}>
                        I have extensive experience in creating automations for <strong style={{ color: 'var(--accent-primary)' }}>IDMC (Informatica Intelligent Cloud Services)</strong> and <strong style={{ color: 'var(--accent-primary)' }}>Snowflake</strong> deployments,
                        streamlining data operations and reducing manual effort.
                    </p>
                    <p>
                        Proficient in <strong style={{ color: 'var(--text-primary)' }}>Python</strong>, I specialize in developing tools that integrate with various APIs and deployment pipelines,
                        ensuring seamless delivery of software and data solutions.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;
