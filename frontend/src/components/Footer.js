import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: rgba(10, 10, 10, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const SocialLink = styled.a`
  color: #4ecdc4;
  font-size: 1.5rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ff6b6b;
  }
`;

const Copyright = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          <SocialLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            📷
          </SocialLink>
          <SocialLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            🐦
          </SocialLink>
          <SocialLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            💼
          </SocialLink>
        </SocialLinks>
        <Copyright>
          © 2024 Amanda Wang. All rights reserved.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
