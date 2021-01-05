import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

body {
  font-family: Quicksand;
  text-align: center;
  background: linear-gradient(180deg, #2980B9 0%, #FFFFFF 78.12%);
    justify-content: center;
    min-height: 100vh;
    min-width: 100vw;
}

h1 {
  font-size: 52px; 
  color: black;
  font-family: OCR A Std, monospace;
    font-style: normal;
}

h2 {
  font-size: 32px;
}

h3 {
  color: black;
  font-family: OCR A Std, monospace;
    font-style: normal;
    font-size: 28px;
}

  a:hover {
      
    text-decoration: underline;
  }
  
  a:active {
    color: black;
  }

input, textarea{
    font-size: 19px;
width: 285px;
height: 35px;
right: 38px;
top: 213px;
background: #FFFFFF;
border: 1px solid #000000;
box-sizing: border-box;
border-radius: 7px;
}

button:hover{
    background: #3cb0fd;
}
`;

export default GlobalStyles;
