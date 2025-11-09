import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const PageTitle = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
`;

const ProjectGallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  margin-bottom: 3rem;
`;

const ProjectCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProjectTitle = styled.h3`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const Projects = () => {
  return (
    <PageContainer>
      <PageTitle>Projects</PageTitle>
      <ProjectGallery>
        <ProjectCard>
          <iframe 
            title= "Particle System"
            src= "https://openprocessing.org/sketch/2757664/embed/" 
            width="100%" 
            height="400"
            style={{ border: 'none', borderRadius: '8px' }}
          ></iframe>
          <ProjectTitle>Particle System</ProjectTitle>
          <p>An interactive particle visualization created with Processing.</p>
        </ProjectCard>
      </ProjectGallery>
    </PageContainer>
  );
};

export default Projects;
