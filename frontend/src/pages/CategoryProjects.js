import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import projects from '../data/projects';

const PageContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
  box-sizing: border-box;
  background: #000;
  
  @media (max-width: 768px) {
    overflow-x: hidden;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  margin-left: 2rem;
  font-weight: 600;
  text-decoration: none;
  color: #ffffff;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: #ffffff;
  }

  @media (max-width: 768px) {
    margin-left: 1rem;
  }
`;

const CategoryTitle = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  padding: 0 2rem;
  
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
    position: relative;
  }

  @media (max-width: 768px) {
    height: 300px !important;
    min-height: 300px !important;
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
    
    & video,
    video[data-project-id],
    video[data-project-id='ghost'] {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      min-height: 300px !important;
      max-height: 300px !important;
      object-fit: contain !important;
      border-radius: 8px;
      background-color: #000;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: none;
      z-index: 1 !important;
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

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.6);
`;

const CategoryProjects = () => {
  const { category } = useParams();
  
  // Decode the category name from URL
  const decodedCategory = decodeURIComponent(category);
  
  // Filter projects by category
  const categoryProjects = projects.filter(
    (project) => project.category === decodedCategory
  );

  const handleVideoReady = (e) => {
    const video = e.target;
    if (video.paused) {
      video.play().catch(() => {
        // Ignore autoplay errors
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

    if (project.mediaType === 'youtube' && project.previewMediaSrc) {
      return (
        <video
          data-project-id={project.id}
          onLoadedData={handleVideoReady}
          onCanPlay={handleVideoReady}
          {...project.mediaProps}
          width="100%"
          height="100%"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            visibility: 'visible',
            opacity: 1,
            position: 'relative',
          }}
        >
          <source src={project.previewMediaSrc} type="video/mp4" />
        </video>
      );
    }

    return null;
  };

  return (
    <PageContainer>
      <BackLink to="/projects">&lt; Back to Projects</BackLink>
      <CategoryTitle>{decodedCategory}</CategoryTitle>
      {categoryProjects.length > 0 ? (
        <ProjectGallery>
          {categoryProjects.map((project) => (
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
      ) : (
        <EmptyState>
          <p>No projects found in this category.</p>
        </EmptyState>
      )}
    </PageContainer>
  );
};

export default CategoryProjects;
