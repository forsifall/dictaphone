import { StoreType } from '@/app/store/store';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';


export default function WindowLogs() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const { responseLogs } = useSelector((store: StoreType) => store.logs);

    // Автоскролл к последнему логу
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [responseLogs]);

    return (
        <div style={{marginTop: "20px"}} className="terminal-window">
            <div className="terminal-header">
                <div className="terminal-buttons">
                    <span className="btn-close"></span>
                    <span className="btn-minimize"></span>
                    <span className="btn-maximize"></span>
                </div>
                <div className="terminal-title">Server Logs</div>
            </div>
            
            <div className="terminal-body" ref={scrollRef}>
                {responseLogs.length === 0 ? (
                    <div className="terminal-line">
                        <span className="prompt">$</span>
                        <span className="text">Waiting for logs...</span>
                    </div>
                ) : (
                    responseLogs.map((log, index) => (
                        <div key={index} className="terminal-line">
                            <span className="prompt">$</span>
                            <span className="text">{log}</span>
                        </div>
                    ))
                )}
                <div className="cursor-blink">_</div>
            </div>

            <style jsx>{`
                .terminal-window {
                    width: 100%;
                    max-width: 800px;
                    background: #1e1e1e;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                }

                .terminal-header {
                    background: #2d2d2d;
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    border-bottom: 1px solid #404040;
                }

                .terminal-buttons {
                    display: flex;
                    gap: 8px;
                    margin-right: 16px;
                }

                .terminal-buttons span {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    display: block;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
                }

                .terminal-buttons span:hover {
                    transform: scale(1.1);
                    box-shadow: 0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3);
                }

                .btn-close {
                    background: #ff5f57;
                }

                .btn-close:hover {
                    background: #ff7979;
                }

                .btn-minimize {
                    background: #ffbd2e;
                }

                .btn-minimize:hover {
                    background: #ffd93d;
                }

                .btn-maximize {
                    background: #28ca42;
                }

                .btn-maximize:hover {
                    background: #55efc4;
                }

                .terminal-title {
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 500;
                }

                .terminal-body {
                    background: #1e1e1e;
                    padding: 16px;
                    height: 400px;
                    overflow-y: auto;
                    color: #00ff41;
                    font-size: 14px;
                    line-height: 1.4;
                }

                .terminal-body::-webkit-scrollbar {
                    width: 8px;
                }

                .terminal-body::-webkit-scrollbar-track {
                    background: #2d2d2d;
                }

                .terminal-body::-webkit-scrollbar-thumb {
                    background: #555;
                    border-radius: 4px;
                }

                .terminal-body::-webkit-scrollbar-thumb:hover {
                    background: #777;
                }

                .terminal-line {
                    display: flex;
                    margin-bottom: 4px;
                    word-wrap: break-word;
                }

                .prompt {
                    color: #00ff41;
                    margin-right: 8px;
                    font-weight: bold;
                    min-width: 16px;
                }

                .text {
                    color: #ffffff;
                    flex: 1;
                    white-space: pre-wrap;
                }

                .cursor-blink {
                    color: #00ff41;
                    font-weight: bold;
                    animation: blink 1s infinite;
                    margin-top: 4px;
                }

                @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                /* Темная тема для скроллбара в Firefox */
                .terminal-body {
                    scrollbar-width: thin;
                    scrollbar-color: #555 #2d2d2d;
                }
            `}</style>
        </div>
    );
}