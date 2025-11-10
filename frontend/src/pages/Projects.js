import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import projects from '../data/projects';

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  background: #000;
  
  @media (max-width: 768px) {
    padding-top: 80px;
    overflow-x: hidden;
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

const ProjectCard = styled(Link)`
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  background-color: #000000;
  box-shadow: none;
  box-sizing: border-box;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease;

  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
  }
`;

const IframeWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 8px;
  position: relative;
  box-sizing: border-box;
  max-width: 100%;
  background-color: #000;
  
  iframe {
    width: 100%;
    height: 500px;
    border: none;
    margin-top: -60px;
    pointer-events: none;
    display: block;
    max-width: 100%;
  }
  
  video {
    width: 100%;
    height: 100%;
    min-height: 400px;
    object-fit: contain;
    border-radius: 8px;
    background-color: #000;
    display: block;
    pointer-events: none;
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

const ParticleImageWrapper = styled.div`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background-color: #000;
  padding-top: 56.56%;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 8px;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    padding-top: 56.56%;
  }
`;

const Projects = () => {
  const handleVideoReady = (e) => {
    // Ensure video plays as soon as it's ready
    const video = e.target;
    if (video.paused) {
      video.play().catch(() => {
        // Ignore autoplay errors (browser may block autoplay)
      });
    }
  };

  const renderMedia = (project) => {
    if (project.mediaType === 'iframe') {
      return (
        <iframe
          title={project.title}
          src={project.mediaSrc}
          data-project-id={project.id}
          {...project.mediaProps}
        />
      );
    }

    if (project.mediaType === 'video') {
      return (
        <video
          data-project-id={project.id}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          {...project.mediaProps}
        >
          <source src={project.mediaSrc} type="video/mp4" />
        </video>
      );
    }

    return null;
  };

  return (
    <PageContainer>
      <ProjectGallery>
        {projects.map((project) => (
          <ProjectCard key={project.id} to={project.path}>
            {project.id === 'particle-system' ? (
              <ParticleImageWrapper>
                <img src="/particle_system.jpg" alt={project.title} />
              </ParticleImageWrapper>
            ) : (
              <IframeWrapper>{renderMedia(project)}</IframeWrapper>
            )}
          </ProjectCard>
        ))}
      </ProjectGallery>
    </PageContainer>
  );
};

export default Projects;
