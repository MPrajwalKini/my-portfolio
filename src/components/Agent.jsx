import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaMagic, FaChevronRight } from 'react-icons/fa';
import { projects } from '../data/projects';

const Agent = ({ isOpen, onToggle }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "System Online. I am your AI Guide. Ask me about Prajwal's projects or skills!", sender: 'agent' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // 1. Check for basic commands & navigation (Local)
        if (processBasicCommands(userMessage.text)) {
            setIsTyping(false);
            return;
        }

        // 2. Call AI for complex queries
        try {
            const aiResponse = await callPerplexityAPI(userMessage.text);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponse, sender: 'agent' }]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { id: Date.now() + 1, text: "Connection interrupted. Please check your API key or try again.", sender: 'agent' }]);
        } finally {
            setIsTyping(false);
        }
    };

    const processBasicCommands = (text) => {
        const lowerText = text.toLowerCase();
        let responseText = "";
        let action = null;

        if (lowerText.match(/^(hi|hello|hey|greetings)/)) {
            responseText = "Greetings! I am online and ready to assist.";
        } else if (lowerText.includes('who are you')) {
            responseText = "I am the Portfolio AI Assistant, designed to guide you through Prajwal's work.";
        } else if (lowerText.includes('what is this')) {
            responseText = "This is the interactive portfolio of M Prajwal Kini, showcasing his projects and skills.";
        } else if (lowerText.includes('help')) {
            responseText = "I can help you navigate (e.g., 'Go to projects') or answer questions about Prajwal's work.";
        }
        // Local Project Handling
        else if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('portfolio')) {
            const projectTitles = projects.map(p => p.title).join(", ");
            responseText = `Here are some of Prajwal's featured projects: ${projectTitles}. Navigating to the Projects section...`;
            action = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
        // Local Skills Handling
        else if (lowerText.includes('skill') || lowerText.includes('stack') || lowerText.includes('tech')) {
            responseText = "Prajwal is proficient in Python, React, Automation, and Cloud technologies. Let's check the Skills section.";
            action = () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        }
        // Local Contact Handling
        else if (lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('reach')) {
            responseText = "You can reach Prajwal via the contact form or social links. Taking you there now.";
            action = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }

        if (responseText) {
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now() + 1, text: responseText, sender: 'agent' }]);
                if (action) setTimeout(action, 800);
            }, 600);
            return true;
        }
        return false;
    };

    const callPerplexityAPI = async (query) => {
        const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
        if (!apiKey) {
            return "I need a Perplexity API Key to think! Please add VITE_PERPLEXITY_API_KEY to your .env file.";
        }

        const context = `
      You are an AI Assistant for M Prajwal Kini's Portfolio.
      User Name: M Prajwal Kini.
      Role: Software Developer, Automation Engineer.
      
      Projects Data:
      ${JSON.stringify(projects)}

      Instructions:
      - Answer questions about Prajwal's projects, skills, and background.
      - Be concise, professional, and futuristic in tone.
      - If asked about a specific project, provide details from the data.
      - Do not hallucinate projects not listed.
    `;

        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'llama-3.1-sonar-small-128k-online',
                    messages: [
                        { role: 'system', content: context },
                        { role: 'user', content: query }
                    ],
                    max_tokens: 150
                })
            });

            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            throw error;
        }
    };

    const quickActions = [
        { label: "Projects", cmd: "Tell me about your projects" },
        { label: "Skills", cmd: "What are your skills?" },
        { label: "Contact", cmd: "How can I contact you?" },
    ];

    const handleQuickAction = (cmd) => {
        setInput(cmd);
    };

    return (
        <>
            {/* Holographic Orb Button */}
            {!isOpen && (
                <div
                    className="agent-orb-container"
                    onClick={onToggle}
                    role="button"
                    aria-label="Open AI Assistant"
                >
                    <div className="agent-orb">
                        <div className="orb-ring ring-1"></div>
                        <div className="orb-ring ring-2"></div>
                        <div className="orb-core">
                            <FaRobot />
                        </div>
                    </div>
                    <div className="orb-glow"></div>
                </div>
            )}

            {/* HUD Chat Window */}
            <div className={`agent-hud ${isOpen ? 'open' : ''}`}>
                <div className="hud-header">
                    <div className="hud-title">
                        <FaMagic className="hud-icon" />
                        <span className="scrolling-text">AI ASSISTANT // ONLINE</span>
                    </div>
                    <button className="hud-close" onClick={onToggle}>
                        <FaTimes />
                    </button>
                </div>

                <div className="hud-body">
                    <div className="hud-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`hud-message ${msg.sender}`}>
                                {msg.sender === 'agent' && <div className="agent-avatar"><FaRobot /></div>}
                                <div className="message-bubble">
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="hud-message agent">
                                <div className="agent-avatar"><FaRobot /></div>
                                <div className="message-bubble typing">
                                    <span className="wave"></span>
                                    <span className="wave"></span>
                                    <span className="wave"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions */}
                    <div className="hud-quick-actions">
                        {quickActions.map((action, idx) => (
                            <button key={idx} onClick={() => handleQuickAction(action.cmd)}>
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                <form className="hud-input-area" onSubmit={handleSend}>
                    <div className="input-wrapper">
                        <FaChevronRight className="input-prompt" />
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter command..."
                        />
                    </div>
                    <button type="submit" className="send-btn" disabled={!input.trim()}>
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </>
    );
};

export default Agent;
