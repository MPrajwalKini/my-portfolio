import React, { useState, useRef, useEffect } from 'react';
import { FaMusic, FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaTimes } from 'react-icons/fa';

const MusicPlayer = ({ isOpen, onToggle }) => {
    // const [isOpen, setIsOpen] = useState(false); // Removed internal state
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [hasInteracted, setHasInteracted] = useState(false);
    const audioRef = useRef(null);

    // Touch state for swipe detection
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientY);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientY);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;
        const isSwipeUp = distance > minSwipeDistance;
        const isSwipeDown = distance < -minSwipeDistance;

        if (isSwipeUp) {
            nextTrack();
        } else if (isSwipeDown) {
            prevTrack();
        }
    };

    const playlist = [
        {
            title: 'The Improv',
            artist: 'Dj Quads',
            url: '/music/Dj Quads - The Improv.mp3'
        },
        {
            title: 'Made in Romania',
            artist: 'Ionut Cercel',
            url: '/music/Ionut Cercel - Made in Romania.mp3'
        },
        {
            title: 'Cold',
            artist: 'NEFFEX',
            url: '/music/NEFFEX - Cold.mp3'
        },
        {
            title: 'Bliss',
            artist: 'Lofi Hip Hop',
            url: '/music/bliss.mp3'
        }
    ];

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current && playlist.length > 0) {
            audioRef.current.src = playlist[currentTrack].url;
            if (isPlaying) {
                audioRef.current.play().catch(err => console.log('Playback prevented:', err));
            }
        }
    }, [currentTrack]);

    useEffect(() => {
        const handleFirstInteraction = () => {
            if (!hasInteracted && audioRef.current) {
                setHasInteracted(true);
                setIsPlaying(true);
                audioRef.current.play().catch(err => {
                    console.log('Autoplay prevented:', err);
                    setIsPlaying(false);
                });
            }
        };

        const events = ['click', 'touchstart', 'keydown'];
        events.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, { once: true });
        });

        return () => {
            events.forEach(event => {
                document.removeEventListener(event, handleFirstInteraction);
            });
        };
    }, [hasInteracted]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => console.log('Playback prevented:', err));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % playlist.length);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const handleVolumeChange = (e) => {
        setVolume(parseFloat(e.target.value));
    };

    const handleWheel = (e) => {
        e.preventDefault();
        if (e.deltaY > 0) {
            nextTrack();
        } else if (e.deltaY < 0) {
            prevTrack();
        }
    };

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space' && isOpen && e.target.tagName !== 'INPUT') {
                e.preventDefault();
                togglePlay();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isOpen, isPlaying]);

    return (
        <>
            <audio ref={audioRef} onEnded={nextTrack} />

            {!isOpen && (
                <div
                    onClick={onToggle}
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: 'var(--card-bg)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid var(--card-border)',
                        boxShadow: '0 0 20px var(--box-shadow-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        zIndex: 1000,
                        transition: 'all 0.3s ease',
                        animation: isPlaying ? 'pulse 2s infinite' : 'none'
                    }}
                    className="music-player-btn"
                >
                    <FaMusic style={{ fontSize: '24px', color: 'var(--accent-primary)' }} />
                </div>
            )}

            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '30px',
                        right: '30px',
                        width: '320px',
                        background: 'var(--card-bg)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid var(--card-border)',
                        borderRadius: '16px',
                        padding: '20px',
                        boxShadow: '0 8px 32px var(--box-shadow-color)',
                        zIndex: 1002,
                        animation: 'slideUp 0.3s ease'
                    }}
                    className="music-player-expanded"
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FaMusic style={{ color: 'var(--accent-primary)', fontSize: '18px' }} />
                            <span style={{ fontSize: '14px', fontWeight: '600', letterSpacing: '1px', color: 'var(--text-primary)' }}>NOW PLAYING</span>
                        </div>
                        <FaTimes
                            onClick={onToggle}
                            style={{ cursor: 'pointer', fontSize: '18px', opacity: 0.7, transition: 'opacity 0.3s', color: 'var(--text-primary)' }}
                            onMouseEnter={(e) => e.target.style.opacity = 1}
                            onMouseLeave={(e) => e.target.style.opacity = 0.7}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div style={{
                            background: 'var(--tag-bg)',
                            borderRadius: '8px',
                            border: '1px solid var(--tag-border)',
                            overflow: 'hidden'
                        }}>
                            <div
                                onWheel={handleWheel}
                                onTouchStart={onTouchStart}
                                onTouchMove={onTouchMove}
                                onTouchEnd={onTouchEnd}
                                style={{ position: 'relative', height: '180px', touchAction: 'none' }}
                            >
                                {[...Array(3)].map((_, offset) => {
                                    const index = (currentTrack + offset - 1 + playlist.length) % playlist.length;
                                    const track = playlist[index];
                                    const isActive = offset === 1;

                                    return (
                                        <div
                                            key={`${index}-${offset}`}
                                            onClick={() => {
                                                if (offset === 0) prevTrack();
                                                else if (offset === 2) nextTrack();
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: `${offset * 60}px`,
                                                left: 0,
                                                right: 0,
                                                padding: '15px',
                                                cursor: offset !== 1 ? 'pointer' : 'default',
                                                background: isActive ? 'var(--skill-hover-bg)' : 'transparent',
                                                borderBottom: offset < 2 ? '1px solid var(--tag-border)' : 'none',
                                                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                                opacity: isActive ? 1 : 0.5,
                                                transform: isActive ? 'scale(1)' : 'scale(0.95)',
                                                zIndex: isActive ? 2 : 1
                                            }}
                                            className={offset !== 1 ? "playlist-item" : ""}
                                        >
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <div>
                                                    <div style={{
                                                        fontSize: isActive ? '16px' : '14px',
                                                        fontWeight: isActive ? '600' : '500',
                                                        transition: 'all 0.3s',
                                                        color: 'var(--text-primary)'
                                                    }}>
                                                        {track.title}
                                                    </div>
                                                    <div style={{
                                                        fontSize: isActive ? '12px' : '11px',
                                                        color: 'var(--text-secondary)',
                                                        marginTop: '2px',
                                                        transition: 'all 0.3s'
                                                    }}>
                                                        {track.artist}
                                                    </div>
                                                </div>
                                                {isActive && (
                                                    <div style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: 'var(--accent-primary)',
                                                        boxShadow: '0 0 10px var(--accent-primary)',
                                                        animation: 'pulse 2s infinite'
                                                    }} />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                        <button
                            onClick={prevTrack}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                fontSize: '20px',
                                opacity: 0.8,
                                transition: 'all 0.3s'
                            }}
                            className="control-btn"
                        >
                            <FaStepBackward />
                        </button>

                        <button
                            onClick={togglePlay}
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                                border: 'none',
                                color: 'white', // Keep play button icon white as it's on a gradient
                                cursor: 'pointer',
                                fontSize: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s',
                                boxShadow: '0 4px 15px var(--box-shadow-color)'
                            }}
                            className="play-btn"
                        >
                            {isPlaying ? <FaPause /> : <FaPlay style={{ marginLeft: '3px' }} />}
                        </button>

                        <button
                            onClick={nextTrack}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-primary)',
                                cursor: 'pointer',
                                fontSize: '20px',
                                opacity: 0.8,
                                transition: 'all 0.3s'
                            }}
                            className="control-btn"
                        >
                            <FaStepForward />
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <FaVolumeUp style={{ fontSize: '16px', color: 'var(--accent-primary)' }} />
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            style={{
                                flex: 1,
                                height: '4px',
                                borderRadius: '2px',
                                outline: 'none',
                                background: `linear-gradient(to right, var(--accent-primary) 0%, var(--accent-primary) ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`,
                                cursor: 'pointer'
                            }}
                            className="volume-slider"
                        />
                        <span style={{ fontSize: '12px', minWidth: '35px', textAlign: 'right' }}>
                            {Math.round(volume * 100)}%
                        </span>
                    </div>

                    {isPlaying && (
                        <div style={{
                            display: 'flex',
                            gap: '3px',
                            justifyContent: 'center',
                            marginTop: '15px',
                            height: '30px',
                            alignItems: 'flex-end'
                        }}>
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        width: '4px',
                                        background: 'var(--accent-primary)',
                                        borderRadius: '2px',
                                        animation: `musicBar 0.8s ease-in-out infinite`,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default MusicPlayer;
