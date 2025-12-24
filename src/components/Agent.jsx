import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaMagic, FaChevronRight } from 'react-icons/fa';
import { projects } from '../data/projects';

const Agent = ({ isOpen, onToggle }) => {
    const [messages, setMessages] = useState([
        { id: 1, text: "System Online. I am your AI Guide. Ask me about Prajwal's projects, skills, or code!", sender: 'agent' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const formRef = useRef(null);

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

        if (processBasicCommands(userMessage.text)) {
            setIsTyping(false);
            return;
        }

        const aiResponse = await callPerplexityAPI(userMessage.text);
        setMessages(prev => [...prev, { id: Date.now() + 1, text: aiResponse, sender: 'agent' }]);
        setIsTyping(false);
    };

    const processBasicCommands = (text) => {
        const lowerText = text.toLowerCase();
        let responseText = "";
        let action = null;

        // Basic commands
        if (lowerText.match(/^(hi|hello|hey|greetings)/)) {
            responseText = "Greetings! I am online and ready to assist.";
        }
        else if (lowerText.includes('who are you')) {
            responseText = "I am the Portfolio AI Assistant, designed to guide you through Prajwal's work.";
        }
        else if (lowerText.includes('what is this')) {
            responseText = "This is the interactive portfolio of M Prajwal Kini, showcasing his projects and skills.";
        }
        else if (lowerText.includes('help')) {
            responseText = "I can help you navigate or answer questions about Prajwal's work and code.";
        }
        // Clear chat command
        else if (lowerText.includes('clear')) {
            setMessages([{ id: 1, text: "Chat cleared. How can I assist you?", sender: 'agent' }]);
            return true;
        }
        // Issue detection - bypass local mode and let AI handle it
        else if (lowerText.includes('issue') || lowerText.includes('problem') || lowerText.includes('error') || lowerText.includes('bug')) {
            return false; // Let AI handle issues
        }
        // Specific project queries (MUST come BEFORE general "project" query)
        else if (lowerText.includes('jarvis')) {
            const jarvis = projects.find(p => p.title.toLowerCase().includes('jarvis'));
            if (jarvis) responseText = `${jarvis.title}: ${jarvis.description}`;
        }
        else if (lowerText.includes('docconvert')) {
            const doc = projects.find(p => p.title.toLowerCase().includes('docconvert'));
            if (doc) responseText = `${doc.title}: ${doc.description}`;
        }
        else if (lowerText.includes('upaimonitor') || lowerText.includes('upi')) {
            const upai = projects.find(p => p.title.toLowerCase().includes('upai'));
            if (upai) responseText = `${upai.title}: ${upai.description}`;
        }
        else if (lowerText.includes('url') || lowerText.includes('shortener')) {
            const url = projects.find(p => p.title.toLowerCase().includes('url'));
            if (url) responseText = `${url.title}: ${url.description}`;
        }
        else if (lowerText.includes('youtube') || lowerText.includes('downloader')) {
            const yt = projects.find(p => p.title.toLowerCase().includes('youtube'));
            if (yt) responseText = `${yt.title}: ${yt.description}`;
        }
        // General queries (MUST come AFTER specific project queries)
        else if (lowerText.includes('project') || lowerText.includes('work') || lowerText.includes('portfolio')) {
            const projectTitles = projects.map(p => p.title).join(", ");
            responseText = `Here are Prajwal's featured projects: ${projectTitles}. Navigating to the Projects section...`;
            action = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
        else if (lowerText.includes('skill') || lowerText.includes('stack') || lowerText.includes('tech')) {
            responseText = "Prajwal's technical skills include Python, API Integration, Snowflake, IDMC (Informatica), Cloud Deployment, Automation, CI/CD Pipelines, Data Operations, and AI Prompting. Let's check the Skills section.";
            action = () => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
        }
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

    const DAILY_LIMIT = 15;

    const getDailyUsage = () => {
        const today = new Date().toDateString();
        const stored = localStorage.getItem('agent_daily_usage');

        if (stored) {
            const { date, count } = JSON.parse(stored);
            if (date === today) {
                return count;
            }
        }

        // Reset or initialize
        const initial = { date: today, count: 0 };
        localStorage.setItem('agent_daily_usage', JSON.stringify(initial));
        return 0;
    };

    const incrementUsage = () => {
        const today = new Date().toDateString();
        const currentCount = getDailyUsage();
        const updated = { date: today, count: currentCount + 1 };
        localStorage.setItem('agent_daily_usage', JSON.stringify(updated));
        return updated.count;
    };

    const callPerplexityAPI = async (query, retryCount = 0) => {
        // usage limit check
        const usage = getDailyUsage();
        if (usage >= DAILY_LIMIT) {
            return `Daily limit of ${DAILY_LIMIT} requests reached. Please try again tomorrow! (This is to manage API costs for the hosted website)`;
        }

        const apiKey = import.meta.env.VITE_PERPLEXITY_API_KEY;
        if (!apiKey || apiKey === 'your_perplexity_api_key_here') {
            return "I need a valid Perplexity API Key! Please add your key to the .env file.";
        }

        const projectList = projects.map(p => p.title).join(', ');

        const requestBody = {
            model: 'sonar',
            messages: [{
                role: 'user',
                content: `Portfolio AI for M Prajwal Kini. Projects: ${projectList}. Skills: Python, API, Snowflake, IDMC, Cloud, Automation, CI/CD. Answer briefly (2-3 sentences). For issues: ask for error details. Portfolio questions only. Q: ${query}`
            }],
            max_tokens: 150,
            temperature: 0.2
        };

        console.log('=== Perplexity API Request ===');
        console.log('Retry:', retryCount);

        try {
            const response = await fetch('https://api.perplexity.ai/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log('Status:', response.status);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error:', errorData);

                if (retryCount < 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return callPerplexityAPI(query, retryCount + 1);
                }
                return "The AI service is temporarily unavailable. Please try again.";
            }

            const data = await response.json();

            if (!data.choices?.[0]?.message?.content) {
                console.error('Empty response:', data);

                if (retryCount < 1) {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    return callPerplexityAPI(query, retryCount + 1);
                }
                return "I'm having trouble with that question. Could you rephrase it?";
            }

            // Increment usage only on success
            incrementUsage();

            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error:', error);

            if (retryCount < 1) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return callPerplexityAPI(query, retryCount + 1);
            }
            return "Connection error. Please check your internet.";
        }
    };

    const quickActions = [
        { label: "Projects", cmd: "Tell me about your projects" },
        { label: "Skills", cmd: "What are your skills?" },
        { label: "Contact", cmd: "How can I contact you?" },
    ];

    const handleQuickAction = (cmd) => {
        setInput(cmd);
        setTimeout(() => {
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        }, 50);
    };

    return (
        <>
            {!isOpen && (
                <div className="agent-orb-container" onClick={onToggle} role="button" aria-label="Open AI Assistant">
                    <div className="agent-orb">
                        <div className="orb-ring ring-1"></div>
                        <div className="orb-ring ring-2"></div>
                        <div className="orb-core"><FaRobot /></div>
                    </div>
                    <div className="orb-glow"></div>
                </div>
            )}

            <div className={`agent-hud ${isOpen ? 'open' : ''}`}>
                <div className="hud-header">
                    <div className="hud-title">
                        <FaMagic className="hud-icon" />
                        <div className="title-with-status">
                            <span className="scrolling-text">AI ASSISTANT</span>
                            <div className="online-status">
                                <span className="status-dot"></span>
                                <span className="status-text">Online</span>
                            </div>
                        </div>
                    </div>
                    <button className="hud-close" onClick={onToggle}><FaTimes /></button>
                </div>

                <div className="hud-body">
                    <div className="hud-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`hud-message ${msg.sender}`}>
                                {msg.sender === 'agent' && <div className="agent-avatar"><FaRobot /></div>}
                                <div className="message-bubble">{msg.text}</div>
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

                    <div className="hud-quick-actions">
                        {quickActions.map((action, idx) => (
                            <button key={idx} onClick={() => handleQuickAction(action.cmd)}>
                                {action.label}
                            </button>
                        ))}
                    </div>
                </div>

                <form ref={formRef} className="hud-input-area" onSubmit={handleSend}>
                    <div className="input-wrapper">
                        <FaChevronRight className="input-prompt" />
                        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter command..." />
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
