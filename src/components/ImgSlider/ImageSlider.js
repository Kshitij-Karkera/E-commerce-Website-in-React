import React, { useEffect, useRef, useState, useCallback } from 'react';
import samsungBanner from './Samsung_Banner.jpg';
import redBanner from './Red_Banner.jpg';
import alexaBanner from './Alexa_Banner.jpg';
import { PreviousIcon, NextIcon } from '../Icons/Icons';
import './ImageSlider.css';

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);
    const slides = [samsungBanner, redBanner, alexaBanner];
    const [isAnimating, setIsAnimating] = useState(false);
    const timeoutRef = useRef(null);
    const imageLoadCount = useRef(0);

    const updateSliderHeight = useCallback(() => {
        const { current: slider } = sliderRef;
        if (slider) {
            const slideGroup = slider.querySelector('.slide_group');
            const activeSlide = slider.querySelector('.slide[style*="display: block"]');
            if (activeSlide) {
                const height = activeSlide.clientHeight;
                slideGroup.style.height = `${height}px`;
                const prevButton = slider.querySelector('.previous_btn');
                const nextButton = slider.querySelector('.next_btn');
                prevButton.style.marginTop = `${height / 2 - 20}px`;
                nextButton.style.marginTop = `${height / 2 - 20}px`;
            }
        }
    }, []);

    const handleImageLoad = useCallback(() => {
        imageLoadCount.current += 1;
        if (imageLoadCount.current === slides.length) {
            updateSliderHeight();
        }
    }, [slides.length, updateSliderHeight]);

    useEffect(() => {
        // Reset load count on mount
        imageLoadCount.current = 0;

        // Trigger initial height update after a slight delay to ensure DOM is ready
        const initialHeightUpdate = setTimeout(() => {
            updateSliderHeight();
        }, 0);

        window.addEventListener('resize', updateSliderHeight);
        return () => {
            window.removeEventListener('resize', updateSliderHeight);
            clearTimeout(initialHeightUpdate);
        };
    }, [updateSliderHeight]);

    useEffect(() => {
        const handleSlideAnimation = () => {
            const newIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;
            moveSlide(newIndex);
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
                        { transform: 'translateX(0)' },
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
                    updateSliderHeight();
                };
            }
        },
        [currentIndex, isAnimating, updateSliderHeight]
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
        <div ref={sliderRef} className="imageSlider">
            <button
                className="previous_btn"
                onClick={handlePrevClick}
                title="Previous"
                disabled={isAnimating}
                style={{ cursor: isAnimating ? 'default' : 'pointer' }}
            >
                <PreviousIcon />
            </button>

            <button
                className="next_btn"
                onClick={handleNextClick}
                title="Next"
                disabled={isAnimating}
                style={{ cursor: isAnimating ? 'default' : 'pointer' }}
            >
                <NextIcon />
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
                                <img
                                    src={slide}
                                    alt={`Slide ${index + 1}`}
                                    onLoad={handleImageLoad}
                                />
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
        </div>
    );
};

export default ImageSlider;