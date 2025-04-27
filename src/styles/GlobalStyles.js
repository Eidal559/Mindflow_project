import { createGlobalStyle } from "styled-components";
import "@fontsource/kaushan-script";
import "@fontsource/sirin-stencil";

const GlobalStyles = createGlobalStyle`
  *,*::before,*::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: "Sirin Stencil";
    overflow-x: hidden;
    background-color: ${props => props.theme.body};
    color: ${props => props.theme.text};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  section {
    min-height: 100vh;
    width: 100%;
    position: relative;
    margin: 0 auto;
  }

  [data-scroll] {
    will-change: transform;
  }
`;

export default GlobalStyles;
