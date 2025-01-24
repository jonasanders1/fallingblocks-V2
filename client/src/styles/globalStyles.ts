// globalStyles.ts

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background-color: ${({ theme }) => theme.background.primary};
    color: ${({ theme }) => theme.text.primary};
    font-family: 'Arial', 'Helvetica', sans-serif;
    font-size: 1rem;
    line-height: 1.5;
  }

  /* Remove default list styles */
  ul, ol {
    list-style: none;
  }

  /* Remove default link styles */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Reset buttons */
  button {
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  /* Images */
  img {
    max-width: 100%;
    display: block;
  }

  /* Inputs and forms */
  input, textarea {
    font-family: inherit;
    font-size: inherit;
  }

  /* Scrollbar (Optional Styling) */
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.borders.medium};
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.borders.strong};
  }


  /* Set default container styling */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`;

export default GlobalStyles;
