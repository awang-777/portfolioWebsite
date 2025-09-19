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

const Contact = () => {
  return (
    <PageContainer>
      <div className="container">
        <PageTitle>Contact</PageTitle>
        <p>Contact form coming soon...</p>
      </div>
    </PageContainer>
  );
};

export default Contact;
