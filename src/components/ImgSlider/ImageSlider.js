import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import samsungBanner from './Samsung_Banner.jpg';
import redBanner from './Red_Banner.jpg';
import alexaBanner from './Alexa_Banner.jpg';
import './ImageSlider.css';

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const slides = [samsungBanner, redBanner, alexaBanner];
    const [isAnimating, setIsAnimating] = useState(false);
    const timeoutRef = useRef(null);

    const handleResize = useCallback(() => {
        const { current: slider } = sliderRef;
        const slideGroup = slider.querySelector('.slide_group');
        const activeSlide = slideGroup.querySelector('.slide[style*="display: block"]');
        if (activeSlide) {
            slideGroup.style.height = `${activeSlide.clientHeight}px`;
            const prevButton = slider.querySelector('.previous_btn');
            const nextButton = slider.querySelector('.next_btn');
            prevButton.style.marginTop = `${activeSlide.clientHeight / 2 - 20}px`;
            nextButton.style.marginTop = `${activeSlide.clientHeight / 2 - 20}px`;
        }
    }, []);

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [handleResize]);

    useEffect(() => {
        const handleSlideAnimation = () => {
            if (currentIndex < slides.length - 1) {
                moveSlide(currentIndex + 1);
            } else {
                moveSlide(0);
            }
        };

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(handleSlideAnimation, 4000);

        return () => clearTimeout(timeoutRef.current);
    }, [currentIndex, slides.length]);

    const moveSlide = useCallback(
        (newIndex) => {
            if (!isAnimating && currentIndex !== newIndex) {
                setIsAnimating(true);
                const { current: slider } = sliderRef;
                const slideGroup = slider.querySelector('.slide_group');
                const slides = slideGroup.querySelectorAll('.slide');
                const bulletButtons = slider.querySelectorAll('.slide_btn');

                bulletButtons[currentIndex].classList.remove('active');
                bulletButtons[newIndex].classList.add('active');

                let animateLeft, slideLeft;
                if (newIndex > currentIndex) {
                    slideLeft = '100%';
                    animateLeft = '-100%';
                } else {
                    slideLeft = '-100%';
                    animateLeft = '100%';
                }

                slides[newIndex].style.display = 'block';
                slides[newIndex].style.left = slideLeft;
                slideGroup.animate(
                    [
                        { transform: `translateX(0)` },
                        { transform: `translateX(${animateLeft})` },
                    ],
                    {
                        duration: 500,
                        easing: 'ease-in-out',
                    }
                ).onfinish = () => {
                    slides[currentIndex].style.display = 'none';
                    slides[newIndex].style.left = '0';
                    slideGroup.style.transform = 'translateX(0)';
                    setCurrentIndex(newIndex);
                    setIsAnimating(false);
                };
            }
        },
        [currentIndex, isAnimating]
    );

    const handlePrevClick = useCallback(() => {
        const newIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
        moveSlide(newIndex);
    }, [currentIndex, moveSlide, slides.length]);

    const handleNextClick = useCallback(() => {
        const newIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
        moveSlide(newIndex);
    }, [currentIndex, moveSlide, slides.length]);

    const handleBulletClick = useCallback(
        (index) => {
            moveSlide(index);
        },
        [moveSlide]
    );

    return (
        <SliderContainer ref={sliderRef} className="imageSlider">
            <button
                className="previous_btn"
                onClick={handlePrevClick}
                title="Previous"
                disabled={isAnimating}
                style={{ cursor: isAnimating ? 'default' : 'pointer' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" viewBox="0 0 256 256">
                    <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                        <path d="M 58.33 58.799 L 15.998 16.466 c -1.059 -1.059 -1.059 -2.776 0 -3.835 L 27.834 0.794 c 1.059 -1.059 2.776 -1.059 3.835 0 l 42.333 42.333 c 1.059 1.059 1.059 2.776 0 3.835 L 62.166 58.799 C 61.107 59.858 59.39 59.858 58.33 58.799 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                        <path d="M 58.33 31.201 L 15.998 73.534 c -1.059 1.059 -1.059 2.776 0 3.835 l 11.837 11.837 c 1.059 1.059 2.776 1.059 3.835 0 l 42.333 -42.333 c 1.059 -1.059 1.059 -2.776 0 -3.835 L 62.166 31.201 C 61.107 30.142 59.39 30.142 58.33 31.201 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    </g>
                </svg>
            </button>

            <button
                className="next_btn"
                onClick={handleNextClick}
                title="Next"
                disabled={isAnimating}
                style={{ cursor: isAnimating ? 'default' : 'pointer' }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="25" height="25" viewBox="0 0 256 256">

                    <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                        <path d="M 58.33 58.799 L 15.998 16.466 c -1.059 -1.059 -1.059 -2.776 0 -3.835 L 27.834 0.794 c 1.059 -1.059 2.776 -1.059 3.835 0 l 42.333 42.333 c 1.059 1.059 1.059 2.776 0 3.835 L 62.166 58.799 C 61.107 59.858 59.39 59.858 58.33 58.799 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                        <path d="M 58.33 31.201 L 15.998 73.534 c -1.059 1.059 -1.059 2.776 0 3.835 l 11.837 11.837 c 1.059 1.059 2.776 1.059 3.835 0 l 42.333 -42.333 c 1.059 -1.059 1.059 -2.776 0 -3.835 L 62.166 31.201 C 61.107 30.142 59.39 30.142 58.33 31.201 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0) " strokeLinecap="round" />
                    </g>
                </svg>
            </button>

            <div className="slider">
                <div className="slide_viewer">
                    <div className="slide_group">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="slide"
                                style={{
                                    display: index === currentIndex ? 'block' : 'none',
                                    left: '0',
                                }}
                            >
                                <img src={slide} alt={`Slide ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="slide_buttons">
                {slides.map((_, index) => (
                    <div
                        key={index}
                        className={`slide_btn ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => handleBulletClick(index)}
                        style={{ cursor: 'pointer' }}
                    />
                ))}
            </div>
        </SliderContainer>
    );
};

export default ImageSlider;

const SliderContainer = styled.div`
margin-top: 1em;
align-items: center;
border-radius: 10px;
padding: 1em;
max-width: 100%;
z-index: -1;
background-color: var(--background-color);
box-shadow: -3px -3px 5px var(--upper-box-shadow-foreground),
3px 3px 5px var(--lower-box-shadow-foreground);
transition: 0.5s;
`;
