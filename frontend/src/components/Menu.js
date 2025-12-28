import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MenuContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  
  @media (max-width: 768px) {
    top: 15px;
    right: 15px;
  }
`;

const MenuButton = styled.button`
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  
  &:hover {
    background: rgba(0, 0, 0, 0.9);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
    font-size: 1.25rem;
    padding: 0.625rem 0.875rem;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  min-width: 180px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transform: ${props => props.isOpen ? 'translateY(0)' : 'translateY(-10px)'};
  transition: all 0.3s ease;
  overflow: hidden;
  
  @media (max-width: 768px) {
    min-width: 160px;
    right: 0;
  }
`;

const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0.5rem 0;
`;

const MenuItem = styled.li`
  margin: 0;
`;

const MenuLink = styled(Link)`
  display: block;
  padding: 0.875rem 1.5rem;
  color: #ffffff;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-left-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: transparent;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // Close menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <Overlay isOpen={isOpen} onClick={closeMenu} />
      <MenuContainer ref={menuRef}>
        <MenuButton onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? '✕' : '☰'}
        </MenuButton>
        <DropdownMenu isOpen={isOpen}>
          <MenuList>
            <MenuItem>
              <MenuLink to="/" onClick={closeMenu}>Home</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/projects" onClick={closeMenu}>Projects</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/about" onClick={closeMenu}>About</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/contact" onClick={closeMenu}>Contact</MenuLink>
            </MenuItem>
          </MenuList>
        </DropdownMenu>
      </MenuContainer>
    </>
  );
};

export default Menu;

