import React from 'react';
import styled from 'styled-components';

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
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  line-height: 1.7;
  
  @media (max-width: 768px) {
    padding: 0 1.5rem 3rem;
  }
`;

const Section = styled.div`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const SectionContent = styled.div`
  color: #ffffff;
  font-size: 1.05rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  color: #ffffff;
`;

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 1.5rem;
  color: #ffffff;
`;

const ListItem = styled.li`
  margin-bottom: 0.75rem;
`;

const About = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>About</PageTitle>
        <ContentWrapper>
          <Section>
            <SectionTitle>Education:</SectionTitle>
            <SectionContent>
              <Paragraph>Currently attending the University of Maryland, College Park</Paragraph>
              <Paragraph><strong>Major:</strong> Immersive Media Design</Paragraph>
              <Paragraph><strong>Minor:</strong> Sustainability Studies</Paragraph>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Artistic Focus:</SectionTitle>
            <SectionContent>
              <Paragraph>
                Exploring the relationship between art and technology, particularly how digital systems can create immersive and sensory experiences.
              </Paragraph>
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Interests:</SectionTitle>
            <List>
              <ListItem>Particle systems and generative visual forms</ListItem>
              <ListItem>Abstraction and experimental aesthetics</ListItem>
              <ListItem>Multi-media installation and digital/physical integration</ListItem>
              <ListItem>Ecological awareness and sustainability within artistic practice</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Approach:</SectionTitle>
            <SectionContent>
              <Paragraph>
                Treats technology as a creative medium, using it to shape perception, provoke curiosity, and invite reflection on how we connect with our environments.
              </Paragraph>
            </SectionContent>
          </Section>
        </ContentWrapper>
      </div>
    </PageContainer>
  );
};

export default About;
