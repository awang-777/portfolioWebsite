import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getProjectById } from '../data/projects';

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  background: #000;
  
  @media (max-width: 768px) {
    padding-top: 80px;
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

const ContentWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 1.25rem 3rem;
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-weight: 600;
  text-decoration: none;
  color: #ffffff;
  transition: color 0.2s ease;

  &:hover,
  &:focus-visible {
    color: #ffffff;
  }
`;

const MediaWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  background-color: #000;
  margin-bottom: 2.5rem;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.16);

  iframe,
  video {
    width: 100%;
    display: block;
    border: none;
  }

  iframe {
    min-height: 540px;
    aspect-ratio: 16 / 9;
  }

  iframe[data-project-id='particle-system'] {
    margin-top: -120px;
    height: 660px;
    transform: scale(1.02);
    transform-origin: top center;
  }

  iframe[data-project-id='ghost'] {
    height: 540px;
  }

  video {
    height: auto;
  }

  @media (max-width: 768px) {
    iframe {
      min-height: 360px;
    }

    iframe[data-project-id='particle-system'] {
      margin-top: -80px;
      height: 520px;
      transform: scale(1.05);
    }
  }
`;

const Description = styled.div`
  display: grid;
  gap: 1.75rem;
  margin-bottom: 2.5rem;
  line-height: 1.7;
  font-size: 1.05rem;
`;

const DetailsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const DetailCard = styled.div`
  padding: 1.25rem;
  border-radius: 10px;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.12);
`;

const DetailHeading = styled.h3`
  margin: 0 0 0.75rem;
  font-size: 1.1rem;
`;

const DetailList = styled.ul`
  margin: 0;
  padding-left: 1.1rem;
  display: grid;
  gap: 0.5rem;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.01em;
`;

const LinkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 2rem;
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.1rem;
  border-radius: 8px;
  background: #000;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: inherit;
  text-decoration: none;
  font-weight: 600;
  transition: border-color 0.2s ease, transform 0.2s ease;

  &:hover,
  &:focus-visible {
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const ProjectDetail = () => {
  const { id } = useParams();

  const project = useMemo(() => getProjectById(id), [id]);

  const renderMedia = () => {
    if (!project) {
      return null;
    }

    if (project.mediaType === 'iframe') {
      return (
        <iframe
          title={project.title}
          src={project.mediaSrc}
          data-project-id={project.id}
          {...project.mediaProps}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    }

    if (project.mediaType === 'youtube') {
      return (
        <iframe
          title={project.title}
          src={project.mediaSrc}
          data-project-id={project.id}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      );
    }

    if (project.mediaType === 'video') {
      return (
        <video controls data-project-id={project.id} {...project.mediaProps}>
          <source src={project.mediaSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }

    return null;
  };

  if (!project) {
    return (
      <PageContainer>
        <ContentWrapper>
          <BackLink to="/projects">&lt; Back to projects</BackLink>
          <PageTitle>Project not found</PageTitle>
          <p>We couldn&apos;t find the project you were looking for.</p>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <BackLink to="/projects">&lt; Back to projects</BackLink>
        <PageTitle>{project.title}</PageTitle>
        <MediaWrapper>{renderMedia()}</MediaWrapper>
        <TagList>
          {project.technologies?.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </TagList>
        <Description>
          {project.longDescription?.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </Description>
        {project.responsibilities && project.responsibilities.length > 0 && (
          <DetailsGrid>
            <DetailCard>
              <DetailHeading>Responsibilities</DetailHeading>
              <DetailList>
                {project.responsibilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </DetailList>
            </DetailCard>
          </DetailsGrid>
        )}
        {project.links && project.links.length > 0 && (
          <LinkList>
            {project.links.map((link) => (
              <ExternalLink key={link.url} href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </ExternalLink>
            ))}
          </LinkList>
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default ProjectDetail;
