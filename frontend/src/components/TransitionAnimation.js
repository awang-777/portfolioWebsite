import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const TransitionContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  background: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnimationWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoAnimation = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const TransitionAnimation = ({ animationSrc, onComplete }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;
      
      // Play the video
      video.play().catch(() => {
        console.log('Autoplay prevented');
      });

      // When video ends, call onComplete
      const handleEnded = () => {
        if (onComplete) {
          onComplete();
        }
      };

      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, [onComplete]);

  return (
    <TransitionContainer>
      <AnimationWrapper>
        <VideoAnimation
          ref={videoRef}
          src={animationSrc}
          autoPlay
          muted
          playsInline
        />
      </AnimationWrapper>
    </TransitionContainer>
  );
};

export default TransitionAnimation;

