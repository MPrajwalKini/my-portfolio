import React, { useEffect, useState } from 'react';

const Cursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [hidden, setHidden] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [linkHovered, setLinkHovered] = useState(false);

    useEffect(() => {
        const addEventListeners = () => {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseenter', onMouseEnter);
            document.addEventListener('mouseleave', onMouseLeave);
            document.addEventListener('mousedown', onMouseDown);
            document.addEventListener('mouseup', onMouseUp);
        };

        const removeEventListeners = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseenter', onMouseEnter);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Check if hovering over a clickable element
            const target = e.target;
            const isLink = target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button');
            setLinkHovered(!!isLink);
        };

        const onMouseEnter = () => setHidden(false);
        const onMouseLeave = () => setHidden(true);
        const onMouseDown = () => setClicked(true);
        const onMouseUp = () => setClicked(false);

        addEventListeners();
        return () => removeEventListeners();
    }, []);

    const cursorClasses = `cursor-wrapper ${hidden ? 'cursor-hidden' : ''} ${clicked ? 'cursor-clicked' : ''} ${linkHovered ? 'cursor-link-hovered' : ''}`;

    return (
        <div
            className={cursorClasses}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div className="cursor-dot"></div>
            <div className="cursor-ring"></div>
        </div>
    );
};

export default Cursor;
