import { createGlobalStyle, keyframes } from 'styled-components';
import { ThemeType } from './theme';

const skeletonLoading = keyframes`
  0% {
    transform: translateX(-100%);
  }
  40%, 100% {
    transform: translateX(100%);
  }
`;

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  *::selection {
    background-color: ${({ theme }): string => theme.primary};
    color: white;
  }
  :root {
  font-size: 62.5%; /* (62.5/100) * 16px = 10px */
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    font-family: 'Lato', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${({ theme }) => theme.background};
  }
  body{
    padding: 0;
    margin: 0;
    transition: background-color 0.2s linear;
    overflow: hidden;
  }
  #root {
    max-width: 1920px;
    margin: 0 auto;
    overflow-x: hidden;
  }
  a, p, div, li, h1, h2, h3, h4, h5, h6, header, footer {
    font-weight: 400; /* Default size */
    font-family: 'Lato', sans-serif;
    transition: background-color 0.2s linear;
    transition: box-shadow 0.125s linear;
    margin: 0;
    user-select: none;
    padding: 0;
    box-sizing: border-box;
    letter-spacing: .5px;
    line-height: 1.5;
    color: ${({ theme }) => theme.text};
  }
  h1,h2,h3,h4,h5,h6 {
    color:${({ theme }) => theme.title};
    font-weight: 900;
  }
  h1 {
    font-size: 4rem;
  }
  h2 {
    font-size: 2.5rem;
  }
  h3 {
    font-size: 1.75rem;
  }
  h4 {
    font-size: 1.5rem;
  }
  p{
    font-size: 1.225rem;
  }
  a {
    font-weight: 900;
    text-decoration: none;
    font-size: 1.225rem;
    color: ${({ theme }): string => theme.title};
    span {
      font-size: 1.225rem;
    }
  }
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
  button {
    outline: 0;
    font-family: 'Lato', sans-serif;
    &:focus {
      outline:0;
    }
  }

.placeholder {
    overflow: hidden;
    position: relative;
    border-radius: 10px;
    background-color: ${({ theme }): string => theme.placeholder};
    &::before {
      content: '';
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: translateX(-100%);
      background-image: linear-gradient( 90deg, ${({ theme }): string => theme.placeholderHighlight}d3 0, ${({ theme }): string => theme.placeholderHighlight}4d 20%, ${({ theme }): string => theme.placeholderHighlight}66 60%, ${({ theme }): string => theme.placeholderHighlight}d3);
      animation: ${skeletonLoading} 2.5s infinite ease-in-out;
    }
  }
`;
