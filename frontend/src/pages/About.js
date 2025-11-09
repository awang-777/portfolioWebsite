import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
  
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

const About = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>About</PageTitle>
        <p>About page coming soon...</p>
      </div>
    </PageContainer>
  );
};

export default About;
