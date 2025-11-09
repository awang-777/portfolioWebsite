import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding-top: 80px;
    overflow-x: hidden;
  }
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
`;

const ProjectGallery = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0 2rem;
  margin: 0 auto 3rem;
  box-sizing: border-box;
  width: 100%;
  max-width: 1400px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 1rem;
    gap: 1.5rem;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }
`;

const ProjectCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 1rem;
    margin: 0;
  }
`;

const ProjectTitle = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const IframeWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  
  iframe {
    width: 100%;
    height: 500px;
    border: none;
    margin-top: -60px;
    pointer-events: auto;
    display: block;
    max-width: 100%;
  }
  
  @media (max-width: 768px) {
    height: 300px;
    width: 100%;
    max-width: 100vw;
    margin: 0 auto;
    
    iframe {
      width: 100%;
      max-width: 100%;
      height: 400px;
      margin-top: -50px;
      transform: scale(1);
      transform-origin: top left;
    }
  }
`;

const Projects = () => {
  return (
    <PageContainer>
      <PageTitle>Projects</PageTitle>
      <ProjectGallery>
      <ProjectCard>
          <IframeWrapper>
            <video 
              style={{ 
                width: '100%', 
                height: '100%',
                minHeight: '400px',
                objectFit: 'contain',
                borderRadius: '8px',
                backgroundColor: '#000',
                display: 'block'
              }}
              controls
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            >
              <source src="/spacetime.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </IframeWrapper>
          <ProjectTitle>Spacetime</ProjectTitle>
          <p>Made in TouchDesigner.<br/>A visualization of time dialtion where particles closer to the mass move slower in rotation. The implosion/explosion represent a supernova.</p>
        </ProjectCard>
        <ProjectCard>
          <IframeWrapper>
            <iframe 
              title="Particle System"
              src="https://openprocessing.org/sketch/2757664/embed/" 
            ></iframe>
          </IframeWrapper>
          <ProjectTitle>Particle System</ProjectTitle>
          <p>An interactive particle visualization created with Open Processing.</p>
        </ProjectCard>
      </ProjectGallery>
    </PageContainer>
  );
};

export default Projects;
