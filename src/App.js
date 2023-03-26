import "./App.css";
import Main from "./components/Main";
import styled from "styled-components";
import { devices } from "./components/mediaQuery";

const StyledDiv = styled.div` 
    background-color: var(--light-orange-bg);
    height: 100vh;
    position: relative;

    @media ${devices.tablet} {
      background-color: #fff;
    }
`;

function App() {
  
  return (
      <StyledDiv>
        <Main />
      </StyledDiv>
  );
}

export default App;
