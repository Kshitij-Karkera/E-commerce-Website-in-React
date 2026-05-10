import React from 'react';
import './Loader.css';

function Loader({ label = 'Loading…', fullPage = false }) {
    return (
        <div
            className={`loader-backdrop ${fullPage ? 'loader-fullpage' : ''}`}
            role="status"
            aria-label={label}
        >
            <div className="loader-card">

                <div className="loader-logo" aria-hidden="true">
                    <svg
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="loader-svg"
                    >
                        <path
                            d="M6 8h4l5 20h18l4-14H13"
                            stroke="rgb(0,149,255)"
                            strokeWidth="2.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="19" cy="34" r="2.5" fill="rgb(0,149,255)" className="loader-wheel" />
                        <circle cx="31" cy="34" r="2.5" fill="rgb(0,149,255)" className="loader-wheel" />
                    </svg>
                </div>

                <div className="loader-brand" aria-hidden="true">
                    <span className="loader-brand-epic">Epic</span>
                    <span className="loader-brand-store">STORE</span>
                </div>

                <div className="loader-dots" aria-hidden="true">
                    <span className="loader-dot" style={{ '--d': '0ms' }} />
                    <span className="loader-dot" style={{ '--d': '160ms' }} />
                    <span className="loader-dot" style={{ '--d': '320ms' }} />
                </div>
            </div>
        </div>
    );
}

export default Loader;