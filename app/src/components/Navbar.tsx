import { FC } from 'react';
import styled from 'styled';
import { Link } from 'react-router-dom';
import { Dashboard, Book, Server } from 'icons';
import { NavLink } from 'react-router-dom';

const Container = styled.div`
  width: 250px;
  height: 100vh;
  background-color: white;
  padding: 25px 20px;
  box-shadow: ${({ theme }): string => theme.shadow};

  h2 {
    font-size: 2.5rem;
    color: ${({ theme }): string => theme.primary};
    text-align: center;
    font-weight: 800;
    cursor: pointer;
    margin-bottom: 150px;
  }
`;

const Nav = styled.ul`
 display: flex;
  width: 100%;
  flex-direction: column;
  a {
    width: 100%;
    border-radius: 8px;
    padding: 15px;
    display: flex;
    margin: 8px 0;
    color: ${({ theme }) => theme.secondary};
    transition: 0.2s transform ease-in-out;
    &:hover {
      transform: translateY(-3px);
    }
    svg {
      fill: ${({ theme }) => theme.text};
    }
    &.active {
      background-color: ${({ theme }) => theme.primary};
      svg, p {
        fill: white;
        color: white;
      }
    }
    p {
      font-weight: 800;
      margin-left: 10px;
      display: flex;
      align-items: center;
    }
  }
`;

export const Navbar: FC = () => {
  return (
    <Container>
      <Link to="/dashboard"><h2>VATICAN</h2></Link>
      <Nav>
        <NavLink to="/view/dashboard"><Dashboard /><p>Dashboard</p></NavLink>
        <NavLink to="/view/discover"><Book /><p>Discover</p></NavLink>
        <NavLink to="/view/statistics"><Server /><p>Statistics</p></NavLink>
      </Nav>
    </Container>
  );
};
