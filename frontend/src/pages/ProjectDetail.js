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

const ProjectDetail = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Project Detail</PageTitle>
        <p>Project detail page coming soon...</p>
      </div>
    </PageContainer>
  );
};

export default ProjectDetail;
